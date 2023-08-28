import { useState, useEffect, FC } from 'react';
import data from '../../../public/merged.json';
import Link from 'next/link';
import Image from 'next/image';

interface Produkt {
    produktnavn: string;
    produktid: string;
    billedurl: string[];
    kategorinavn: string;
    glpris?: string;
    nypris: string;
}

interface Data {
    produkter: Produkt[];
}

interface RandomProdukterProps {
    nrOfProducts: number;
    prodName?: Produkt;
}

const typedData = data as Data;

const getRandomIndex = (): number => {
    return Math.floor(Math.random() * typedData.produkter.length);
}

const RandomProdukter: FC<RandomProdukterProps> = ({ nrOfProducts, prodName }) => {
    const [produkter, setProdukter] = useState<Produkt[]>([]);

    useEffect(() => {
        setProdukter(typedData.produkter);
    }, []);

    const randomProdukter: Produkt[] = [];

    for (let i = 0; i < nrOfProducts; i++) {
        const randomIndex = getRandomIndex();
        randomProdukter.push(produkter[randomIndex]);
    }

    return (
        <div className="container grid gap-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {randomProdukter.map((produkt, i) => (
                <div className='background-white p-5 shadow-inner  hover:shadow-xl flex justify-center flex-col transition-all transition' key={i}>

                    <Link className="flex justify-center" href={{
                        pathname: '/produkt/' + produkt?.produktnavn.toString().replace(/ /g, "_"),
                        query: { pid: produkt?.produktid },
                    }} key={i}>
                        <Image
                            src={produkt?.billedurl[0] || '/product_placeholder.svg'} // Use fallback image source
                            alt={produkt?.produktnavn[0] || 'test'} // Use fallback alt text
                            width={200}
                            height={200}
                        />
                    </Link>
                    <div>
                        <span>
                            <Link href={`/kategori/${produkt?.kategorinavn.toString().replace(/ > /g, "/")}`}>
                                {produkt?.kategorinavn.toString().substring(produkt?.kategorinavn.toString().lastIndexOf(">") + 1)}
                            </Link>
                        </span>
                        <Link href={{
                            pathname: '/produkt/' + produkt?.produktnavn.toString().replace(/ /g, "_"),
                            query: { pid: produkt?.produktid },
                        }} key={i}>
                            <h4>{produkt?.produktnavn.toString().substring(0, 25)}</h4>
                            <div>
                                <div>
                                    <span className={`${produkt?.glpris ? 'line-through' : ''}`}>
                                        {produkt?.glpris}
                                    </span>
                                    <span> {produkt?.nypris} kr</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RandomProdukter;