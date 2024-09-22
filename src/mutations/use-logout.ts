import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess() {
      router.replace('/');
      queryClient.setQueryData(['profile'], null);
      queryClient.clear();
    }
  });
};

const logout = async () => {
  try {
    return axios.post(`${backend_url}/api/auth/logout`, undefined, { withCredentials: true });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
