import React, { useContext } from "react";
import { Product } from "./Product";
import { Title } from "./Title";
import { ProductContext } from "../context";

export const ProductList = () => {
  const value = useContext(ProductContext);
  const { products } = value;  

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            {products.map(product => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
