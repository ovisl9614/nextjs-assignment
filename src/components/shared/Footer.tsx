import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className='w-full bg-[#101115] px-5 py-5'>
            <div className='mx-auto flex w-full max-w-[1400px] items-center justify-between'>


                <div className='flex items-center gap-2'>
                    <div className='flex h-4 w-4 items-center justify-center'>


                    <Image
                                  src="/assets/logo.png"
                                  alt="Fitlog"
                                  width={22}
                                  height={22}
                                  className="h-[20px] w-[20px] object-contain"
                                />
                        <path
                            d='M13.5 2L5 13H11L10.5 22L19 11H13L13.5 2Z"
         fill="#ccff00"'

         />
       
                    </div>
                    <span className='text-[10px] font-black tracking-wide text-white'>FITLOG</span>


                </div>

                <p className='text-[7px] text-[#777c87] sm:text-[8px]'>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
            </div>
        </footer>
    );
}
