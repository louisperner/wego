import React, { useRef } from 'react';

const Bubble = React.memo(
  ({ article, index, speed = 0.1, xFactor = window.innerHeight, yFactor = window.innerWidth }) => {
    const factor = useRef(Math.random() * 100);

    return (
      <div
        key={index}
        id={`floating-ball-${index}`}
        data-factor={factor.current}
        data-speed={speed}
        data-xfactor={xFactor}
        data-yfactor={yFactor}
        onClick={() => window.open(article.url, '_blank', 'frame=true')}
        className='absolute inset-0 m-auto border-4 border-white p-8 cursor-pointer flex flex-col items-center justify-center w-[250px] h-[250px] bg-[#E4B525] opacity-100 rounded-full text-center'
      >
        <span className='text-black text-md m-1 font-bold line-clamp-4'>{article.title}</span>
        <span className='text-black h-[12px]'>{article.source}</span>
      </div>
    );
  },
);

export default Bubble;
