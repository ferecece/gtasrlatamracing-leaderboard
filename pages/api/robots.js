export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(`
User-agent: *
Disallow: /api/
Allow: /maps/
Allow: /players/

Sitemap: https://mta.gtaspeedrun.lat/sitemap.xml
    `.trim());
  }
  