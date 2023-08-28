'use client'

import { FC } from 'react';
import RandomProdukter from '../components/randomProducts'; // Adjust the path based on your directory structure

const RandomProdukterPage: FC = () => {
  return (
    <div>
      <h1>Random Produkter</h1>
      <RandomProdukter nrOfProducts={25} />
    </div>
  );
}

export default RandomProdukterPage;
