import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useBookAppointment = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['book-appointment'],
    mutationFn: bookAppointment,
    onMutate() {
      toast.dismiss();
      toast.loading(`Booking appointment...`);
    },
    onSuccess(appointmentId) {
      toast.dismiss();
      toast.success(`Appointment booked successfully`);
      router.replace(`/?appointment_id=${appointmentId}&show_qr_code=true`);
    },
    onError(err) {
      toast.dismiss();
      toast.error(`Could not book appointment! ${err.message}`);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
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
      `${backend_url}/api/appointments`,
      data,
      { withCredentials: true }
    );
    return res.data.appointmentId;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
