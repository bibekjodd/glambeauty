import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess() {
      queryClient.setQueryData(['profile'], null);
      queryClient.clear();
    }
  });
};

const logout = async () => {
  try {
    return axios.get(`${backend_url}/api/logout`, { withCredentials: true });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
