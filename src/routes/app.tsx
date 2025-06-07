import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/app')({
  beforeLoad: async () => {
    const { error } = await authClient.getSession()

    if (error) {
      redirect({
        throw: true,
        to: '/login',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Outlet />
    </div>
  )
}
