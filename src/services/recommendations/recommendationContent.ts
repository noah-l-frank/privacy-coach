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

  enable_gpc: {
    id: 'enable-gpc',
    dynamic: true,

    title: 'Enable Global Privacy Control',
    description:
      'Global Privacy Control tells websites that you do not want your data to be sold or shared.',

    effort: 'easy',
    impact: 'medium',

    why:
      'Some websites and regions legally recognize the GPC signal as a privacy preference.',

    steps: [
      '[Dynamic browser specific GPC steps will appear here]',
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

  use_gpc_extension: {
    id: 'use-gpc-extension',
    dynamic: false,

    title: 'Send a Global Privacy Control signal',
    description:
      'Your browser does not appear to support Global Privacy Control natively, but a privacy extension can send the signal for you.',

    effort: 'easy',
    impact: 'medium',

    why:
      'GPC communicates that you do not want your data sold or shared, and some websites are legally required to respect it.',

    steps: [
      'Install a trusted privacy extension that supports Global Privacy Control',
      'Open the extension settings',
      'Confirm that Global Privacy Control is enabled',
    ],

    links: [
      {
        label: 'Learn more about GPC',
        url: 'https://globalprivacycontrol.org/',
      },
    ],

    tradeoffs: [
      'Browser extensions can access sensitive browsing data, so choose one carefully.',
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

  reduce_fingerprinting: {
    id: 'reduce-fingerprinting',
    dynamic: false,

    title: 'Reduce browser fingerprinting exposure',
    description:
      'Your browser exposes several signals that can make it easier for websites to recognize your device across visits.',

    effort: 'medium',
    impact: 'high',

    why:
      'Fingerprinting combines browser and device details such as canvas, WebGL, language, timezone, and hardware signals to create a recognizable profile without relying on cookies.',

    steps: [
      'Use a browser with stronger anti-fingerprinting protections',
      'Avoid installing unnecessary browser extensions',
      'Keep privacy and tracking protection settings enabled',
      'Prefer common browser configurations over highly customized setups',
    ],

    links: [
      {
        label: 'Firefox fingerprinting protection',
        url: 'https://support.mozilla.org/kb/firefox-protection-against-fingerprinting',
      },
      {
        label: 'Brave fingerprinting protections',
        url: 'https://support.brave.com/hc/articles/360022806212',
      },
    ],

    tradeoffs: [
      'Stronger anti-fingerprinting settings can occasionally reduce website compatibility.',
      'Some signals are difficult to hide completely in normal browsers.',
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
