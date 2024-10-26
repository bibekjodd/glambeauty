import { backendUrl } from '@/lib/constants';
import { getQueryClient } from '@/lib/query-client';
import { extractErrorMessage } from '@/lib/utils';
import { appointmentsKey } from '@/queries/use-appointments';
import { InfiniteData, QueryKey, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const cancelAppointmentKey = (id: string) => ['cancel-appointment', id];

export const useCancelAppointment = (id: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: cancelAppointmentKey(id),
    mutationFn: ({ cancelReason }: { cancelReason: string | undefined; queryKey: QueryKey }) =>
      cancelAppointment({ id, cancelReason }),

    onMutate({ cancelReason, queryKey }) {
      toast.dismiss();
      toast.loading('Cancelling appointment');
      const oldAppointmentsData = queryClient.getQueryData<InfiniteData<Appointment[]>>(
        queryKey
      ) || { pages: [], pageParams: [] };

      const updatedPages: Appointment[][] = oldAppointmentsData.pages.map((page) =>
        page.map((appointment) => {
          if (appointment.id !== id) return appointment;
          return { ...appointment, cancelReason: cancelReason || null, status: 'cancelled' };
        })
      );
      queryClient.setQueryData<InfiniteData<Appointment[]>>(queryKey, {
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
      queryClient.setQueryData<InfiniteData<Appointment[]>>(appointmentsKey, { ...oldPages });
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: appointmentsKey });
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
      `${backendUrl}/api/appointments/${id}/cancel`,
      { cancelReason },
      { withCredentials: true }
    );
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
