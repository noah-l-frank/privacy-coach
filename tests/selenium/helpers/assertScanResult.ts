import type { DetectionResult } from '../../../src/services/detection'
import type { browserConfigs } from '../browserConfigs'

type BrowserConfig = (typeof browserConfigs)[number]

export function assertScanResult(result: DetectionResult, config: BrowserConfig) {
  if (result.browserFamily !== config.expected.browserFamily) {
    throw new Error(
      `${config.name}: expected browserFamily ${config.expected.browserFamily} but got ${result.browserFamily}`,
    )
  }

  if (result.browser !== config.expected.browser) {
    throw new Error(
      `${config.name}: expected browser ${config.expected.browser} but got ${result.browser}`,
    )
  }
}
