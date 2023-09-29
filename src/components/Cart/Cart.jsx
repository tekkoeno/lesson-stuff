import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice';
import s from '../../styles/Cart.module.css';
import { sumBuy } from '../../utils/common';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ user }) => user);
  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };
  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };
  return (
    <section className={s.cart}>
      <h2 className={s.title}>Your cart</h2>
      {!cart.length ? (
        <div className={s.empty}>Here is empty</div>
      ) : (
        <>
          <div className={s.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;

              return (
                <div className={s.item} key={id}>
                  <div className={s.image} style={{ backgroundImage: `url(${images[0]})` }} />
                  <div className={s.info}>
                    <div className={s.name}>{title}</div>
                    <div className={s.category}>{category.name}</div>
                  </div>
                  <div className={s.price}>{price} $</div>
                  <div className={s.quantity}>
                    <div
                      className={s.minus}
                      onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}>
                      <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
                      </svg>
                    </div>
                    <span>{quantity}</span>

                    <div
                      className={s.plus}
                      onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}>
                      <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
                      </svg>
                    </div>
                  </div>
                  <div className={s.total}>{price * quantity}$</div>
                  <div className={s.close} onClick={() => removeItem(item.id)}>
                    <svg className="icon">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={s.actions}>
            <div className={s.total}>
              TOTAL PRICE:{' '}
              <span>{sumBuy(cart.map(({ price, quantity }) => price * quantity))}$</span>
            </div>
            <button className={s.procced}>Procceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
