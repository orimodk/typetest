import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About page',
  description: 'Here is the about page',
}

export default function About() {
  return (
        <h1 className='text-9xl my-5 uppercase'>About</h1>
  )
}
