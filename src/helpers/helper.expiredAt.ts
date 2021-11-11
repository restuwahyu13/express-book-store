import { convertTime } from '@/helpers/helper.convertTime'

export const expiredAt = (ms: number, type: string): string | null => {
  const time: number = convertTime(ms, type)
  const date: any = new Date()

  switch (type) {
    case 'second':
      date.setSeconds(time)
      return date.toISOString()
    case 'minute':
      date.setMinutes(time)
      return date.toISOString()
    case 'days':
      date.setDate(time)
      return date.toISOString()
    default:
      return null
  }
}
