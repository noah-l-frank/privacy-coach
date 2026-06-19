import type { Recommendation } from './types'

export const recommendationContent = {
  switch_to_firefox: {
    id: 'switch-to-firefox',
    dynamic: false,

    title: 'Try Firefox for stronger privacy controls',
    description:
      'Firefox is independent from the Chromium ecosystem and gives you detailed control over tracking protection, cookies, and privacy signals.',

    effort: 'medium',
    impact: 'high',

    why:
      'Using a browser outside the Chromium ecosystem reduces dependence on one browser engine and gives you privacy controls that are easier to inspect and adjust.',

    steps: [
      'Download and install Firefox',
      'Import only the data you actually need',
      'Set Enhanced Tracking Protection to Strict if websites still work well for you',
      'Check whether Global Privacy Control is enabled',
    ],

    links: [
      {
        label: 'Download Firefox',
        url: 'https://www.mozilla.org/firefox/',
      },
    ],

    tradeoffs: [
      'A few websites may behave differently than they do in Chrome-based browsers.',
      'Browser sync, profiles, and extensions may need some setup time.',
    ],
  },

  switch_to_brave: {
    id: 'switch-to-brave',
    dynamic: false,

    title: 'Consider a more private Chromium-based browser',
    description:
      'Brave keeps a familiar Chromium-based browsing experience while adding stronger default blocking for ads, trackers, and some fingerprinting techniques.',

    effort: 'easy',
    impact: 'medium',

    why:
      'For people who rely on Chrome-like compatibility, Brave can reduce tracking exposure without requiring a completely different browsing workflow.',

    steps: [
      'Download and install Brave',
      'Import only the bookmarks, passwords, or settings you actually need',
      'Review Brave Shields settings',
      'Keep optional features you do not use turned off',
    ],

    links: [
      {
        label: 'Download Brave',
        url: 'https://brave.com/',
      },
    ],

    tradeoffs: [
      'Some privacy features may occasionally break website functionality.',
      'Brave is still Chromium-based, so it does not reduce browser-engine concentration.',
      'Optional features such as Rewards, Wallet, or VPN should be reviewed before use.',
    ],
  },

  enable_gpc: {
    id: 'enable-gpc',
    dynamic: true,

    title: 'Enable Global Privacy Control',
    description:
      'Global Privacy Control sends a signal that you do not want your personal data sold or shared where websites recognize that preference.',

    effort: 'easy',
    impact: 'medium',

    why:
      'GPC is designed as a browser-level privacy preference, so you do not have to look for separate opt-out links on every website.',

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
      'Not every website recognizes or honors the signal.',
      'The legal effect depends on where you live and which laws apply to the website.',
    ],
  },

  use_gpc_extension: {
    id: 'use-gpc-extension',
    dynamic: false,

    title: 'Send a Global Privacy Control signal',
    description:
      'Your browser does not appear to support Global Privacy Control natively, but a carefully chosen privacy extension can send the signal for you.',

    effort: 'easy',
    impact: 'medium',

    why:
      'GPC communicates a broad opt-out preference for data sale or sharing, and extensions can add that signal to browsers that do not expose it directly.',

    steps: [
      'Choose a reputable extension that explicitly supports Global Privacy Control',
      'Review the extension permissions before installing it',
      'Open the extension settings and enable Global Privacy Control',
      'Verify the signal on the official GPC test page',
    ],

    links: [
      {
        label: 'Learn more about GPC',
        url: 'https://globalprivacycontrol.org/',
      },
    ],

    tradeoffs: [
      'Browser extensions can access sensitive browsing data, so extension choice matters.',
      'Using fewer high-trust extensions is usually safer than installing many small privacy tools.',
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
      'Advertising and analytics networks can use cookies to recognize your browser across multiple websites and sessions.',

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
      'Blocking too many cookies can sign you out or break shopping carts and account pages.',
      'Blocking third-party cookies is usually a better first step than blocking every cookie.',
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
      'Many ads load third-party scripts that can track browsing behavior across websites, even when the visible ad itself seems harmless.',

    steps: [
      'Install uBlock Origin',
      'Keep the default filter lists enabled',
      'Avoid installing multiple overlapping content blockers',
      'Allowlist individual sites only when you trust them and something important breaks',
    ],

    links: [
      {
        label: 'uBlock Origin',
        url: 'https://ublockorigin.com/',
      },
    ],

    tradeoffs: [
      'Some websites may ask you to disable your ad blocker.',
      'Overly aggressive filter lists can occasionally break page features.',
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

    title: 'Use a VPN on untrusted networks',
    description:
      'A VPN can be useful on public or untrusted networks, but it is not a complete privacy solution.',

    effort: 'advanced',
    impact: 'medium',

    why:
      'A VPN can hide your traffic from the local network operator and change the IP address websites see, but the VPN provider then becomes a party you must trust.',

    steps: [
      'Use a VPN especially on public Wi-Fi or networks you do not trust',
      'Choose a provider with a clear privacy policy and a business model you understand',
      'Install the VPN application',
      'Keep HTTPS enabled and do not treat the VPN as anonymity by itself',
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
      'A VPN does not stop tracking through cookies, login accounts, or browser fingerprinting.',
      'Some websites may show more CAPTCHAs or block VPN traffic.',
    ],
  },
} satisfies Record<string, Recommendation>
