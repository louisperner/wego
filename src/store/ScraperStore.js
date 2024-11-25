import { create } from 'zustand';
import { createRef } from 'react';

export const useScrapeStore = create((set) => {
  return {
    url: '',
    question: '',
    // 'https://www.google.com/maps/place/Tri%C3%A2ngulo+do+Chopp/@-23.5056511,-46.8216139,12z/data=!4m10!1m2!2m1!1striangulo!3m6!1s0x94cef7f5a15242c5:0x35b87b5048edfd76!8m2!3d-23.5056511!4d-46.6691786!15sCgl0cmlhbmd1bG9aCyIJdHJpYW5ndWxvkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F1wd3x5hz?entry=ttu&g_ep=EgoyMDI0MTExOC4wIKXMDSoASAFQAw%3D%3D',
    buttons: '',
    webviewRef: createRef(),
    place: { id: '', name: '' },
    setUrl: (url) => set(() => ({ url: url })),
    setQuestion: (question) => set(() => ({ question: question })),
    setButtons: (buttons) => set(() => ({ buttons: buttons })),
    setPlace: (place) => set(() => ({ place: place })),
    // setWebViewRef: (webviewRef) => set(() => ({ webviewRef: webviewRef })),
  };
});
