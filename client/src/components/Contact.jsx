import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../i18n.js';
import { useTranslation } from 'react-i18next';

export default function Contact({listing}) {
   const [landlord, setLandlord] = useState(null);
   const  [message, setMessage] = useState('');
   const onChange = (e) => {
      setMessage(e.target.value);
   };
   const { t } = useTranslation();
   
   useEffect(() => {
      const fetchLandlord = async () => {
         try {
            // console.log(listing.userRef)
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            // console.log(data)
            setLandlord(data);
         }
         catch (error) {
            // console.log(error)
         }
         }
         fetchLandlord();
      
   }, [listing.userRef])
  return (
    <>
    {landlord && (
      <div className='flex flex-col gap-2'>
         <p>{t('contact.contact')} <span className='font-semibold'>{landlord.username}</span> {t('contact.for')}  <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
         
         <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder={t('contact.message')} className='w-full border p-3 rounded-lg'></textarea>
         
         <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opascity-95'>
         {t('contact.send')}
         </Link>
      </div>
      
    )}
    </>
  )
}
