
'use client'

import Link from "next/link"

export default function ThemeButton({ 
  href, 
  children, 
  buttonBg, 
  buttonHoverBg, 
  buttonText, 
  onClick 
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="block w-full px-4 py-2 rounded-full text-center font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{ background: buttonBg, color: buttonText }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = buttonHoverBg
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = buttonBg
      }}
    >
      {children}
    </Link>
  )
}
