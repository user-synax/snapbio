const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snapbio.usersynax.dev";

export async function GET() {
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /auth/
Disallow: /dashboard/
Sitemap: ${siteUrl}/sitemap.xml
`;

    return new Response(robots, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=0, s-maxage=3600",
        },
    });
}
