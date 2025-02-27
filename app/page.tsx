import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import LandingImg from '@/assets/main.svg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Home() {
  return (
    <main>
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-3 flex'>
        <Image src={Logo} alt='logo' />
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <section className='max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center '>
        <div>
          <h1 className='capitalize text-4xl md:text-7xl font-bold'>
            Job <span className='text-primary'>tracking</span> app
          </h1>
          <p className='leading-loose max-w-md mt-4 '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            molestias placeat non deserunt obcaecati officia impedit aspernatur,
            aperiam eligendi voluptatibus. Ipsa cum ipsam hic atque tempore.
            Libero necessitatibus possimus facere.
          </p>
          <Button asChild className='mt-4' size='lg'>
            <Link href='/add-job'>Get started</Link>
          </Button>
        </div>
        <Image
          src={LandingImg}
          alt='girl walking'
          className='hidden lg:block'
        />
      </section>
    </main>
  )
}
