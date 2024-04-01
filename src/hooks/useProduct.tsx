import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  getFilteredProducts,
  getProductDetail,
  getProductHomePages,
} from '../store/product/actions';
import {IAddToCartPayload, IProduct} from '../store/@types';
import {addToCart} from '../store/cart/actions';

const useProduct = () => {
  const dispatch = useDispatch();
  const {
    products: storedProducts,
    filterProducts: storedFilterProducts,
    totalRecords,
    isGettingHomePage,
    isGettingProductDetail,
    productDetail,

    keyWord,
    priceStart,
    priceEnd,
    condition,
    category,
    brand,
    color,
    size,
  } = useSelector((state: RootState) => state?.productReducer);

  const dispatchGetProductHomePage = (page: number, limit: number) => {
    dispatch(getProductHomePages({page: page, limit: limit}));
  };

  const dispatchGetProductDetail = (id: string) => {
    dispatch(getProductDetail({id: id}));
  };

  const dispatchFilterProduct = (
    name?: string,
    brand?: string,
    size?: number,
    category?: string,
  ) => {
    dispatch(
      getFilteredProducts({
        name: name,
        brand: brand,
        size: size,
        category: category,
      }),
    );
  };

  const dispatchAddProductToCart = (payload: IAddToCartPayload) => {
    dispatch(addToCart(payload));
  };

  const products = storedProducts as IProduct[];
  const filteredProducts = storedFilterProducts as IProduct[];

  return {
    dispatchGetProductHomePage,
    products,
    totalRecords,
    filteredProducts,
    isGettingHomePage,
    dispatchGetProductDetail,
    dispatchFilterProduct,
    dispatchAddProductToCart,
    isGettingProductDetail,
    productDetail,

    keyWord,
    priceStart,
    priceEnd,
    condition,
    category,
    brand,
    color,
    size,
  };
};

export default useProduct;
