import { describe, it, expect } from 'vitest'
import { getNextFollowUpQuestion } from '../questions'

describe('getNextFollowUpQuestion', () => {
  const baseResult = {
    browserFamily: 'unknown',
    browser: 'unknown',
    os: 'linux',
    language: 'de-DE',
    timezone: 'Europe/Berlin',
    gpc: true,
    cookiesEnabled: false,
    https: true,
  }

  it('returns the privacy preference question first when cookies are enabled', () => {
    const question = getNextFollowUpQuestion({ ...baseResult, cookiesEnabled: true }, {})

    expect(question?.id).toBe('privacy_preference')
  })

  it('returns the search engine question for privacy-focused users', () => {
    const question = getNextFollowUpQuestion(baseResult, {
      privacy_preference: 'privacy',
    })

    expect(question?.id).toBe('search_engine')
  })

  it('returns the password management question after search engine was answered', () => {
    const question = getNextFollowUpQuestion(baseResult, {
      privacy_preference: 'privacy',
      search_engine: 'google',
    })

    expect(question?.id).toBe('password_management')
  })

  it('returns the vpn usage question for privacy users after password management was answered', () => {
    const question = getNextFollowUpQuestion(baseResult, {
      privacy_preference: 'privacy',
      search_engine: 'google',
      password_management: 'manager',
    })

    expect(question?.id).toBe('vpn_usage')
  })

  it('returns the adblock usage question for privacy users after earlier privacy questions are answered', () => {
    const question = getNextFollowUpQuestion(baseResult, {
      privacy_preference: 'privacy',
      search_engine: 'google',
      password_management: 'manager',
      vpn_usage: 'yes',
    })

    expect(question?.id).toBe('adblock_usage')
  })

  it('skips vpn usage for balanced users', () => {
    const question = getNextFollowUpQuestion(baseResult, {
      privacy_preference: 'balanced',
      search_engine: 'google',
      password_management: 'manager',
    })

    expect(question?.id).toBe('adblock_usage')
  })

  it('skips privacy questions for convenience users', () => {
    const question = getNextFollowUpQuestion(baseResult, {
      privacy_preference: 'convenience',
    })

    expect(question).toBeNull()
  })

  it('returns the browser switch willingness question for Chrome users after earlier questions are answered', () => {
    const question = getNextFollowUpQuestion(
      { ...baseResult, browserFamily: 'chromium', browser: 'chrome' },
      {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
        vpn_usage: 'yes',
        adblock_usage: 'yes',
      },
    )

    expect(question?.id).toBe('browser_switch_willingness')
  })

  it('returns the browser switch willingness question for Edge users', () => {
    const question = getNextFollowUpQuestion(
      { ...baseResult, browserFamily: 'chromium', browser: 'edge' },
      {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
        vpn_usage: 'yes',
        adblock_usage: 'yes',
      },
    )

    expect(question?.id).toBe('browser_switch_willingness')
  })

  it('returns the browser similarity question only after the user is open to switching', () => {
    const question = getNextFollowUpQuestion(
      { ...baseResult, browserFamily: 'chromium', browser: 'chrome' },
      {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
        vpn_usage: 'yes',
        adblock_usage: 'yes',
        browser_switch_willingness: 'yes',
      },
    )

    expect(question?.id).toBe('browser_switch_similarity')
  })

  it('does not return the browser similarity question if the user does not want to switch', () => {
    const question = getNextFollowUpQuestion(
      { ...baseResult, browserFamily: 'chromium', browser: 'chrome' },
      {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
        vpn_usage: 'yes',
        adblock_usage: 'yes',
        browser_switch_willingness: 'no',
      },
    )

    expect(question).toBeNull()
  })

  it('returns the tracking protection preference question when do not track is disabled', () => {
    const question = getNextFollowUpQuestion(
      { ...baseResult, gpc: false },
      {
        privacy_preference: 'convenience',
      },
    )

    expect(question?.id).toBe('tracking_protection_preference')
  })

  it('returns no follow-up question when no follow-up is needed', () => {
    const question = getNextFollowUpQuestion(baseResult, {
      privacy_preference: 'convenience',
    })

    expect(question).toBeNull()
  })

  it('returns the next unanswered relevant question in the correct order', () => {
    const result = {
      ...baseResult,
      browserFamily: 'chromium',
      browser: 'chrome',
      gpc: false,
      cookiesEnabled: true,
    }

    expect(getNextFollowUpQuestion(result, {})?.id).toBe('privacy_preference')

    expect(
      getNextFollowUpQuestion(result, {
        privacy_preference: 'privacy',
      })?.id,
    ).toBe('search_engine')

    expect(
      getNextFollowUpQuestion(result, {
        privacy_preference: 'privacy',
        search_engine: 'google',
      })?.id,
    ).toBe('password_management')

    expect(
      getNextFollowUpQuestion(result, {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
      })?.id,
    ).toBe('vpn_usage')

    expect(
      getNextFollowUpQuestion(result, {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
        vpn_usage: 'yes',
      })?.id,
    ).toBe('adblock_usage')

    expect(
      getNextFollowUpQuestion(result, {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
        vpn_usage: 'yes',
        adblock_usage: 'yes',
      })?.id,
    ).toBe('browser_switch_willingness')

    expect(
      getNextFollowUpQuestion(result, {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
        vpn_usage: 'yes',
        adblock_usage: 'yes',
        browser_switch_willingness: 'yes',
      })?.id,
    ).toBe('browser_switch_similarity')

    expect(
      getNextFollowUpQuestion(result, {
        privacy_preference: 'privacy',
        search_engine: 'google',
        password_management: 'manager',
        vpn_usage: 'yes',
        adblock_usage: 'yes',
        browser_switch_willingness: 'yes',
        browser_switch_similarity: 'high',
      })?.id,
    ).toBe('tracking_protection_preference')
  })
})
