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

  if (result.os !== config.expected.os) {
    throw new Error(`${config.name}: expected os ${config.expected.os} but got ${result.os}`)
  }

  if (result.cookiesEnabled !== config.expected.cookiesEnabled) {
    throw new Error(
      `${config.name}: expected cookiesEnabled ${config.expected.cookiesEnabled} but got ${result.cookiesEnabled}`,
    )
  }

  if (result.gpc !== config.expected.gpc) {
    throw new Error(`${config.name}: expected gpc ${config.expected.gpc} but got ${result.gpc}`)
  }

  if (result.https !== config.expected.https) {
    throw new Error(
      `${config.name}: expected https ${config.expected.https} but got ${result.https}`,
    )
  }

  if (
    config.expected.fingerprintingExposure?.deviceMemory !== undefined &&
    result.fingerprintingExposure.deviceMemory !==
    config.expected.fingerprintingExposure.deviceMemory
  ) {
    throw new Error(
      `${config.name}: expected fingerprintingExposure.deviceMemory ${config.expected.fingerprintingExposure.deviceMemory} but got ${result.fingerprintingExposure.deviceMemory}`,
    )
  }
}
