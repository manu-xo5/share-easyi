import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () =>
    redirect({
      to: '/app',
      replace: true,
      throw: true,
    }),
  component: () => null,
})
