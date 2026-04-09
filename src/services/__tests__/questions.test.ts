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

  it('returns no follow-up questions when no follow-up is needed', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chromium',
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
