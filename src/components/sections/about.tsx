import { aboutUsImage } from '@/lib/constants';
import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function About() {
  return (
    <div id="about" className="scroll-m-20 bg-gray-200/30">
      <section className="cont my-24 grid grid-cols-1 space-y-5 py-10 md:my-32 lg:grid-cols-2 lg:space-y-0">
        <div className="relative text-gray-700 lg:pr-6">
          {bgShadow}
          <h3 className={cn(poppins.className, 'text-3xl font-semibold text-gray-900')}>
            About <span className="text-pink-500">Glambeauty</span>
          </h3>
          <p className="mt-3">
            Welcome to GlamBeauty, your go-to destination for premium beauty and wellness services.
            At GlamBeauty, we strive to deliver an exceptional experience that leaves you looking
            and feeling your best.
          </p>
          <p className="mt-3">
            Our user-friendly online appointment system allows you to effortlessly browse services,
            select your preferred stylist, and book appointments at your convenience.{' '}
            <span className="hidden lg:inline">
              {' '}
              With GlamBeauty, you can schedule your beauty treatments anytime, ensuring that your
              visit is smooth and stress-free.
            </span>
          </p>
        </div>
        <div className="lg:px-4">
          <Image
            src={aboutUsImage}
            alt="image"
            height={1080}
            width={720}
            quality={100}
            className="aspect-video w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}

const bgShadow = (
  <div className="absolute inset-0 -z-10 grid place-items-center">
    <section className="relative grid h-full w-full place-items-center">
      <div className="absolute aspect-square w-4/12 rounded-full bg-fuchsia-700/15 blur-3xl filter backdrop-blur-3xl md:w-8/12 md:translate-y-16 lg:translate-y-0 lg:bg-fuchsia-700/20" />
    </section>
  </div>
);
