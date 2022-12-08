import Container from './container'
import cn from 'classnames'

export default function Alert() {
  return (
    <div
      className={cn('border-b',
        'bg-accent-1 border-accent-2')}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          <>
            The source code for this template is available on the Solutions Engineering{' '}
            <a
              href={`https://github.com/Netlify-Moneytronic`}
              className="underline hover:text-success duration-200 transition-colors"
            >
              GitHub
            </a>
            .
          </>
        </div>
      </Container>
    </div>
  )
}
