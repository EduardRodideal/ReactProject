import React, { createContext, useState, useEffect } from "react";
import { storeProducts, detailProduct } from "./data";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [aboutProduct, setAboutProduct] = useState(detailProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(detailProduct);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  //avoiding copying by refference
  const copyProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setProducts(tempProducts);
  };

  useEffect(() => {
    addTotals();
  }, [cart]);

  useEffect(() => {
    copyProducts();
  }, []);

  const getItem = id => {
    const product = products.find(item => item.id === id);
    return product;
  };

  const handleDetail = id => {
    const product = getItem(id);
    setAboutProduct(product);
  };
  const addToCart = id => {
    let tempProducts = [...products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    setProducts(tempProducts);
    setCart([...cart, product]);
  };

  const openModal = id => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = id => {
    const tempCart = cart.map(item => {
      if (item.id === id) {
        item.count = item.count + 1;
        item.total = item.count * item.price;
        return item;
      }
      return item;
    });
    setCart(tempCart);
  };

  const decrement = id => {
    const tempCart = cart.map(item => {
      if (item.id === id && item.count > 1) {
        item.count = item.count - 1;
        item.total = item.count * item.price;
        return item;
      }
      return item;
    });
    setCart(tempCart);
  };

  const removeItem = id => {
    const tempCart = cart.filter(item => item.id !== id);
    const tempProducts = products.map(item => {
      if (item.id === id) {
        item.inCart = false;
        item.count = 1;
        item.total = item.price;
        console.log(item);
      }
      return item;
    });
    setProducts(tempProducts);
    setCart(tempCart);
  };

  const clearCart = () => {
    setCart([]);
    copyProducts();
  };

  const addTotals = () => {
    let subTotal = 0;
    cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartSubtotal(subTotal);
    setCartTax(tax);
    setCartTotal(total);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        aboutProduct,
        cart,
        modalOpen,
        modalProduct,
        cartSubtotal,
        cartTax,
        cartTotal,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        increment,
        decrement,
        removeItem,
        clearCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductContextConsumer = ProductContext.Consumer;
