import { backendUrl } from '@/lib/constants';
import { UpdateProfileSchema } from '@/lib/form-schemas';
import { getQueryClient } from '@/lib/query-client';
import { extractErrorMessage } from '@/lib/utils';
import { profileKey } from '@/queries/use-profile';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const updateProfileKey = ['update-profile'];

export const useUpdateProfile = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: updateProfileKey,
    mutationFn: updateProfile,
    onMutate() {},
    onSuccess(user) {
      toast.success('Profile updated successfully');
      queryClient.setQueryData<User>(profileKey, user);
    },
    onError(err) {
      toast.error(`Could not update profile! ${err.message}`);
    }
  });
};

export const updateProfile = async (data: Partial<UpdateProfileSchema>): Promise<User> => {
  try {
    const res = await axios.put<{ user: User }>(`${backendUrl}/api/users/profile`, data, {
      withCredentials: true
    });

    return res.data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
