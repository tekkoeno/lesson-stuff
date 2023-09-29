import React from 'react';
import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';
import { filterByPrice } from '../../features/products/slice';

const Home = () => {
  const dispatch = useDispatch();
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);
  React.useEffect(() => {
    if (!list.length) return;

    dispatch(filterByPrice());
  }, [dispatch, list.length]);
  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less then 100$" />
    </>
  );
};

export default Home;
