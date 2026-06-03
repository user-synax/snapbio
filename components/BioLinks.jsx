'use client'

import ThemeButton from './ThemeButton'

export default function BioLinks({ 
  links, 
  theme, 
  userId 
}) {
  const handleLinkClick = (linkId) => {
    // Fire and forget
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        linkId,
        userId,
      }),
    });
  };

  return (
    <div className="space-y-3 mt-8">
      {links.map((link) => (
        <ThemeButton
          key={link._id}
          href={link.url}
          buttonBg={theme.buttonBg}
          buttonHoverBg={theme.buttonHoverBg}
          buttonText={theme.buttonText}
          onClick={() => handleLinkClick(link._id)}
        >
          {link.title}
        </ThemeButton>
      ))}
    </div>
  );
}
