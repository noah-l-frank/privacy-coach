import { describe, it, expect } from 'vitest'
import { getFollowUpQuestions } from '../questions'

describe('getFollowUpQuestions', () => {
  it('returns follow-up questions for disabled do not track and enabled cookies', () => {
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

    const questions = getFollowUpQuestions(result)

    expect(questions).toHaveLength(2)
    expect(questions.map((question) => question.id)).toEqual([
      'dnt_preference',
      'cookie_preference',
    ])
  })

  it('adds the Chrome browser switch similarity question for Chrome users', () => {
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

    const questions = getFollowUpQuestions(result)

    expect(questions).toHaveLength(1)

    const [question] = questions
    if (!question) throw new Error('Expected one question')

    expect(question.id).toBe('browser_switch_similarity')
  })

  it('adds the browser switch willingness question for Edge users', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'edge',
      os: 'windows',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: true,
      cookiesEnabled: false,
      https: true,
      adblock: false,
    }

    const questions = getFollowUpQuestions(result)

    expect(questions).toHaveLength(1)

    const [question] = questions
    if (!question) throw new Error('Expected one question')

    expect(question.id).toBe('browser_switch_willingness')
  })

  it('adds the Firefox privacy importance question for Firefox users', () => {
    const result = {
      browserFamily: 'firefox',
      browser: 'firefox',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: true,
      cookiesEnabled: false,
      https: true,
      adblock: false,
    }

    const questions = getFollowUpQuestions(result)

    expect(questions).toHaveLength(1)

    const [question] = questions
    if (!question) throw new Error('Expected one question')

    expect(question.id).toBe('firefox_privacy_importance')
  })

  it('returns no follow-up questions when no follow-up is needed', () => {
    const result = {
      browserFamily: 'unknown',
      browser: 'unknown',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: true,
      cookiesEnabled: false,
      https: true,
      adblock: false,
    }

    const questions = getFollowUpQuestions(result)

    expect(questions).toHaveLength(0)
  })
})
