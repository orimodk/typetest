'use client'

import Link from 'next/link'
import SearchField from './searchField'

export default function Header() {
    return (
        <header className='fixed flex w-full bg-white items-center justify-center shadow-lg'>
            <div className='container flex justify-between'>
                <div className='flex justify-center items-center'><Link href="/"><span>LOGO</span></Link></div>
                <SearchField />
                <nav
                    className=" items-center justify-between py-2 md:flex-wrap md:justify-start "
                    data-te-navbar-ref>
                    <Link className='text-black hover:text-blue-200' href="/">Frontpage</Link> - <Link className='text-black hover:text-blue-200' href="/about">About</Link> - <Link className='text-black hover:text-blue-200' href="/download">download</Link> - <Link className='text-black hover:text-blue-200' href="/offers">Offers</Link>
                </nav>
            </div>
        </header>
    )
}
