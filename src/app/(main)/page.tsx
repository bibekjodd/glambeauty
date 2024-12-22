import AppointmentDetailsDialog from '@/components/dialogs/appointment-details-dialog';
import About from './sections/about';
import Best from './sections/best';
import Hero from './sections/hero';
import Services from './sections/services';
import Testimonails from './sections/testimonials';

export default function page() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Best />
      <Testimonails />

      <AppointmentDetailsDialog />
    </main>
  );
}
