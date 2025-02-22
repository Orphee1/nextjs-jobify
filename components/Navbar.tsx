import { UserButton } from '@clerk/nextjs'
import { LinksDropDown, ThemeToggle } from '@/components/components'

function Navbar() {
  return (
    <nav className='bg-muted py-4 sm:px-16 px-4 lg:px-24 flex items-center justify-between'>
      <div>
        <LinksDropDown />
      </div>
      <div className='flex items-center gap-x-4'>
        <ThemeToggle />
        <UserButton afterSwitchSessionUrl='/' />
      </div>
    </nav>
  )
}

export default Navbar
