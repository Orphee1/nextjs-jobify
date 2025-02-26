'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { links } from '@/utils/links'
import Logo from '@/assets/logo.svg'
import { Button } from './ui/button'

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className=' h-full py-4 px-8 bg-muted '>
      <Image src={Logo} alt='logo' className='mx-auto' />
      <div className='flex flex-col mt-20 gap-y-4'>
        {links.map((link) => (
          <Button
            asChild
            key={link.label}
            variant={pathname === link.href ? 'default' : 'link'}
          >
            <Link href={link.href} className='flex items-center gap-x-2'>
              {link.icon}
              <span className='capitalize'>{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
