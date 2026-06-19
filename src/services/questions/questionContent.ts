import type { FollowUpQuestion } from './types'

export const questionContent = {
  privacy_preference: {
    id: 'privacy_preference',
    title: 'What matters more to you while browsing?',
    description: 'Some browser settings improve convenience, while others improve privacy.',
    options: [
      { value: 'privacy', label: 'I prefer more privacy' },
      { value: 'balanced', label: 'I want a balance' },
      { value: 'convenience', label: 'I prefer convenience' },
      { value: 'maximum_privacy', label: 'I want maximum privacy' },
    ],
  },

  search_engine: {
    id: 'search_engine',
    title: 'Which search engine do you usually use?',
    description: 'Your search engine choice affects how much of your browsing behavior is tracked.',
    options: [
      { value: 'google', label: 'Google' },
      { value: 'duckduckgo', label: 'DuckDuckGo' },
      { value: 'startpage', label: 'Startpage' },
      { value: 'ecosia', label: 'Ecosia' },
      { value: 'other', label: 'Other' },
    ],
  },

  password_management: {
    id: 'password_management',
    title: 'How do you manage your passwords?',
    description: 'Strong, unique passwords are essential for protecting your accounts.',
    options: [
      { value: 'manager', label: 'I use a password manager' },
      { value: 'reuse', label: 'I reuse passwords' },
      { value: 'memory', label: 'I remember them myself' },
    ],
  },

  vpn_usage: {
    id: 'vpn_usage',
    title: 'Do you use a VPN when browsing the internet?',
    description: 'A VPN can help hide your IP address and improve privacy on untrusted networks.',
    options: [
      { value: 'yes', label: 'Yes, regularly' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'no', label: 'No' },
    ],
  },

  adblock_usage: {
    id: 'adblock_usage',
    title: 'Do you use an ad blocker?',
    description: 'Ad blockers can reduce tracking and improve privacy while browsing.',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'not_sure', label: 'Not sure' },
    ],
  },

  browser_switch_willingness: {
    id: 'browser_switch_willingness',
    title: 'Would you be open to trying a different browser for better privacy?',
    description: 'Some browsers offer stronger privacy protections by default.',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'maybe', label: 'Maybe' },
      { value: 'no', label: 'No' },
    ],
  },

  browser_switch_similarity: {
    id: 'browser_switch_similarity',
    title: 'How important is it that a new browser feels familiar?',
    description: 'Some alternatives feel very similar, while others are more different.',
    options: [
      { value: 'high', label: 'Very important' },
      { value: 'medium', label: 'Somewhat important' },
      { value: 'low', label: 'Not important' },
    ],
  },

  tracking_protection_preference: {
    id: 'tracking_protection_preference',
    title: 'Would you like your browser to reduce tracking as much as possible?',
    description: 'Some browsers and settings can reduce tracking more aggressively than others.',
    options: [
      { value: 'high', label: 'Yes, as much as possible' },
      { value: 'medium', label: 'Somewhat' },
      { value: 'low', label: 'Not really' },
    ],
  },
} satisfies Record<string, FollowUpQuestion>
