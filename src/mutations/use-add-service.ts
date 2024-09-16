import { backend_url } from '@/lib/constants';
import { AddServiceSchema } from '@/lib/form-schemas';
import { extractErrorMessage, uploadImage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { updateService } from './use-update-service';
import { toast } from 'sonner';

export const useAddService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-service'],
    mutationFn: (data: AddServiceSchema & { image?: File }) => addService({ ...data }),
    onMutate() {
      toast.dismiss();
      toast.loading(`Adding new service...`);
    },
    onSuccess(addedService) {
      toast.dismiss();
      toast.success(`New Service added successfully`);
      const oldServicesData = queryClient.getQueryData<Service[]>(['services']);
      if (!oldServicesData) return;
      const updatedServicesData: Service[] = oldServicesData.map((service) => {
        if (service.id !== addedService.id) return service;
        return addedService;
      });
      queryClient.setQueryData<Service[]>(['services'], updatedServicesData);
    },
    onError(err) {
      toast.dismiss();
      toast.error(`Could not add service! ${err.message}`);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    }
  });
};

type Options = AddServiceSchema & { image?: File };
const addService = async ({ image, ...data }: Options): Promise<Service> => {
  try {
    const uploadImagePromise = image instanceof File ? uploadImage(image) : undefined;
    const addServicePromise = axios.post<{ service: Service }>(
      `${backend_url}/api/services`,
      data,
      { withCredentials: true }
    );
    const [imageUrl, res] = await Promise.all([uploadImagePromise, addServicePromise]);
    imageUrl && updateService({ id: res.data.service.id, image: imageUrl });
    return { ...res.data.service, image: imageUrl || null };
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
