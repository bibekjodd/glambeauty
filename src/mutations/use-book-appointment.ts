import { backendUrl } from '@/lib/constants';
import { getQueryClient } from '@/lib/query-client';
import { extractErrorMessage, wait } from '@/lib/utils';
import { appointmentsKey } from '@/queries/use-appointments';
import { notificationsKey } from '@/queries/use-notifications';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const bookAppointmentKey = ['book-appointment'];

export const useBookAppointment = () => {
  const queryClient = getQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: bookAppointmentKey,
    mutationFn: bookAppointment,
    onMutate() {
      toast.dismiss();
      toast.loading(`Booking appointment...`);
    },
    onSuccess(appointmentId) {
      toast.dismiss();
      toast.success(`Appointment booked successfully`);
      queryClient.invalidateQueries({ queryKey: notificationsKey });
      wait(300).then(() => {
        router.replace(`/?appointment_id=${appointmentId}&show_qr_code=true`);
      });
    },
    onError(err) {
      toast.dismiss();
      toast.error(`Could not book appointment! ${err.message}`);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: appointmentsKey });
    }
  });
};

type Options = {
  staffId: string;
  serviceId: string;
  date: string;
};
const bookAppointment = async (data: Options): Promise<string> => {
  try {
    const res = await axios.post<{ appointmentId: string }>(
      `${backendUrl}/api/appointments`,
      data,
      { withCredentials: true }
    );
    return res.data.appointmentId;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
