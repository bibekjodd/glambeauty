import { backend_url } from '@/lib/constants';
import { UpdateServiceSchema } from '@/lib/form-schemas';
import { extractErrorMessage, uploadImage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const useUpdateService = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-service', id],
    mutationFn: (data: UpdateServiceSchema & { image?: File | string }) =>
      updateService({ id, ...data }),

    onMutate() {
      toast.dismiss();
      toast.loading('Updating service...');
    },

    onSuccess(updatedService) {
      toast.dismiss();
      toast.success('Updated service successfully');
      const oldServicesData = queryClient.getQueryData<Service[]>(['services']);
      if (!oldServicesData) return;

      const updatedServicesData: Service[] = oldServicesData.map((service) => {
        if (service.id !== id) return service;
        return updatedService;
      });
      queryClient.setQueryData<Service[]>(['services'], updatedServicesData);
    },

    onError(error) {
      toast.dismiss();
      toast.error(`Could not update service! ${error.message}`);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    }
  });
};

type Options = { id: string } & UpdateServiceSchema & { image?: File | string };
export const updateService = async ({ id, image, ...data }: Options): Promise<Service> => {
  try {
    const uploadImagePromise = image instanceof File ? uploadImage(image) : undefined;
    const updateServicePromise = axios.put<{ service: Service }>(
      `${backend_url}/api/services/${id}`,
      { ...data, image: typeof image === 'string' ? image : undefined },
      {
        withCredentials: true
      }
    );
    const [imageUrl, res] = await Promise.all([uploadImagePromise, updateServicePromise]);
    imageUrl && updateService({ id, image: imageUrl });
    return { ...res.data.service, image: imageUrl || res.data.service.image };
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
