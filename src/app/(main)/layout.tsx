import PostFeedbackDialog from '@/components/dialogs/post-feedback-dialog';
import SelectAppointmentDialog from '@/components/dialogs/select-appointment-dialog';
import AppointmentsDrawer from '@/components/drawers/appointments-drawer';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />

      <PostFeedbackDialog />
      <AppointmentsDrawer />
      <SelectAppointmentDialog />
    </>
  );
}
