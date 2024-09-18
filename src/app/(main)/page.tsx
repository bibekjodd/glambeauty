import AppointmentDetailDrawer from '@/components/drawers/appointment-detail-drawer';
import About from '@/components/sections/about';
import Best from '@/components/sections/best';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Testimonails from '@/components/sections/testimonials';

export default function page() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Best />
      <Testimonails />
      <AppointmentDetailDrawer />
    </main>
  );
}
