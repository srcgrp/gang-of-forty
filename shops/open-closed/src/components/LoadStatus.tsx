import type { LoadState } from '../types.ts'
import { statusText } from '../lib/statusText.ts'
import Skeleton from './Skeleton.tsx'

const SKELETON_IDS = ['a', 'b', 'c', 'd', 'e', 'f']

type LoadStatusProps = { state: LoadState<unknown> }

export default function LoadStatus({ state }: LoadStatusProps) {
  return (
    <section className="section" aria-busy={state.status === 'loading'}>
      <p className="carousel-status" role="status" aria-live="polite">
        {statusText(state, 0)}
      </p>
      {state.status === 'loading' && (
        <div className="carousel">
          <ul>
            {SKELETON_IDS.map((id) => <Skeleton key={id} />)}
          </ul>
        </div>
      )}
    </section>
  )
}