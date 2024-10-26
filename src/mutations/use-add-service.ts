import { backendUrl } from '@/lib/constants';
import { AddServiceSchema } from '@/lib/form-schemas';
import { getQueryClient } from '@/lib/query-client';
import { extractErrorMessage, uploadImage } from '@/lib/utils';
import { servicesKey } from '@/queries/use-services';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { updateService } from './use-update-service';

export const addServiceKey = ['add-service'];

export const useAddService = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: addServiceKey,
    mutationFn: (data: AddServiceSchema & { image?: File }) => addService({ ...data }),
    onMutate() {
      toast.dismiss();
      toast.loading(`Adding new service...`);
    },
    onSuccess(addedService) {
      toast.dismiss();
      toast.success(`New Service added successfully`);
      const oldServicesData = queryClient.getQueryData<Service[]>(servicesKey);
      if (!oldServicesData) return;
      const updatedServicesData: Service[] = oldServicesData.map((service) => {
        if (service.id !== addedService.id) return service;
        return addedService;
      });
      queryClient.setQueryData<Service[]>(servicesKey, updatedServicesData);
    },
    onError(err) {
      toast.dismiss();
      toast.error(`Could not add service! ${err.message}`);
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: servicesKey });
    }
  });
};

type Options = AddServiceSchema & { image?: File };
const addService = async ({ image, ...data }: Options): Promise<Service> => {
  try {
    const uploadImagePromise = image instanceof File ? uploadImage(image) : undefined;
    const addServicePromise = axios.post<{ service: Service }>(`${backendUrl}/api/services`, data, {
      withCredentials: true
    });
    const [imageUrl, res] = await Promise.all([uploadImagePromise, addServicePromise]);
    imageUrl && updateService({ id: res.data.service.id, image: imageUrl });
    return { ...res.data.service, image: imageUrl || null };
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
