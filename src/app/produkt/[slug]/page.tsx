'use client'

import RandomProdukter from '../../components/randomProducts';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'

type Product = {
    produktid: string | null;
    produktnavn: string[];
    billedurl: string[];
};

type Data = {
    produkter: Product[];
};

import rawData from '../../../../public/merged.json';
const data = rawData as Data;

export default function Page() {
    const searchParams = useSearchParams();
    const productId = searchParams.get('pid');

    const product = data.produkter.find(prod => prod.produktid && prod.produktid[0] === productId);

    return (
        <><div>
            <p>ID: {productId ?? "Not Available"}</p>
            <h1>{product?.produktnavn?.[0] ?? "Not Found"}</h1>
            <Image
                src={product?.billedurl[0] || '/product_placeholder.svg'} // Use fallback image source
                alt={product?.produktnavn[0] || 'test'} // Use fallback alt text
                width={200}
                height={200}
                priority={true} />
        </div><div>
                <h2 className='text-xl mt-10'>Fandt du ikke hvad du ledte efter?</h2>
                <p>Prøv en af disse varer:</p>
                <RandomProdukter nrOfProducts={5} />
            </div></>
    );
}