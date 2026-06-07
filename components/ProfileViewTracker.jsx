
"use client";

import { useEffect } from "react";

export default function ProfileViewTracker({ userId }) {
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch("/api/profile-views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
      } catch (error) {
        console.error("Failed to track profile view:", error);
      }
    };

    trackView();
  }, [userId]);

  return null;
}
