
import Link from "next/link";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import ThemeButton from "../../components/ThemeButton";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Snapbio Demo | Preview a link-in-bio profile page",
  description:
    "See a live Snapbio demo of a link-in-bio page with social links, brand styling, and a clean mobile-first layout.",
  keywords: ["Snapbio demo", "link in bio demo", "bio page preview", "social landing page demo"],
  openGraph: {
    title: "Snapbio Demo | Preview a link-in-bio profile page",
    description:
      "See a live Snapbio demo of a link-in-bio page with social links, brand styling, and a clean mobile-first layout.",
    url: "/demo",
    type: "website",
    images: [
      {
        url: "/link-icon-hig-res.png",
        alt: "Snapbio demo profile page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapbio Demo | Preview a link-in-bio profile page",
    description:
      "See a live Snapbio demo of a link-in-bio page with social links, brand styling, and a clean mobile-first layout.",
    images: ["/link-icon-hig-res.png"],
  },
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoPage() {
  const theme = {
    bgPattern:
      "radial-gradient(circle at 20% 80%, #251810 3%, transparent 0%), radial-gradient(circle at 80% 20%, #201508 3%, transparent 0%)",

    bgPatternSize: "80px 80px",

    bgGradient:
      "linear-gradient(135deg, #181410 0%, #121008 100%)",

    cardColor: "rgba(42, 36, 24, 0.75)",

    borderColor: "#3a2e1e",

    textColor: "#fff8e8",

    mutedColor: "#a89888",

    accentGradient:
      "linear-gradient(135deg, #d89848 0%, #e8a858 100%)",

    buttonBg:
      "linear-gradient(135deg, #d89848 0%, #e8a858 100%)",

    buttonText: "#1a1410",
  };

  const links = [
    { id: 1, title: "Portfolio", url: "https://usersynax.me" },
    { id: 2, title: "Twitter / X", url: "https://twitter.com" },
    { id: 3, title: "GitHub", url: "https://github.com" },
    { id: 4, title: "Blog", url: "https://medium.com" },
  ];

  return (
    <div
      className={`${inter.className} min-h-screen overflow-x-hidden`}
      style={{
        background: theme.bgGradient,
        color: theme.textColor,
      }}
    >
        {/* Pattern Layer */}
        <div
          className="fixed inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: `
            radial-gradient(circle, #3a2e1e 1px, transparent 1px),
            ${theme.bgPattern}
          `,
            backgroundSize: `22px 22px, ${theme.bgPatternSize}`,
          }}
        />

        <main className="relative z-10 min-h-screen flex items-center justify-center px-5 py-16">
          <div
            className="w-full max-w-md rounded-[32px] border backdrop-blur-xl p-8"
            style={{
              background: theme.cardColor,
              borderColor: theme.borderColor,
            }}
          >
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 blur-2xl opacity-60 rounded-full"
                  style={{
                    background: theme.accentGradient,
                    transform: "scale(1.3)",
                  }}
                />

                <img
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=Alex"
                  alt="Avatar"
                  className="relative w-28 h-28 rounded-full border-2 bg-[#201a12]"
                  style={{
                    borderColor: theme.borderColor,
                  }}
                />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-6">
              <h1
                className={`${plusJakarta.className} text-3xl font-bold`}
                style={{
                  background: theme.accentGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Alex Chen
              </h1>

              <p
                className="mt-1 text-sm"
                style={{
                  color: theme.mutedColor,
                }}
              >
                @demo
              </p>

              <p
                className="mt-5 text-sm leading-relaxed"
                style={{
                  color: theme.mutedColor,
                }}
              >
                Designer & Developer crafting thoughtful digital experiences,
                interfaces and products for the modern web.
              </p>
            </div>

            {/* Links */}
            <div className="mt-8 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  className="group flex items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-300"
                  style={{
                    background: "#201a12",
                    borderColor: theme.borderColor,
                  }}
                >
                  <span
                    className="font-medium"
                    style={{
                      color: theme.textColor,
                    }}
                  >
                    {link.title}
                  </span>

                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    style={{
                      color: "#d89848",
                    }}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div
              className="mt-8 pt-6 border-t text-center text-xs"
              style={{
                borderColor: theme.borderColor,
                color: theme.mutedColor,
              }}
            >
              Powered by Snapbio
            </div>
          </div>
        </main>
    </div>
  );
}
