import { format } from 'date-fns'

export default function DateComponent({ dateString }) {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), 'LLLL, yyyy')} - {format(new Date(dateString), 'MMMM, yyyy')}
    </time>
  )
}
