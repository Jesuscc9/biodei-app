import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es)

export const timeAgoFormat = (date: Date): string => {
  return new TimeAgo('es-ES').format(date)
}
