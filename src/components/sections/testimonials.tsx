import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials: {
  name: string;
  review: string;
  rating: number;
  image: string;
  attribute: string;
}[] = [
  {
    name: 'Sanju Roka',
    image: 'https://i.postimg.cc/fyPDgVd3/user1.jpg',
    rating: 5,
    attribute: 'Teacher',
    review:
      "Fantastic system! It's incredibly efficient and takes the stress out of scheduling beauty treatments. The user-friendly design ensures I can make appointments quickly, and the confirmation and reminder emails are a nice touch. I wouldn't use anything else."
  },
  {
    name: 'Nisha Bhandari',
    image: 'https://i.postimg.cc/Y2DrSsPp/user2.jpg',
    rating: 5,
    attribute: 'Fitness Trainer',
    review:
      "I absolutely love this beauty parlor appointment system! It's super intuitive and makes scheduling my appointments a breeze. The interface is user-friendly, and I appreciate the seamless integration with my calendar. I haven’t had any issues, and the reminders are a lifesaver. Highly recommend!"
  },
  {
    name: 'Rima Adhikari',
    image: 'https://i.postimg.cc/7YCxJNvS/user3.jpg',
    rating: 5,
    attribute: 'Student',
    review:
      'This appointment system has transformed the way I manage my beauty appointments. The customer service is exceptional, and the online booking process is smooth and straightforward. The ability to reschedule or cancel appointments with just a few clicks is a game changer. Highly satisfied!'
  }
];

export default function Testimonails() {
  return (
    <section id="testimonials" className="mt-24 bg-gray-100 py-12 md:px-5 lg:px-10 xl:px-0">
      <h3
        className={cn(
          poppins.className,
          'text-balance text-center text-4xl font-semibold text-gray-900'
        )}
      >
        We are highly <span className="text-pink-500">admired</span> by our{' '}
        <span className="text-pink-500">Customers!</span>
      </h3>
      <div className="mx-auto mt-10 flex max-w-screen-xl flex-wrap items-center justify-center">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="w-full p-5 md:w-1/2 xl:w-1/3">
            <div className="flex flex-col items-center self-center rounded-xl bg-white p-4 pt-0 shadow-xl shadow-gray-200 md:p-6">
              <Image
                src={testimonial.image}
                alt="user image"
                height={1080}
                width={720}
                quality={100}
                className="size-24 -translate-y-5 rounded-full object-cover shadow-xl"
              />
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-gray-700">{testimonial.attribute}</p>
              <div className="my-2 flex space-x-0.5">
                {new Array(Math.ceil(testimonial.rating)).fill('nothing').map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className={cn(poppins.className, 'mt-3 text-gray-500')}>{testimonial.review}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
