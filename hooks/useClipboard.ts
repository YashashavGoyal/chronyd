"use client";

import { useCallback } from "react";
import { useSuchna, NotificationType } from "@/components/Suchna";

export function useClipboard() {
  const { notify } = useSuchna();

  const copyToClipboard = useCallback(
    async (text: string, successMessage: string = "Copied to clipboard!") => {
      if (!text) return false;
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          notify(NotificationType.SUCCESS, successMessage);
          return true;
        } else {
          // Fallback for older browsers or insecure contexts
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          const successful = document.execCommand('copy');
          textArea.remove();
          
          if (successful) {
            notify(NotificationType.SUCCESS, successMessage);
            return true;
          } else {
            throw new Error("Fallback copy failed");
          }
        }
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        notify(NotificationType.ERROR, "Failed to copy text.");
        return false;
      }
    },
    [notify]
  );

  return { copyToClipboard };
}
