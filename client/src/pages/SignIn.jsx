// import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import '../i18n.js';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/sign-in`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      
      body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    console.log(data)
    if(data.success === false) {
      dispatch(signInFailure(data.message));
      
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    
    
  }
  // console.log(formData)

  return (
    // <div className='p-3 max-w-lg mx-auto min-h-screen'>
    <div className='p-3 max-w-lg mx-auto h-[calc(100vh_-_15vh)]'>
      <h1 className='text-3xl text-center font-semibold
      my-7'>{t('signin.signin')}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
        <input type="email" placeholder={t('signin.email')}
          className='border p-3 rounded-lg' id='email' 
          onChange={handleChange} />
        <input type="password" placeholder={t('signin.password')}
          className='border p-3 rounded-lg' id='password' 
          onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95
        disabled:opacity-80'>
          {loading ? <span>{t('signin.loading')}</span> : <span>{t('signin.signin_but')}</span>}</button>
          <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>{t('signin.no_account')}</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>{t('signin.signup')}</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
