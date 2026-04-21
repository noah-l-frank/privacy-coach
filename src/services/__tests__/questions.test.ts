import { describe, it, expect } from 'vitest'
import { getNextFollowUpQuestion } from '../questions'

describe('getNextFollowUpQuestion', () => {
  it('returns the cookie preference question first when cookies are enabled', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chromium',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: true,
      https: true,
      adblock: false,
    }

    const question = getNextFollowUpQuestion(result, {})

    expect(question).not.toBeNull()
    expect(question?.id).toBe('cookie_preference')
  })

  it('returns the adblock interest question after cookie preference was answered', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chromium',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: true,
      https: true,
      adblock: false,
    }

    const question = getNextFollowUpQuestion(result, {
      cookie_preference: 'privacy',
    })

    expect(question).not.toBeNull()
    expect(question?.id).toBe('adblock_interest')
  })

  it('returns the browser switch willingness question for Chrome users after earlier questions are answered', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chrome',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: true,
      cookiesEnabled: false,
      https: true,
      adblock: false,
    }

    const question = getNextFollowUpQuestion(result, {
      adblock_interest: 'yes',
    })

    expect(question).not.toBeNull()
    expect(question?.id).toBe('browser_switch_willingness')
  })

  it('returns the browser switch willingness question for Edge users', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'edge',
      os: 'windows',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: true,
      cookiesEnabled: false,
      https: true,
      adblock: true,
    }

    const question = getNextFollowUpQuestion(result, {})

    expect(question).not.toBeNull()
    expect(question?.id).toBe('browser_switch_willingness')
  })

  it('returns the browser similarity question only after the user is open to switching', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chrome',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: true,
      cookiesEnabled: false,
      https: true,
      adblock: true,
    }

    const question = getNextFollowUpQuestion(result, {
      browser_switch_willingness: 'yes',
    })

    expect(question).not.toBeNull()
    expect(question?.id).toBe('browser_switch_similarity')
  })

  it('does not return the browser similarity question if the user does not want to switch', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chrome',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: true,
      cookiesEnabled: false,
      https: true,
      adblock: true,
    }

    const question = getNextFollowUpQuestion(result, {
      browser_switch_willingness: 'no',
    })

    expect(question).toBeNull()
  })

  it('returns the tracking protection preference question when do not track is disabled', () => {
    const result = {
      browserFamily: 'unknown',
      browser: 'unknown',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: false,
      https: true,
      adblock: true,
    }

    const question = getNextFollowUpQuestion(result, {})

    expect(question).not.toBeNull()
    expect(question?.id).toBe('tracking_protection_preference')
  })

  it('returns no follow-up question when no follow-up is needed', () => {
    const result = {
      browserFamily: 'unknown',
      browser: 'unknown',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: true,
      cookiesEnabled: false,
      https: true,
      adblock: true,
    }

    const question = getNextFollowUpQuestion(result, {})

    expect(question).toBeNull()
  })

  it('returns the next unanswered relevant question in the correct order', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chrome',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: true,
      https: true,
      adblock: false,
    }

    const firstQuestion = getNextFollowUpQuestion(result, {})
    expect(firstQuestion?.id).toBe('cookie_preference')

    const secondQuestion = getNextFollowUpQuestion(result, {
      cookie_preference: 'privacy',
    })
    expect(secondQuestion?.id).toBe('adblock_interest')

    const thirdQuestion = getNextFollowUpQuestion(result, {
      cookie_preference: 'privacy',
      adblock_interest: 'yes',
    })
    expect(thirdQuestion?.id).toBe('browser_switch_willingness')

    const fourthQuestion = getNextFollowUpQuestion(result, {
      cookie_preference: 'privacy',
      adblock_interest: 'yes',
      browser_switch_willingness: 'yes',
    })
    expect(fourthQuestion?.id).toBe('browser_switch_similarity')

    const fifthQuestion = getNextFollowUpQuestion(result, {
      cookie_preference: 'privacy',
      adblock_interest: 'yes',
      browser_switch_willingness: 'yes',
      browser_switch_similarity: 'high',
    })
    expect(fifthQuestion?.id).toBe('tracking_protection_preference')
  })
})
