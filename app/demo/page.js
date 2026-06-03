
import Link from "next/link";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import ThemeButton from "../../components/ThemeButton";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function DemoPage() {
  const theme = {
    bgColor: "#0A0A0F",
    textColor: "#FFFFFF",
    mutedColor: "#94A3B8",
    buttonBg: "#EC4899",
    buttonHoverBg: "#EC4899",
    buttonText: "#FFFFFF",  
  };

  const links = [
    { id: 1, title: "Portfolio", url: "https://usersynax.dev" },
    { id: 2, title: "Twitter / X", url: "https://twitter.com" },
    { id: 3, title: "GitHub", url: "https://github.com" },
    { id: 4, title: "Blog", url: "https://medium.com" },
  ];

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen`}
        style={{ backgroundColor: theme.bgColor, color: theme.textColor }}
      >
        <main className="max-w-md mx-auto py-16 sm:py-20 px-4 sm:px-6">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div
                className="absolute -inset-1 rounded-full blur-md opacity-50"
                style={{ background: theme.buttonBg }}
              />
              <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full bg-[#2A2A35] border-2 border-[#2A2A35]" />
            </div>
            <div className="space-y-1">
              <h1
                className={`${plusJakarta.className} text-xl sm:text-2xl font-bold`}
                style={{ color: theme.textColor }}
              >
                Alex Chen
              </h1>
              <p className="text-sm" style={{ color: theme.mutedColor }}>
                @demo
              </p>
            </div>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: theme.mutedColor }}>
              Designer &amp; Developer building awesome things on the internet.
            </p>
            <div className="space-y-3 mt-8">
              {links.map((link) => (
                <ThemeButton
                  key={link.id}
                  href={link.url}
                  buttonBg={theme.buttonBg}
                  buttonHoverBg={theme.buttonHoverBg}
                  buttonText={theme.buttonText}
                >
                  {link.title}
                </ThemeButton>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
