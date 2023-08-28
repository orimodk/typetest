'use client'

import Image from 'next/image'
import Gallery from './components/gallery'
import RandomProdukter from './components/randomProducts';

export default function Home() {
  /* const images = [
    { src: '/images/image01.png', alt: 'Description 1' },
    { src: '/images/image02.webp', alt: '' },
    { src: '/images/image03.jpg', alt: '' },
    { src: '/images/image01.png', alt: 'Description 1' },
    { src: '/images/image02.webp', alt: 'Description 2' },
    { src: '/images/image02.webp', alt: 'Description 2' },
    { src: '/images/image03.jpg', alt: 'Description 2' },
    { src: '/images/image01.png', alt: 'Description 1' },
    { src: '/images/image02.webp', alt: 'Description 2' },
    { src: '/images/image02.webp', alt: 'Description 2' },
    { src: '/images/image03.jpg', alt: 'Description 2' },
    { src: '/images/image01.png', alt: 'Description 1' },
    { src: '/images/image02.webp', alt: 'Description 2' },
    { src: '/images/image03.jpg', alt: 'Description 2' }
  ]; */
  return (
    <><h1 className='text-2xl my-5 uppercase md:text-9xl'>Frontpage</h1><RandomProdukter nrOfProducts={25} /></>
  )
}
