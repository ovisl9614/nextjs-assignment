import React from 'react';

import Hero from '@/components/shared/Hero';

const page = () => {
  return (
    <div>

      <main>
        <Hero />

          <section
             id="library"
             className='mx-auto max-w-[1400px] px-4 py-10'>
            <h2 className='text-2xl font-black text-white'>
              THE LIBRARY
            </h2>

            <p className='mt-1 text-sm text-gray-400'>
              Twelve lifts covering every major muscle group.
            </p>
          </section>
        
      </main>
  
    </div>
  );
};

export default page;