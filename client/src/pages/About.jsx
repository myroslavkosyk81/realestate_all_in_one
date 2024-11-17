import React from 'react'

import '../i18n.js';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto h-[calc(100vh_-_15vh)]'>
      
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>{t('about.about1')} BestDomivka</h1>
      <p className='mb-4 text-slate-700 pb-10 text-xl'>
      {t('about.mission')}
      </p>
      <p className='mb-4 text-slate-700 pb-10 text-xl'>
      {t('about.platform1')}
      <p className=''><br />
      {t('about.platform2')}</p>
      <p className=' '><br />
        {t('about.bsb')}</p>

        
        
         
      </p>
    </div>
  )
}
