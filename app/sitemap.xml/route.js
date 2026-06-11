import { connectToDatabase } from "../../lib/db";
import User from "../../models/User";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://snapbio.usersynax.dev";

const pages = ["", "demo", "privacy", "terms"];

async function generateSiteMap() {
    await connectToDatabase();

    // Get all users (limit to 50000 to keep sitemap manageable)
    const users = await User.find({}, { username: 1, _id: 0 }).limit(50000);

    const staticUrls = pages.map((page) => {
        const path = page === "" ? "" : `/${page}`;
        return `  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.7"}</priority>
</url>`;
    });

    const userUrls = users.map((user) => {
        return `  <url>
    <loc>${siteUrl}/${user.username}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
</url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join("\n")}
${userUrls.join("\n")}
</urlset>`;
}

export async function GET() {
    const sitemap = await generateSiteMap();
    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=0, s-maxage=3600",
        },
    });
}
