export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(`
User-agent: *
Allow: /maps/
Allow: /players/

Sitemap: https://mta.gtaspeedrun.lat/sitemap.xml
    `.trim());
  }
  
