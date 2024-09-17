import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const useCancelAppointment = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['cancel-appointment', id],
    mutationFn: ({ cancelReason }: { cancelReason: string | undefined }) =>
      cancelAppointment({ id, cancelReason }),

    onMutate({ cancelReason }) {
      toast.dismiss();
      toast.loading('Cancelling appointment');
      const oldAppointmentsData = queryClient.getQueryData<InfiniteData<Appointment[]>>([
        'appointments'
      ]) || { pages: [], pageParams: [] };

      const updatedPages: Appointment[][] = oldAppointmentsData.pages.map((page) =>
        page.map((appointment) => {
          if (appointment.id !== id) return appointment;
          return { ...appointment, cancelReason: cancelReason || null, status: 'cancelled' };
        })
      );
      queryClient.setQueryData<InfiniteData<Appointment[]>>(['appointments'], {
        ...oldAppointmentsData,
        pages: updatedPages
      });

      return oldAppointmentsData;
    },

    onSuccess() {
      toast.dismiss();
      toast.success('Appointment cancelled successfully');
    },

    onError(err, vars, oldPages) {
      toast.dismiss();
      toast.error(`Could not cancel appointment! ${err.message}`);
      if (!oldPages) return;
      queryClient.setQueryData<InfiniteData<Appointment[]>>(['appointments'], { ...oldPages });
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    }
  });
};

const cancelAppointment = ({
  id,
  cancelReason
}: {
  id: string;
  cancelReason: string | undefined;
}) => {
  try {
    return axios.put(
      `${backend_url}/api/appointments/${id}/cancel`,
      { cancelReason },
      { withCredentials: true }
    );
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
