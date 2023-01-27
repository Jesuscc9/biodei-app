import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es)

export const timeAgoFormat = (date: Date | undefined | null): string => {
  if (date == null) return 'No date provided'
  return new TimeAgo('es-ES').format(date)
}
