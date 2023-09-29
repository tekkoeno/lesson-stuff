import React from 'react';
import s from '../../styles/Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };
  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some((val) => !val);
    if (isEmpty) return;
    dispatch(updateUser(values));
  };
  return (
    <section className={s.profile}>
      {!currentUser ? (
        <span>You need signup</span>
      ) : (
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
              type="text"
              name="name"
              placeholder="Your name"
              value={values.name}
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
          <div className={s.group}>
            <input
              type="avatar"
              name="avatar"
              placeholder="Your avatar"
              value={values.avatar}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <button className={s.submit} type="submit">
            Update
          </button>
        </form>
      )}
    </section>
  );
};
export default Profile;
