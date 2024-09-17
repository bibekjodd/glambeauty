import { poppins } from '@/lib/fonts';
import { ChevronRight } from 'lucide-react';
import ProgressLink from '../utils/progress-link';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className="relative grid h-screen min-h-screen place-items-center">
      {/* banner */}
      <div className='absolute -z-10 h-screen w-full bg-[url("https://i.ibb.co/0fZSpRF/hero-bannerr.png")] bg-cover bg-no-repeat [background-position:left_center] [clip-path:polygon(0_0,_100%_0%,_100%_90%,_0%_100%)]'>
        <div className="absolute left-0 top-20 h-screen w-full bg-gradient-to-br from-white/50 lg:from-white/30 xl:bg-none" />
      </div>

      <div className="w-fit px-4 md:px-0 lg:ml-auto lg:w-1/2">
        <h3 className={`${poppins.className} text-3xl`}>
          <span className="mb-1 block text-balance text-gray-800">Online Booking System for</span>
          <span className="text-4xl font-bold tracking-wide text-gray-800">Glambeauty</span>
        </h3>

        <ProgressLink href="/services">
          <Button variant="gradient" className="mt-2 h-11 rounded-full px-6 text-lg">
            <span>See our services</span>
            <ChevronRight className="size-6 transition group-hover:translate-x-0.5" />
          </Button>
        </ProgressLink>
      </div>
    </section>
  );
}
