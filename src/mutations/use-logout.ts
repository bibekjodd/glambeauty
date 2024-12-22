import { closeLogoutDialog } from '@/components/dialogs/logout-dialog';
import { backendUrl } from '@/lib/constants';
import { getQueryClient } from '@/lib/query-client';
import { extractErrorMessage } from '@/lib/utils';
import { profileKey } from '@/queries/use-profile';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const useLogout = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess() {
      toast.success('Logged out successfully');
      closeLogoutDialog();
      queryClient.setQueryData(profileKey, null);
      queryClient.clear();
    }
  });
};

const logout = async () => {
  try {
    return axios.post(`${backendUrl}/api/auth/logout`, undefined, { withCredentials: true });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
