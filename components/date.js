import { format } from 'date-fns'

export default function DateComponent({ startDateString, endDateString }) {
  return (
    <time dateTime={startDateString}>
      {format(new Date(startDateString), 'LLLL, yyyy')} - {endDateString ? format(new Date(endDateString), 'LLLL, yyyy') : 'Present'}
    </time>
  )
}
