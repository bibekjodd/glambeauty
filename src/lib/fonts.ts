import { Concert_One, Inter, Poppins } from 'next/font/google';

export const concertOne = Concert_One({ subsets: ['latin'], weight: ['400'] });
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});
export const inter = Inter({ subsets: ['latin'] });
