import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import Loader from '../components/Loader.jsx';

import '../i18n.js';
import { useTranslation } from 'react-i18next';
// import Cookies from 'js-cookie';
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
//   console.log(offerListings);
//  console.log(saleListings);
//  console.log(rentListings)

  const { t } = useTranslation();
  
  const [token, setToken] = useState(null);
  // const accessToken = Cookies.get('access_token');
// console.log(accessToken); // Should print the token if it's in cookies

// useEffect(() => {
//   if (token) {
//     Cookies.set('access_token', token, { path: '/' });
//   }
// }, [token]);

  useEffect(() => {
    // const accessToken = Cookies.get('access_token');
    // console.log(accessToken);
    const fetchOfferListings = async () =>{
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/listing/get?offer=true&limit=4`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials': 'true',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        // const res = await fetch('/api/listing/get?offer=true&limit=4', {
        //   method: 'GET',
        //   headers: {
        //     'Cache-Control': 'no-cache',
        //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        //     'Pragma': 'no-cache',
        //     'Expires': '0',
        //   },
        // });
        // console.log(res)
        const data = await res.json();
        // console.log(data)
        setOfferListings(data);
        setLoading(false);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/listing/get?type=rent&limit=4`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials': 'true',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        // const res = await fetch('/api/listing/get?type=rent&limit=4', {
        //   method: 'GET',
        //   headers: {
        //     'Cache-Control': 'no-cache',
        //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        //     'Pragma': 'no-cache',
        //     'Expires': '0',
        //   },
        // });
        const data = await res.json();
        setRentListings(data);
        setLoading(false);
        fetchSaleListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/listing/get?type=sale&limit=4`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials': 'true',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        // const res = await fetch('/api/listing/get?type=sale&limit=4', {
        //   method: 'GET',
        //   headers: {
        //     'Cache-Control': 'no-cache',
        //     'Pragma': 'no-cache',
        //     'Expires': '0',
        //   },
        // });
        const data = await res.json();
        setSaleListings(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  }, []);


  return loading ? <Loader /> :  (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          {t('home.find1')} <span className='text-slate-500'>{t('home.find2')}</span>
          <br />
          {t('home.find3')}
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
        {t('home.place')}
          <br />
          {t('home.range')}
        </div>
        <Link to={'/search'} className='text-xs sm:text-xl text-blue-800 font-bold hover:underline'>
        {t('home.get_started')}
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {
        offerListings && offerListings.length > 0 && offerListings.map((listing) =>(
          <SwiperSlide key={listing._id}>
            <div style={{background: `url(${listing.imageUrls[0] || "https://www.bankrate.com/2020/10/02105002/What_are_real_estate_comps.jpg?auto=webp&optimize=high&crop=16:9&width=912"}) center no-repeat`, backgroundSize:'cover'}} className='h-[500px] bg-local' key={listing._id}>
            {/* <div style={{background: `url(${listing.imageUrls[0] || "https://www.bankrate.com/2020/10/02105002/What_are_real_estate_comps.jpg?auto=webp&optimize=high&crop=16:9&width=912"}) center no-repeat`, backgroundSize:'cover'}} className='h-[500px]' key={listing._id}> */}

            </div>
          </SwiperSlide>
        ))
      }
      </Swiper>
      
     

      {/* listing resuits */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>{t('home.recent_offers')}</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                {t('home.more_offers')}
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>

            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>{t('home.recent_rent')}</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                {t('home.more_rent')}
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>

            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>{t('home.recent_sale')}</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                  {t('home.more_sale')}
                </Link>
              </div>

              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>

            </div>
          )
        }
      </div>

    </div>
  )
}
