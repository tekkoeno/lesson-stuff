import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';
import s from '../../styles/User.module.css';

const UserLoginForm = ({ closeForm, toggleCurrentFormType }) => {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some((val) => !val);
    if (isEmpty) return;
    dispatch(loginUser(values));
    closeForm();
  };
  return (
    <div className={s.wrapper}>
      <div className={s.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={s.title}>Login</div>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={values.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className={s.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={values.password}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className={s.link} onClick={() => toggleCurrentFormType('signup')}>
          Create an account
        </div>
        <button className={s.submit}>Login</button>
      </form>
    </div>
  );
};

export default UserLoginForm;
