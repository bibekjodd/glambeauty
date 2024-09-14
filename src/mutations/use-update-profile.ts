import { backend_url } from '@/lib/constants';
import { toast } from 'sonner';
import { UpdateProfileSchema } from '@/lib/form-schemas';
import { extractErrorMessage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-profile'],
    mutationFn: updateProfile,
    onMutate() {
      toast.dismiss();
      toast.loading('Updating profile...');
    },
    onSuccess(user) {
      toast.dismiss();
      toast.success('Profile updated successfully');
      queryClient.setQueryData<User>(['profile'], user);
    },
    onError(err) {
      toast.dismiss();
      toast.error(`Could not update profile! ${err.message}`);
    }
  });
};

export const updateProfile = async (data: Partial<UpdateProfileSchema>): Promise<User> => {
  try {
    const res = await axios.put<{ user: User }>(`${backend_url}/api/profile`, data, {
      withCredentials: true
    });

    return res.data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
