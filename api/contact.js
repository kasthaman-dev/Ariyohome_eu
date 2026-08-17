/**
 * POST /api/contact — receives the website contact form and emails it on.
 *
 * Runs as a Vercel serverless function. No npm dependencies: it calls the
 * Resend REST API with fetch (Node 18+ has fetch built in).
 *
 * Required environment variable in Vercel:
 *   RESEND_API_KEY   — from https://resend.com/api-keys
 *
 * Optional:
 *   CONTACT_TO       — where enquiries land   (default Info@ariyohomes.eu)
 *   CONTACT_FROM     — verified sender address (default forma@ariyohomes.eu)
 *                      The domain here must be verified in Resend, otherwise
 *                      Resend rejects the send.
 */

const TO = process.env.CONTACT_TO || 'Info@ariyohomes.eu';
const FROM = process.env.CONTACT_FROM || 'Ariyo Homes <forma@ariyohomes.eu>';

const MAX = { name: 100, email: 150, model: 150, message: 4000 };

function clean(value, limit) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : '';
}

// The values land inside an HTML email, so they must not be able to inject markup.
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Mail service not configured' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});

  // Hidden field: real visitors leave it empty, bots fill it. Pretend success
  // so the bot does not learn it was rejected.
  if (clean(body.company, 100)) return res.status(200).json({ ok: true });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const model = clean(body.model, MAX.model);
  const message = clean(body.message, MAX.message);
  const language = body.language === 'en' ? 'en' : 'lv';

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const rows = [
    ['Vārds', name],
    ['E-pasts', email],
    ['Modelis vai platība', model || '—'],
    ['Valoda', language.toUpperCase()]
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#1C1C18;line-height:1.6">
      <h2 style="margin:0 0 16px;font-weight:600">Jauns pieteikums no ariyohomes.eu</h2>
      <table style="border-collapse:collapse;margin-bottom:20px">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:4px 16px 4px 0;color:#56564D;vertical-align:top">${escapeHtml(k)}</td>
            <td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td>
          </tr>`).join('')}
      </table>
      <div style="padding:16px;background:#F4F3EE;border-left:3px solid #4A5227;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>`;

  const text = [
    'Jauns pieteikums no ariyohomes.eu',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    message
  ].join('\n');

  try {
    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,          // replying in the inbox goes straight to the visitor
        subject: `Pieteikums: ${name}${model ? ' — ' + model : ''}`,
        html,
        text
      })
    });

    if (!resend.ok) {
      const detail = await resend.text();
      console.error('Resend rejected the send:', resend.status, detail);
      return res.status(502).json({ error: 'Could not send' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form failed:', err);
    return res.status(500).json({ error: 'Could not send' });
  }
};

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
