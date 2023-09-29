import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/products/slice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  const { list, related } = useSelector(({ products }) => products);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate.push(ROUTES.HOME);
    }
  }, [isFetching, isLoading, isSuccess]);
  React.useEffect(() => {
    if (data && list) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data]);

  if (!data) {
    return <section className="preloader">Loading...</section>;
  }
  return (
    <div>
      <Product {...data} />
      <Products products={related} amount={10} title="Related" />
    </div>
  );
};

export default SingleProduct;
