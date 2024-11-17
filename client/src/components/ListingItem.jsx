import { Link } from "react-router-dom";
import { MdLocationOn}  from 'react-icons/md';
import '../i18n.js';
import { useTranslation } from 'react-i18next';

export default function ListingItem({listing}) {
   const { t } = useTranslation();
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
         <img src={listing.imageUrls[0] || "https://www.bankrate.com/2020/10/02105002/What_are_real_estate_comps.jpg?auto=webp&optimize=high&crop=16:9&width=912"} 
         alt="listing cover" className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" />
      </Link>
      <div className="p-3 flex flex-col gap-2 w-full">
         <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
         <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
         </div>
         <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
         <p className="text-slate-500 mt-2 font-semibold">
            UAH {listing.offer? listing.discountPrice.toLocaleString('ua-UA') : listing.regularPrice.toLocaleString('ua-UA')}
            {listing.type === 'rent' && ' / month'}
         </p>
         <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
               {listing.bedrooms > 1 ? `${listing.bedrooms} ${t('listing_item.beds')}` : `${listing.bedrooms} ${t('listing_item.bed')} `}
               {/* {listing.bedrooms > 1 ? `${listing.bedrooms} ${t('listing_item.beds')}` : `${listing.bedrooms} ${t('listing.bed')}`} */}
            </div>
            <div className="font-bold text-xs">
               {listing.bathrooms > 1 ? `${listing.bathrooms} ${t('listing_item.baths')} ` : `${listing.bathrooms} ${t('listing.bath')} `}
            </div>
         </div>
      </div>
    </div>
  )
}
