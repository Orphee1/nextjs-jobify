import { AreaChart, Layers, AppWindow } from 'lucide-react'
import React from 'react'

type NavLink = {
  href: string
  label: string
  icon: React.ReactNode
}

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'add-job',
    icon: <Layers />,
  },
  {
    href: '/jobs',
    label: 'jobs',
    icon: <AppWindow />,
  },
  {
    href: '/stats',
    label: 'stats',
    icon: <AreaChart />,
  },
]

export { links }
