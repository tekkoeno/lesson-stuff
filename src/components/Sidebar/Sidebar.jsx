import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../../styles/Sidebar.module.css';
const list = [
  { id: 0, name: 'Clothes' },
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Furnitures' },
  { id: 3, name: 'Shoes' },
  { id: 4, name: 'Others' },
];
const Sidebar = () => {
  return (
    <section className={s.sidebar}>
      <div className={s.title}>CATEGORIES</div>
      <nav>
        <ul className={s.menu}>
          {list.map(({ id, name }) => {
            return (
              <li key={id}>
                <NavLink
                  className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
                  to={`/categories/${id}`}>
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={s.footer}>
        <a className={s.link} href="/help" target="_blank">
          HELP
        </a>
        <a className={s.link} href="/terms" target="_blank" style={{ textDecoration: 'underline' }}>
          Terms & Condition
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
