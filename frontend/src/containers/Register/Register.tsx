import React, {useState} from 'react';
import {RegisterMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {register} from '../../store/usersThunks';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {selectRegisterError, selectRegisterLoading} from '../../store/usersSlice';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    name: '',
    phone: ''
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
      toast.success('Register was successfully');
    } catch (e) {
      toast.error('There was a registration error');
    }
  };

  return (
    <form className='mt-5 w-25 mx-auto' onSubmit={submitFormHandler}>
      <h3 className='text-center'>Registration</h3>
      <div className='form-group mb-3'>
        <div className={`${getFieldError('username') ? 'is-invalid' : ''}`}>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' className='form-control' value={state.username}
                 onChange={inputChangeHandler} required autoComplete='new-username'/>
        </div>
        {getFieldError('username') && (
          <div className='invalid-feedback'>
            {getFieldError('username')}
          </div>
        )}
      </div>
      <div className='form-group mb-3'>
        <div className={`${getFieldError('password') ? 'is-invalid' : ''}`}>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' className='form-control' value={state.password}
                 onChange={inputChangeHandler} required autoComplete='new-password'/>
        </div>
        {getFieldError('password') && (
          <div className='invalid-feedback'>
            {getFieldError('password')}
          </div>
        )}
      </div>
      <div className='form-group mb-3'>
        <div className={`${getFieldError('name') ? 'is-invalid' : ''}`}>
          <label htmlFor='name'>Display name</label>
          <input type='text' name='name' id='name' className='form-control' value={state.name}
                 onChange={inputChangeHandler} required/>
        </div>
        {getFieldError('name') && (
          <div className='invalid-feedback'>
            {getFieldError('name')}
          </div>
        )}
      </div>
      <div className='form-group mb-3'>
        <div className={`${getFieldError('phone') ? 'is-invalid' : ''}`}>
          <label htmlFor='phone'>Phone</label>
          <input type='number' name='phone' id='phone' className='form-control' value={state.phone}
                 onChange={inputChangeHandler} required/>
        </div>
        {getFieldError('phone') && (
          <div className='invalid-feedback'>
            {getFieldError('phone')}
          </div>
        )}
      </div>
      <button type='submit' className='btn btn-primary w-100 mb-3' disabled={loading}>{loading &&
        <ButtonSpinner/>} Register
      </button>
      <Link to='/login'>Already have an account? Login</Link>
    </form>
  );
};

export default Register;