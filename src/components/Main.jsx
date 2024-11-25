import React, { useState, useEffect } from 'react';
import Spotlight from './Spotlight';

// import { useScrapeStore } from '../store/ScraperStore';

function Main() {
  // const store = useScrapeStore();

  return (
    <div className='w-screen h-screen'>
      <Spotlight />
    </div>
  );
}

export default Main;
