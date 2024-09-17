import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['book-appointment'],
    mutationFn: bookAppointment,
    onMutate() {
      toast.dismiss();
      toast.loading(`Booking appointment...`);
    },
    onSuccess() {
      toast.dismiss();
      toast.success(`Appointment booked successfully`);
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
const bookAppointment = async (data: Options) => {
  try {
    await axios.post(`${backend_url}/api/appointments`, data, { withCredentials: true });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
