const BASE_URL = "https://mta.gtaspeedrun.lat";

export default async function handler(req, res) {
  const playerUrls = await fetch(`${BASE_URL}/api/players`).then(res => res.json());
  const mapUrls = await fetch(`${BASE_URL}/api/maps`).then(res => res.json());

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${playerUrls.map(player => `
        <url>
          <loc>${BASE_URL}/players/${player.id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
      ${mapUrls.map(map => `
        <url>
          <loc>${BASE_URL}/maps/${map.resName}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>
  `.trim();

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
