import React from 'react';
import { Link } from 'react-router-dom';
import s from '../../styles/Header.module.css';
import { ROUTES } from '../../utils/routes';
import LOGO from '../../images/logo.svg';
import AVATAR from '../../images/avatar.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, cart } = useSelector(({ user }) => user);
  const [values, setValues] = React.useState({ name: 'Guest', avatar: AVATAR });
  const [searchValue, setSearchValue] = React.useState('');
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });
  React.useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);
  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };
  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };
  return (
    <div className={s.header}>
      <div className={s.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="stuff" />
        </Link>
      </div>
      <div className={s.info}>
        <div className={s.user} onClick={handleClick}>
          <div className={s.avatar} style={{ backgroundImage: `url(${values.avatar})` }} />
          <div className={s.users}>{values.name}</div>
        </div>

        <form className={s.form}>
          <div className={s.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={s.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anything"
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && (
            <div className={s.box}>
              {isLoading
                ? 'Loading'
                : !data.length
                ? 'No results'
                : data.map(({ images, title, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue('')}
                        className={s.item}
                        to={`/products/${id}`}>
                        <div className={s.image} style={{ backgroundImage: `url(${images[0]})` }} />
                        <div className={s.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>
        <div className={s.account}>
          <Link to={ROUTES.HOME}>
            <svg className={s['icon-fav']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={s.cart}>
            <svg className={s['icon-cart']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {cart.length ? <span className={s.count}>{cart.length}</span> : ''}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
