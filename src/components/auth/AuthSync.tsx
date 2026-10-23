"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";

/**
 * Headless client component that triggers user profile synchronization
 * with PostgreSQL the moment an authenticated session is detected.
 */
export function AuthSync() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const syncingRef = useRef(false);
  const syncedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) {
      if (isLoaded && !isSignedIn) {
        syncedUserIdRef.current = null;
      }
      return;
    }

    if (syncedUserIdRef.current === userId || syncingRef.current) {
      return;
    }

    syncingRef.current = true;

    fetch("/api/auth/sync", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          syncedUserIdRef.current = userId;
        } else {
          console.warn("[AuthSync] Profile sync response status:", res.status);
          syncedUserIdRef.current = null;
        }
      })
      .catch((err) => {
        console.warn("[AuthSync] Background profile sync error:", err);
        syncedUserIdRef.current = null;
      })
      .finally(() => {
        syncingRef.current = false;
      });
  }, [isLoaded, isSignedIn, userId]);

  return null;
}

