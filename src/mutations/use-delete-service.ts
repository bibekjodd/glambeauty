import { backendUrl } from '@/lib/constants';
import { getQueryClient } from '@/lib/query-client';
import { extractErrorMessage } from '@/lib/utils';
import { servicesKey } from '@/queries/use-services';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const deleteServiceKey = (id: string) => ['delete-service', id];

export const useDeleteService = (id: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: deleteServiceKey(id),
    mutationFn: () => deleteService(id),
    onMutate() {
      toast.dismiss();
      toast.loading('Deleting service...');
    },

    onSuccess() {
      toast.dismiss();
      toast.success('Service deleted successfully');
      const oldServices = queryClient.getQueryData<Service[]>(servicesKey);
      if (!oldServices) return;
      const updatedServices = oldServices.filter((service) => service.id !== id);
      queryClient.setQueryData<Service[]>(servicesKey, updatedServices);
    },

    onError(err) {
      toast.dismiss();
      toast.error(`Could not delete service! ${err.message}`);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: servicesKey });
    }
  });
};

const deleteService = async (id: string) => {
  try {
    await axios.delete(`${backendUrl}/api/services/${id}`, { withCredentials: true });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
