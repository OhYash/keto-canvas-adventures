import { toast } from 'sonner';

export const handleCopyUrl = async () => {
  try {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    toast.info("Link copied to clipboard!", {
      description: "You can now share this page with others.",
      duration: 3000,
    });
  } catch (err) {
    toast.error("Failed to copy link", {
      description: "Please try again or copy the URL manually.",
      duration: 3000,
    });
  }
};