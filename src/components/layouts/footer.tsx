import { Copyright } from 'lucide-react';
import { logo } from '../utils/logo';

export default function Footer() {
  return (
    <div className="bg-neutral-900 py-6 text-gray-100">
      <footer className="cont">
        <section className="flex w-full flex-col justify-between space-y-5 md:flex-row md:items-center md:space-x-5 md:space-y-0">
          <h3 className="text-4xl">{logo}</h3>

          <div className="flex items-center">
            <Copyright className="mr-2 inline size-5" />
            <p className="inline">
              {new Date().getFullYear()} Glambeauty appointment services. All rights reserved.
            </p>
          </div>
        </section>
      </footer>
    </div>
  );
}
