"use client";

import ThemeButton from "./ThemeButton";
import * as faIcons from "react-icons/fa";

export default function BioLinks({ links, theme, userId }) {
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
        <div className="space-y-4 mt-8">
            {links.map((link) => {
                const IconComponent = link.icon
                    ? faIcons[`Fa${link.icon}`]
                    : null;
                return (
                    <ThemeButton
                        key={link._id}
                        href={link.url}
                        buttonBg={theme.buttonBg}
                        buttonHoverBg={theme.buttonHoverBg}
                        buttonText={theme.buttonText}
                        buttonHoverShadow={theme.buttonHoverShadow}
                        shadowColor={theme.shadowColor}
                        focusRing={theme.focusRing}
                        buttonRadius={theme.buttonRadius}
                        onClick={() => handleLinkClick(link._id)}
                        icon={IconComponent}
                    >
                        {link.title}
                    </ThemeButton>
                );
            })}
        </div>
    );
}
