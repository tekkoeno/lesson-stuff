import React from 'react';
import s from '../../styles/Categories.module.css';
import { Link } from 'react-router-dom';

const Categories = ({ title, style = {}, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);
  return (
    <section className={s.section}>
      <h2>{title}</h2>
      <div className={s.list}>
        {list.map(({ id, name, image }) => {
          return (
            <Link to={`/categories/${id}`} key={id} className={s.item}>
              <div className={s.image} style={{ backgroundImage: `url(${image})` }}></div>
              <h3 className={s.title}>{name}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
