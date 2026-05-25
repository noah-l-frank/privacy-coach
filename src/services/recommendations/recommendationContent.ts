import type { Recommendation } from './types'

export const recommendationContent = {
  switch_to_firefox: {
    id: 'switch-to-firefox',
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

  optimize_firefox: {
    id: 'optimize-firefox',
    title: 'Optimize your Firefox privacy settings',
    description:
      'Firefox already includes strong privacy features, but some settings can further improve protection.',

    effort: 'easy',
    impact: 'medium',

    why:
      'Default settings provide a good balance, but enabling stricter protections can reduce tracking even more.',

    steps: [
      'Open Firefox settings',
      'Enable Strict Tracking Protection',
      'Review cookie and telemetry settings',
    ],

    links: [
      {
        label: 'Firefox privacy settings',
        url: 'https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop',
      },
    ],

    tradeoffs: [
      'Strict protection may cause some websites to stop working correctly.',
    ],
  },

  enable_gpc: {
    id: 'enable-gpc',
    title: 'Enable Global Privacy Control',
    description:
      'Global Privacy Control tells websites that you do not want your data to be sold or shared.',

    effort: 'easy',
    impact: 'medium',

    why:
      'Some websites and regions legally recognize the GPC signal as a privacy preference.',

    steps: [
      'Open your browser privacy settings',
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
    title: 'Reduce cookie and tracking exposure',
    description:
      'Limiting third-party cookies can reduce cross-site tracking and advertising profiles.',

    effort: 'medium',
    impact: 'high',

    why:
      'Advertising networks often use cookies to track browsing behavior across multiple websites.',

    steps: [
      'Open browser privacy settings',
      'Block third-party cookies',
      'Clear existing tracking cookies regularly',
    ],

    links: [
      {
        label: 'Cookie settings overview',
        url: 'https://support.mozilla.org/kb/third-party-cookies-firefox-tracking-protection',
      },
    ],

    tradeoffs: [
      'Some websites may require cookies to function correctly.',
    ],
  },

  use_adblock: {
    id: 'use-adblock',
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
