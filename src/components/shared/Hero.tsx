import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

const Hero = () => {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
      <div className="min-h-[300px] rounded-lg bg-[#15171c] px-6 py-8 sm:px-10 md:px-12 md:py-10 lg:flex lg:items-center lg:justify-between">

        {/* LEFT SIDE */}
        <div className="max-w-[600px]">

          
          <p className="mb-4 text-[9px] font-bold tracking-[1px] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          
          <h1
            className={`${oswald.className} max-w-[550px] text-4xl font-bold uppercase leading-[0.95] tracking-[-1px] text-white sm:text-5xl md:text-6xl`}
          >
            TRAIN WITH INTENT. LOG<br />
            EVERY SET.
          </h1>

        
          <p className="mt-4 max-w-[500px] text-xs leading-5 text-gray-400 sm:text-sm">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />into today's plan, and watch the week's work add up.
          </p>

          
          <Link
            href="#library"
            className="mt-6 inline-flex items-center gap-2 bg-[#ccff00] px-4 py-2 text-[10px] font-black uppercase text-black transition rounded hover:bg-[#d9ff4d]"
          >
            BROWSE WORKOUTS
            
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="mt-8 flex justify-center lg:mt-0 lg:w-[40%]">
          <Image
            src="/assets/banner.png"
            alt="FitLog workout"
            width={400}
            height={300}
            className="h-auto w-[220px] object-contain sm:w-[270px] lg:w-[320px]"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;