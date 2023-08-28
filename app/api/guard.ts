import { DateTime } from 'luxon'

/**
 * Checks if the current time has passed a given datetime.
 * @param predefinedDateTime The datetime to compare against in 'YYYY-MM-DD HH:MM' format.
 * @param timezone The IANA time zone string.
 * @returns `true` if the current time has passed the predefined datetime, otherwise `false`.
 */
export function hasPassedPredefinedDateTime(
  predefinedDateTime: string,
  timezone: string = 'Asia/Shanghai',
): boolean {
  const dateTimeComponents = predefinedDateTime.split(' ')
  const dateComponents = dateTimeComponents[0].split('-').map(Number)
  const timeComponents = dateTimeComponents[1].split(':').map(Number)

  // Create a DateTime object for the predefined date and time in the specified timezone
  const compareDateTime = DateTime.fromObject(
    {
      year: dateComponents[0],
      month: dateComponents[1],
      day: dateComponents[2],
      hour: timeComponents[0],
      minute: timeComponents[1],
    },
    { zone: timezone },
  )

  // Get the current time in the specified timezone
  const now = DateTime.now().setZone(timezone)

  // Return whether the current time has passed the predefined datetime
  return now > compareDateTime
}
