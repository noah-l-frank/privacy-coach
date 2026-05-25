import type { Recommendation } from './types'

export const recommendationContent = {
  switch_to_firefox: {
    id: 'switch-to-firefox',
    dynamic: false,

    title: 'Switch to a privacy-focused browser',
    description:
      'Firefox offers stronger built-in privacy protections and gives users more control over tracking and data collection.',

    effort: 'medium',
    impact: 'high',

    why:
      'Firefox includes stronger tracking protection by default and is developed independently from the Chromium ecosystem dominated by Google.',

    steps: [
      'Download and install Firefox',
      'Import your bookmarks and passwords',
      'Enable Enhanced Tracking Protection in settings',
    ],

    links: [
      {
        label: 'Download Firefox',
        url: 'https://www.mozilla.org/firefox/',
      },
    ],

    tradeoffs: [
      'Some websites may behave slightly differently compared to Chrome.',
    ],
  },

  switch_to_brave: {
    id: 'switch-to-brave',
    dynamic: false,

    title: 'Consider a more private Chromium-based browser',
    description:
      'Brave provides stronger privacy protections while keeping a familiar Chromium-based browsing experience.',

    effort: 'easy',
    impact: 'medium',

    why:
      'Brave blocks many ads and trackers automatically while still feeling very similar to Chrome.',

    steps: [
      'Download and install Brave',
      'Import your Chrome data',
      'Review Brave Shields settings',
    ],

    links: [
      {
        label: 'Download Brave',
        url: 'https://brave.com/',
      },
    ],

    tradeoffs: [
      'Some privacy features may occasionally break website functionality.',
    ],
  },

  // TODO: Add firefox optimization recommendation after scan detects specific optimizations that can be made in firefox and create dynamic content for it


  enable_gpc: {
    id: 'enable-gpc',
    dynamic: false,

    title: 'Enable Global Privacy Control',
    description:
      'Global Privacy Control tells websites that you do not want your data to be sold or shared.',

    effort: 'easy',
    impact: 'medium',

    why:
      'Some websites and regions legally recognize the GPC signal as a privacy preference.',

    steps: [
      'Open Firefox settings',
      'Search for Global Privacy Control',
      'Enable the setting',
    ],

    links: [
      {
        label: 'Learn more about GPC',
        url: 'https://globalprivacycontrol.org/',
      },
    ],

    tradeoffs: [
      'Not all websites currently respect the signal.',
    ],
  },

  reduce_cookies: {
    id: 'reduce-cookies',
    dynamic: true,

    title: 'Reduce cookie and tracking exposure',
    description:
      'Limiting third-party cookies can reduce cross-site tracking and advertising profiles.',

    effort: 'medium',
    impact: 'high',

    why:
      'Advertising networks often use cookies to track browsing behavior across multiple websites.',

    steps: [
      '[Dynamic browser specific cookie settings steps will appear here]',
    ],

    links: [
      {
        label: '[Dynamic browser specific cookie settings link]',
        url: 'https://example.com',
      },
    ],

    tradeoffs: [
      'Some websites may require cookies to function correctly.',
    ],
  },

  use_adblock: {
    id: 'use-adblock',
    dynamic: false,

    title: 'Use an ad blocker',
    description:
      'Ad blockers can reduce tracking, improve page loading times and make websites less distracting.',

    effort: 'easy',
    impact: 'high',

    why:
      'Many advertisements contain tracking scripts that monitor browsing behavior across websites.',

    steps: [
      'Install uBlock Origin',
      'Keep the default filter lists enabled',
      'Restart your browser if necessary',
    ],

    links: [
      {
        label: 'uBlock Origin',
        url: 'https://ublockorigin.com/',
      },
    ],

    tradeoffs: [
      'Some websites may ask you to disable your ad blocker.',
    ],
  },

  use_password_manager: {
    id: 'use-password-manager',
    dynamic: false,

    title: 'Use a password manager',
    description:
      'Password managers help create and store strong unique passwords for every account.',

    effort: 'easy',
    impact: 'high',

    why:
      'Reusing passwords increases the risk that one leaked password compromises multiple accounts.',

    steps: [
      'Choose a password manager',
      'Create a strong master password',
      'Replace reused passwords over time',
    ],

    links: [
      {
        label: 'Bitwarden',
        url: 'https://bitwarden.com/',
      },
      {
        label: 'KeePassXC',
        url: 'https://keepassxc.org/',
      },
    ],

    tradeoffs: [
      'You must remember your master password carefully.',
    ],
  },

  use_vpn: {
    id: 'use-vpn',
    dynamic: false,

    title: 'Use a VPN for better privacy',
    description:
      'A VPN can hide your IP address from websites and protect traffic on public networks.',

    effort: 'advanced',
    impact: 'medium',

    why:
      'Without a VPN, websites and network providers can often see your real IP address and browsing activity.',

    steps: [
      'Choose a trusted VPN provider',
      'Install the VPN application',
      'Enable the VPN on untrusted networks',
    ],

    links: [
      {
        label: 'Mozilla VPN',
        url: 'https://www.mozilla.org/products/vpn/',
      },
    ],

    tradeoffs: [
      'VPNs can reduce connection speed.',
      'You must trust the VPN provider.',
    ],
  },
} satisfies Record<string, Recommendation>
