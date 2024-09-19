import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const useDeleteService = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-service', id],
    mutationFn: () => deleteService(id),
    onMutate() {
      toast.dismiss();
      toast.loading('Deleting service...');
    },

    onSuccess() {
      toast.dismiss();
      toast.success('Service deleted successfully');
      const oldServices = queryClient.getQueryData<Service[]>(['services']);
      if (!oldServices) return;
      const updatedServices = oldServices.filter((service) => service.id !== id);
      queryClient.setQueryData<Service[]>(['services'], updatedServices);
    },

    onError(err) {
      toast.dismiss();
      toast.error(`Could not delete service! ${err.message}`);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    }
  });
};

const deleteService = async (id: string) => {
  try {
    await axios.delete(`${backend_url}/api/services/${id}`, { withCredentials: true });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
