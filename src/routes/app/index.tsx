import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Welcome back</div>
}
