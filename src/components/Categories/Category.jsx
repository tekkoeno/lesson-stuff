import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import s from '../../styles/Category.module.css';
import Products from '../Products/Products';
const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);
  const defaultValues = {
    title: '',
    price_min: 0,
    price_max: 0,
  };
  const defaultParams = {
    ...defaultValues,
    limit: 5,
    offset: 0,
    categoryId: id,
  };
  const [isEnd, setEnd] = React.useState(false);
  const [cat, setCat] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [params, setParams] = React.useState(defaultParams);
  const [values, setValues] = React.useState(defaultValues);
  const { data, isLoading, isSuccess } = useGetProductsQuery(params);
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setEnd(false);
    setParams({ ...params, ...values });
  };
  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setEnd(false);
  };
  React.useEffect(() => {
    if (!id) return;
    setValues(defaultParams);
    setParams({ ...defaultParams, categoryId: id });
    setItems([]);
    setEnd(false);
  }, [id]);
  React.useEffect(() => {
    if (isLoading) return;
    if (!data.length) return setEnd(true);
    setItems((_items) => [..._items, ...data]);
  }, [data, isLoading]);
  React.useEffect(() => {
    if (!id || !list.length) return;

    const category = list.find((item) => item.id === id * 1);
    setCat(category);
  }, [list, id]);

  return (
    <section className={s.wrapper}>
      <h2 className={s.title}>{cat?.name}</h2>
      <form className={s.filters} onSubmit={handleSubmit}>
        <div className={s.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className={s.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={s.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            value={values.price_max}
          />
          <span>Price to</span>
        </div>
        <button type="submit" hidden />
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={s.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products title="" products={items} style={{ padding: 0 }} amount={items.length} />
      )}
      {!isEnd && (
        <div className={s.more}>
          <button onClick={() => setParams({ ...params, offset: params.offset + params.limit })}>
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default Category;
