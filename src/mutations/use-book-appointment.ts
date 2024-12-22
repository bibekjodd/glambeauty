import { openQrCodeDialog } from '@/components/dialogs/qr-code-dialog';
import { backendUrl } from '@/lib/constants';
import { getQueryClient } from '@/lib/query-client';
import { extractErrorMessage } from '@/lib/utils';
import { appointmentsKey } from '@/queries/use-appointments';
import { notificationsKey } from '@/queries/use-notifications';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const bookAppointmentKey = ['book-appointment'];

export const useBookAppointment = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: bookAppointmentKey,
    mutationFn: bookAppointment,

    onSuccess(appointmentId) {
      openQrCodeDialog(
        `${location.origin}?appointment_id=${appointmentId}`,
        () => 'Save this qr code to track appointment'
      );
      toast.success(`Appointment booked successfully`);
      queryClient.invalidateQueries({ queryKey: notificationsKey });
    },
    onError(err) {
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
