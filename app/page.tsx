import Image from 'next/image'
import Logo from '@/assets/logo.svg'

export default function Home() {
  return (
    <main
    // className='h-screen flex items-center justify-center'
    >
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6'>
        <Image src={Logo} alt='logo' />
      </header>
    </main>
  )
}
