import type { Recommendation } from './types'

export const recommendationContent = {
  switch_to_firefox: {
    id: 'switch-to-firefox',
    title: 'Switch to a privacy-focused browser',
    description:
      'Since privacy is important to you and you do not mind a different look and feel, consider switching to Firefox for stronger built-in privacy protections.',
    effort: 'medium',
  },

  switch_to_brave: {
    id: 'switch-to-brave',
    title: 'Consider a more private Chromium-based browser',
    description:
      'Since you prefer a familiar experience, you might consider a privacy-focused Chromium browser like Brave, which offers better default privacy settings than Chrome.',
    effort: 'easy',
  },

  optimize_firefox: {
    id: 'optimize-firefox',
    title: 'Optimize your Firefox privacy settings',
    description:
      'You are already using Firefox. Reviewing its privacy settings can further improve your protection.',
    effort: 'easy',
  },

  enable_gpc: {
    id: 'enable-gpc',
    title: 'Enable Global Privacy Control',
    description:
      'Since tracking protection is important to you, consider enabling Global Privacy Control in your browser settings.',
    effort: 'easy',
  },

  reduce_cookies: {
    id: 'reduce-cookies',
    title: 'Reduce cookie and tracking exposure',
    description:
      'Since privacy is important to you, consider reducing tracking and third-party cookie usage in your browser.',
    effort: 'medium',
  },

  use_adblock: {
    id: 'use-adblock',
    title: 'Use an ad blocker',
    description:
      'An ad blocker can reduce tracking, improve privacy, and make browsing less distracting.',
    effort: 'easy',
  },

  use_password_manager: {
    id: 'use-password-manager',
    title: 'Use a password manager',
    description:
      'A password manager helps you use strong, unique passwords and protects your accounts more effectively.',
    effort: 'easy',
  },

  use_vpn: {
    id: 'use-vpn',
    title: 'Use a VPN for better privacy',
    description:
      'A VPN can hide your IP address and protect your data, especially on public networks.',
    effort: 'advanced',
  },
} satisfies Record<string, Recommendation>
