// Content for the Contact section. Update this file to modify links or details.
export interface ContactLink {
  label: string;
  username?: string;
  handle?: string;
  url: string;
}

export const contactData = {
  primaryContact: {
    label: 'Email',
    // Base64 encoded email to protect from scrapers (decoded via atob at runtime)
    encodedEmail: 'eWFzaHlhZGF2LjcxMEBvdXRsb29rLmNvbQ==',
    description: 'Best way to reach me for roles and freelance inquiries.',
  },
  professional: [
    {
      label: 'GitHub',
      username: 'ohyash',
      url: 'https://github.com/ohyash',
    },
    {
      label: 'LinkedIn',
      username: 'ohyash',
      url: 'https://linkedin.com/in/ohyash',
    },
  ] as ContactLink[],
  location: {
    title: 'Location',
    description: 'Based in Rajasthan, India · Available for remote work worldwide',
  },
  alsoHere: {
    description: "Telegram, X (Twitter), and Instagram, if that's more your speed — say hi, share a meme, whatever.",
    links: [
      {
        label: 'Telegram',
        handle: '@OhYash',
        url: 'https://t.me/OhYash',
      },
      {
        label: 'X (Twitter)',
        handle: '@OhY4sh',
        url: 'https://x.com/OhY4sh',
      },
      {
        label: 'Instagram',
        handle: '@OhY4sh',
        url: 'https://instagram.com/OhY4sh',
      },
    ] as ContactLink[],
  },
};
