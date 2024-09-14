import { poppins } from '@/lib/fonts';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative grid h-screen min-h-screen place-items-center">
      {/* banner */}
      <div className='absolute -z-10 h-screen w-full bg-[url("https://simplybook.me/build/images/Beauty-salons.f53f1dfc.png")] bg-cover bg-no-repeat [background-position:left_center] [clip-path:polygon(0_0,_100%_0%,_100%_90%,_0%_100%)]' />

      <div className="grid grid-cols-2">
        <div />
        <div>
          <h3 className={`${poppins.className} text-3xl`}>
            <span className="mb-1 block text-gray-800">Online Booking System for</span>
            <span className="text-4xl font-bold tracking-wide text-gray-800">Glambeauty</span>
          </h3>

          <button className="group mt-3 flex items-center space-x-2 rounded-full bg-gradient-to-tr from-pink-600/90 to-pink-500 px-6 py-2.5 text-lg text-white brightness-110 transition-all hover:brightness-100 active:scale-[0.98]">
            <span className="">See our services</span>
            <ChevronRight className="size-6 transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
