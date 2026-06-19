import type { DeviceType } from './types'

export function detectOS(userAgent: string): string {
  if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
    return 'ios'
  }

  if (userAgent.includes('android')) return 'android'
  if (userAgent.includes('win')) return 'windows'
  if (userAgent.includes('mac')) return 'macos'
  if (userAgent.includes('linux')) return 'linux'

  return 'unknown'
}

export function detectDeviceType(userAgent: string): DeviceType {
  if (userAgent.includes('ipad') || userAgent.includes('tablet')) return 'tablet'
  if (userAgent.includes('iphone') || userAgent.includes('ipod')) return 'mobile'
  if (userAgent.includes('android') && userAgent.includes('mobile')) return 'mobile'
  if (userAgent.includes('android')) return 'tablet'
  if (userAgent.includes('windows') || userAgent.includes('mac') || userAgent.includes('linux')) {
    return 'desktop'
  }

  return 'unknown'
}
