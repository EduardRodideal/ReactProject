import React from "react";
import { CartItem } from "./CartItem";

export const CartList = ({ value }) => {
  const { cart } = value;
  return (
    <div className="container-fluid">
      {cart.map(item => (
        <CartItem key={item.id} item={item} value={value} />
      ))}     
    </div>
  );
};
