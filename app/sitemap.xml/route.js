const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snapbio.usersynax.dev";

const pages = [
    "",
    "demo",
    "privacy",
    "terms",
];

function generateSiteMap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
            .map((page) => {
                const path = page === "" ? "" : `/${page}`;
                return `  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.7"}</priority>
</url>`;
            })
            .join("\n")}
</urlset>`;
}

export async function GET() {
    return new Response(generateSiteMap(), {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=0, s-maxage=3600",
        },
    });
}
