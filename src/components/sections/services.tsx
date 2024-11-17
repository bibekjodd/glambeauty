'use client';
import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { useProfile } from '@/queries/use-profile';
import { ProgressLink } from '@jodd/next-top-loading-bar';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import SelectAppointmentDialog from '../dialogs/select-appointment-dialog';

type Service = { title: string; image: string; description: string };
const services: Service[] = [
  {
    title: 'Revitalizing Skincare Rituals',
    image: 'https://i.postimg.cc/NMkNdBzS/Whats-App-Image-2024-09-14-at-8-04-45-AM-1.jpg',
    description:
      'Pamper your skin with our Revitalizing Skincare Rituals. Experience the ultimate in relaxation and rejuvenation with our customized facials, deep-cleansing treatments, and advanced anti-aging solutions. Our skilled estheticians use top-of-the-line products and techniques to address your skin’s specific needs, helping you achieve a radiant, youthful complexion.'
  },
  {
    title: 'Signature Hair Transformations',
    image: 'https://i.postimg.cc/fTr82H8z/Whats-App-Image-2024-09-14-at-8-04-47-AM.jpg',
    description:
      'Treat yourself to our Indulgent Nail Care & Artistry services, where precision meets creativity. Enjoy a flawless manicure or pedicure with our premium products, along with stunning nail art that reflects your style. From classic elegance to bold designs, our nail technicians ensure your hands and feet look and feel their best with every visit.'
  },
  {
    title: 'Indulgent Nail Care & Artistry',
    image: 'https://i.postimg.cc/8zxn5yvK/Untitled.jpg',
    description:
      'Elevate your look with our Signature Hair Transformations. From precision haircuts and bespoke coloring to trend-setting styles and luxurious treatments, our expert stylists craft a personalized look that suits your unique personality and lifestyle. Whether you’re looking for a bold change or a subtle enhancement, we guarantee a style that will leave a lasting impression.'
  }
];

export default function Services() {
  return (
    <section id="services" className="cont my-24 scroll-m-20 md:my-32">
      <h3
        className={cn(
          poppins.className,
          'text-balance text-center text-4xl font-semibold text-gray-900'
        )}
      >
        World class <span className="text-pink-500">Services</span> for{' '}
        <span className="text-pink-500">You!</span>
      </h3>
      <div className="mt-12 grid space-y-20 lg:grid-cols-2 lg:space-y-0">
        {services.slice(0, 2).map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { data: profile } = useProfile();
  return (
    <div className="flex flex-col lg:px-7">
      <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-md">
        <Image
          src={service.image}
          quality={100}
          fill
          alt="service image"
          className="aspect-video w-full overflow-hidden rounded-md object-cover transition-all duration-300 ease-in hover:scale-105"
        />
      </div>

      <div className="relative mt-3 flex-grow space-y-3">
        {bgShadow}
        <h3 className={cn(poppins.className, 'text-2xl font-semibold')}>{service.title}</h3>
        <p className="mt-3 line-clamp-3 text-gray-700">{service.description}</p>
        {profile?.role === 'user' ? (
          <SelectAppointmentDialog>
            <button className="group flex h-10 w-full items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 font-medium text-transparent text-white transition hover:text-white hover:brightness-110 active:scale-[0.98]">
              <span>Book now</span>
              <MoveRight className="size-4 translate-x-3 scale-125 transition-transform group-hover:translate-x-4" />
            </button>
          </SelectAppointmentDialog>
        ) : (
          <ProgressLink
            href="/services"
            className="group flex h-10 w-full items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 font-medium text-transparent text-white transition hover:text-white hover:brightness-110 active:scale-[0.98]"
          >
            <span>Browse services</span>
            <MoveRight className="size-4 translate-x-3 scale-125 transition-transform group-hover:translate-x-4" />
          </ProgressLink>
        )}
      </div>
    </div>
  );
}

const bgShadow = (
  <div className="absolute inset-0 -z-10 grid -translate-y-5 place-items-center">
    <section className="relative grid h-full w-full place-items-center">
      <div className="absolute aspect-square w-6/12 rounded-full bg-fuchsia-700/15 blur-3xl filter backdrop-blur-3xl md:w-10/12" />
    </section>
  </div>
);
