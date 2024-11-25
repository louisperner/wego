import React from 'react';

import { useScrapeStore } from '../store/ScraperStore';

function Scraper() {
  const store = useScrapeStore();

  return (
    <>
      {store.url && (
        <div className='w-full h-full absolute bg-[#d7dc54] p-[14px]'>
          <div className='w-full h-full rounded-[30px]'>
            {store.showBubbles && (
              <div className='w-full h-full'>
                <div className='w-full h-full'>{store.code}</div>
              </div>
            )}
            <webview
              enableblinkfeatures='PreciseMemoryInfo, CSSVariables'
              ref={store.webviewRef}
              className='w-full h-full rounded-[30px]'
              src={`${store.url.includes('https://') ? '' : 'https://'}${store.url}`}
              onLoad={console.log('Loaded')}
            ></webview>
          </div>
        </div>
      )}
    </>
  );
}

export default Scraper;
