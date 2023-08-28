import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Product {
  produktnavn: string[];
  produktid: string[];
}

interface ProductsData {
  produkter: Product[];
}

import productsJson from '../../../public/merged.json';
const products = productsJson as ProductsData;

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchFieldRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length === 0) {
      setFilteredProducts([]);
      return;
    }

    const results = products.produkter.filter((product: Product) =>
      product.produktnavn[0].toLowerCase().includes(term)
    );
    setFilteredProducts(results);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (searchFieldRef.current && !searchFieldRef.current.contains(event.target as Node)) {
        setFilteredProducts([]);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleResultClick = () => {
    setFilteredProducts([]);
  };

  return (
    <div className='flex' ref={searchFieldRef}>
      <input type='text' placeholder='Find produkt' onChange={handleSearch} value={searchTerm} className="border-2 border-orange-300" />
  
      {filteredProducts.length > 0 && (
        <div className='absolute top-10 bg-slate-300'>
          {filteredProducts.slice(0, 5).map((product, i) => (
            <Link className=''
              href={{
                pathname: '/produkt/' + product?.produktnavn[0].toString().replace("%20", "_").replace(/ /g, "_").replace(/\//g, "_").replace(/-/g, '_').replace(/\./g, '_').replace(/\,/g, '_'),
                query: { pid: product?.produktid[0], pnavn: product?.produktnavn[0] },
              }} 
              key={i}
            >
              <div
                className='bg-orange-500 hover:bg-orange-300'
                onClick={handleResultClick}
              >
                <h2>{product.produktnavn[0]}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
