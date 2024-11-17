import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import '../i18n.js';
import { useTranslation } from 'react-i18next';

export default function Search() {
   const navigate = useNavigate();
   const [sidebarData, setSidebarData] = useState({
      searchTerm: '',
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'created_at',
      order: 'desc',
   });
   const [loading, setLoading] = useState(false);
   const [listings, setListings]  = useState([]);
   // console.log(sidebarData)
   // console.log(listings)
   const [showMore, setShowMore] =  useState(false);

   const { t } = useTranslation();

   useEffect(() =>{
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      const typeFromUrl = urlParams.get('type');
      const parkingFromUrl = urlParams.get( 'parking' );
      const furnisherFromUrl = urlParams.get('furnished');
      const offerFromUrl = urlParams.get('offer');
      const sortFromUrl = urlParams.get( 'sort' );
      const orderFromUrl = urlParams.get('order');
      if(
         searchTermFromUrl ||
         typeFromUrl ||
         parkingFromUrl ||
         furnisherFromUrl ||
         offerFromUrl ||
         sortFromUrl ||
         orderFromUrl
      ){
         setSidebarData({
            searchTerm:  searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnisherFromUrl === 'true'? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
         });
      }
      const fetchListings = async () => {
         setLoading(true);
         setShowMore(false);
         const searchQuery = urlParams.toString();
         const res = await fetch(`/api/listing/get?${searchQuery}`);
         const data = await res.json();
         if(data.length > 8){
            setShowMore(true);
         }else{
            setShowMore(false);
         }
         setListings(data);
         setLoading(false);
       };
      fetchListings();

   }, [location.search]);

   const handleChange = (e) => {
      if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
         setSidebarData({...sidebarData, type: e.target.id})
      }
      if(e.target.id === 'searchTerm'){
         setSidebarData({...sidebarData, searchTerm: e.target.value})
      }
      if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
         setSidebarData({...sidebarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,});
        
      }
      if (e.target.id === 'sort_order'){
         const sort = e.target.value.split('_')[0] || 'created_at';
         const order = e.target.value.split('_')[1] || 'desc';
         setSidebarData({ ...sidebarData, sort, order });
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault()
      const urlParams = new URLSearchParams();
      urlParams.set('searchTerm', sidebarData.searchTerm);
      urlParams.set('type', sidebarData.type);
      urlParams.set('parking',  sidebarData.parking);
      urlParams.set('furnished', sidebarData.furnished);
      urlParams.set('offer', sidebarData.offer);
      urlParams.set('sort', sidebarData.sort);
      urlParams.set('order', sidebarData.order);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
   };

   const onShowMoreClick = async () =>{
      const numberOfListings = listings.length;
      const startIndex = numberOfListings;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('startIndex', startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length < 9){
         setShowMore(false);
      }
      setListings([...listings, ...data]);
   }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
         <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <div className='flex flex-col md:flex-row items-center gap-2'>
               <label className='whitespace-nowrap font-semibold'>{t('search.term')}</label>
               
               <input type="text" id='searchTerm' placeholder={t('search.search')} className='border rounded-lg p-3 w-full' 
               value={sidebarData.searchTerm} onChange={handleChange} />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
               <label className='font-semibold'>{t('search.type')}</label>
               <div className='flex gap-2'>
                  <input type="checkbox" id='all' className='w-5'
                  onChange={handleChange} checked={sidebarData.type === 'all'} />
                  <span>{t('search.rent_sale')}</span>
               </div>
               <div className='flex gap-2'>
                  <input type="checkbox" id='rent' className='w-5'
                  onChange={handleChange} checked={sidebarData.type === 'rent'} />
                  <span>{t('search.rent')}</span>
               </div>
               <div className='flex gap-2'>
                  <input type="checkbox" id='sale' className='w-5'
                  onChange={handleChange} checked={sidebarData.type === 'sale'} />
                  <span>{t('search.sale')}</span>
               </div>
               <div className='flex gap-2'>
                  <input type="checkbox" id='offer' className='w-5'
                  onChange={handleChange} checked={sidebarData.offer} />
                  <span>{t('search.offer')}</span>
               </div>
            </div>
            
            <div className='flex gap-2 flex-wrap items-center'>
               <label className='font-semibold'>{t('search.amenities')}</label>
               <div className='flex gap-2'>
                  <input type="checkbox" id='parking' className='w-5'
                  onChange={handleChange} checked={sidebarData.parking} />
                  <span>{t('search.parking')}</span>
               </div>
               <div className='flex gap-2'>
                  <input type="checkbox" id='furnished' className='w-5'
                  onChange={handleChange} checked={sidebarData.furnished} />
                  <span>{t('search.furnished')}</span>
               </div>
            </div>
            
            <div className='flex items-center gap-2'>
               <label className='font-semibold'>{t('search.sort')}</label>
               <select onChange={handleChange} defaultValue={'created_at_desc'}
                id="sort_order" className='border rounded-lg p-3'>
                  <option value='regularPrice_desc'>{t('search.hight_low')}</option>
                  <option value='regularPrice_asc'>{t('search.low_hight')}</option>
                  <option value='createdAt_desc'>{t('search.latest')}</option>
                  <option value='createdAt_asc'>{t('search.oldest')}</option>
               </select>
            </div>

            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>{t('search.search_button')}</button>
         </form>
      </div>

      <div className='flex-1'>
         <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>{t('search.results')}</h1>
         <div className='p-7 flex flex-wrap gap-4'>
            {!loading && listings.length === 0 && (
               <p className='text-xl text-slate-700'>{t('search.no_result')}</p>
            )}
            {loading && (
               <p className='text-xl text-slate-700 text-center w-full'>{t('search.loading')}</p>
            )}
            {!loading && listings && listings.map((listing) => (
               <ListingItem key={listing._id} listing={listing} />
            ))}
            {showMore && (
               <button onClick={onShowMoreClick}
               className='text-green-700 hover:underline p-7 text-center w-full'>
                  {t('search.more')}
               </button>
            )}
         </div>
      </div>
    </div>
  )
}
