import { useEffect, useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../i18n.js';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import i18next from 'i18next';

export default function Footer() {
  const {currentUser} = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new  URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const urlParams = new  URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const { t, i18n } = useTranslation();

  return (
    <header className='flex items-center h-[7vh] bg-slate-200 shadow-md w-full bottom-0'>
        <div className='flex justify-between max-w-6xl mx-auto p-3'>
          <Link to='https://portfolio-mk-2023.vercel.app/'>
            <h1 className='font-bold text-xs sm:text-l flex flex-wrap gap-3 items-center'>
                <span className='text-slate-500'>Developed by</span>
                <img className='h-10 w-10 object-cover' onClick={() => changeLanguage('uk')} src='https://firebasestorage.googleapis.com/v0/b/real-estate-7f0dd.appspot.com/o/App_don%E2%80%99t%20delete%2FBSB_logo.png?alt=media&token=485e4b8d-314b-4c51-a158-443017195551' alt="Українська" />
            </h1>
          </Link>
            
        </div>
      
    </header>
  )
}
 