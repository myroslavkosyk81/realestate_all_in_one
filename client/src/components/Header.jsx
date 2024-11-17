import { useEffect, useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../i18n.js';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import i18next from 'i18next';

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
{/* <AiOutlineMenu /> */}
{/* <AiOutlineClose /> */}

export default function Header() {
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
  let [open, setOpen] =useState(false);

  return (
    <header className='bg-slate-200 shadow-md w-full top-0 left-0'>
    {/* <header className='bg-slate-200 shadow-md fixed w-full top-0 left-0'> */}
        
        <div className='shadow-md w-full fixed top-0 left-0'>
           <div className='md:flex items-center justify-between bg-slate-200 py-4 md:px-10 px-7'>
            
            <div className='font-bold text-2xl cursor-pointer flex items-center gap-3'>
                
              <Link to='/' className='flex items-center object-cover hover:scale-105 duration-300'>
              <h1 className='font-bold text-xs md:text-xl flex flex-wrap flex-col md:flex-row'>
                  <span className='text-slate-500'>Best</span>
                  <span className='text-slate-700'>Domivka</span>
              </h1>
              <img className='rounded-full h-7 w-7' onClick={() => changeLanguage('uk')} src='https://firebasestorage.googleapis.com/v0/b/real-estate-7f0dd.appspot.com/o/App_don%E2%80%99t%20delete%2FBest%20domivka_gray.png?alt=media&token=0363d869-6be7-47b2-a54d-945e68b814e5' alt="Logo" />
            </Link>

            
            <form onSubmit={handleSubmit} className='bg-slate-100 rounded-lg flex items-center w-36 sm:w-44 justify-between'>
                
                <input type="text" placeholder={t('header.search')} 
                className='text-sm bg-transparent focus:outline-none w-32 sm:w-40' 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className='flex'>
                  <FaSearch className='text-slate-600 text-xs' />
                </button>
                
            </form>
            
            </div>
            
            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <AiOutlineClose/> : <AiOutlineMenu />
                }
            </div>
            
            <ul className={`md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-slate-200 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
              {
                <div className='flex flex-col my-4 md:flex md:flex-row md:ml-4 md:my-0 font-semibold md:gap-3'>
                  <Link to='/profile' className='m-3 md:m-0'>
                    {currentUser ? (
                      <img className='rounded-full h-7 w-7 object-cover hover:scale-125 duration-300' src={currentUser.avatar} alt="profile" />  
                    ) : (
                        <li className='text-slate-700 hover:underline'>{t('header.signin')}</li>
                    )}  
                  </Link>
                  <Link to='/' className='m-3 md:m-0'>
                    <li className='text-slate-700 hover:underline'>{t('header.home')}</li>
                  </Link>
                  <Link to='/about' className='m-3 md:m-0'>
                    <li className='text-slate-700 hover:underline'>{t('header.about')}</li>
                  </Link>
                  <div className='flex ml-3 md:ml-4 m-3 md:m-0'>
                    <button disabled={i18next.language === 'uk'}><img className='rounded-full h-7 w-7 object-cover hover:scale-125 duration-300' onClick={() => changeLanguage('uk')} src='https://upload.wikimedia.org/wikipedia/commons/d/d2/Flag_of_Ukraine.png' alt="Українська" /></button>
                  </div>
                  <div className='flex ml-3 md:ml-4 m-3 md:m-0'>
                    <button disabled={i18next.language === 'en'}><img className='rounded-full h-7 w-7 object-cover hover:scale-125 duration-300' onClick={() => changeLanguage('en')} src='https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg' alt="English" /></button>
                  </div> 
                </div>
              }
                
                   
            </ul>
            {/* button */}
           </div>
        </div>
        <div className='flex md:flex justify-between items-center max-w-6xl mx-auto p-3 h-[7vh] py-4 md:px-10 px-7'> 
        </div>
      
    </header>
    // <header className='bg-slate-200 shadow-md '>
    //     <div className='flex justify-between items-center max-w-6xl mx-auto p-3 h-[7vh]'>
    //       <Link to='/' className='flex object-cover hover:scale-125 duration-300'>
    //         <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
    //             <span className='text-slate-500'>Best</span>
    //             <span className='text-slate-700'>Domivka</span>
    //         </h1>
    //         <img className='rounded-full h-7 w-7' onClick={() => changeLanguage('uk')} src='https://firebasestorage.googleapis.com/v0/b/real-estate-7f0dd.appspot.com/o/App_don%E2%80%99t%20delete%2FBest%20domivka_gray.png?alt=media&token=0363d869-6be7-47b2-a54d-945e68b814e5' alt="Logo" />
    //       </Link>
            
    //         <form onSubmit={handleSubmit} className='bg-slate-100 rounded-lg flex items-center w-44 justify-between'>
                
    //             <input type="text" placeholder={t('header.search')} 
    //             className='bg-transparent focus:outline-none w-44 sm:w-24' 
    //             value={searchTerm} 
    //             onChange={(e) => setSearchTerm(e.target.value)}/>
    //             <button className='flex'>
    //               <FaSearch className='text-slate-600' />
    //             </button>
                
    //         </form>
    //         <div className='flex gap-3'>
              
    //           {/* <button className='flex gap-2 bg-orange-300 m-5' onClick={() => changeLanguage('en')}>English</button>
    //           <button className='flex gap-2 bg-orange-300 m-5' onClick={() => changeLanguage('fr')}>Українська</button> */}
              
    //         </div>

    //         <ul className='flex gap-4'>
    //         <button disabled={i18next.language === 'uk'}><img className='rounded-full h-7 w-7 object-cover hover:scale-125 duration-300' onClick={() => changeLanguage('uk')} src='https://upload.wikimedia.org/wikipedia/commons/d/d2/Flag_of_Ukraine.png' alt="Українська" /></button>
              
    //           <button disabled={i18next.language === 'en'}><img className='rounded-full h-7 w-7 object-cover hover:scale-125 duration-300' onClick={() => changeLanguage('en')} src='https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg' alt="English" /></button>
    //           <Link to='/'>
    //             <li className='hidden sm:inline text-slate-700 hover:underline'>{t('header.home')}</li>
    //           </Link>
    //           <Link to='/about'>
    //             <li className='hidden sm:inline text-slate-700 hover:underline'>{t('header.about')}</li>
    //           </Link>
    //           <Link to='/profile'>
    //             {currentUser ? (
    //               <img className='rounded-full h-7 w-7 object-cover hover:scale-125 duration-300' src={currentUser.avatar} alt="profile" />
                  
    //             ) : (
    //                 <li className='text-slate-700 hover:underline'>{t('header.signin')}</li>
    //             )}
                
    //           </Link>
              
    //         </ul>
    //     </div>
      
    // </header>
  )
}
 