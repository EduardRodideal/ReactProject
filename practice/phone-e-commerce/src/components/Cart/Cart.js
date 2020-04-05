import React, { useContext } from "react";
import { Title } from "../Title";
import { CartColumns } from "./CartColumns";
import { EmptyCart } from "./EmptyCart";
import { ProductContext } from "../../context";
import {CartList} from "./CartList";
import {CartTotals} from "./CartTotals";

export const Cart = () => {
  const value = useContext(ProductContext);
  const { cart } = value;
  return (
    <section>
      {!cart.length ? (
        <EmptyCart />
      ) : (
        <>
          <Title name="your" title="cart" />
          <CartColumns />
          <CartList value={value} />
          <CartTotals value={value} />
        </>
      )}
    </section>
  );
};
