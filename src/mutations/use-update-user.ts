import { backend_url } from '@/lib/constants';
import { extractErrorMessage } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-user', id],
    mutationFn: (data: Omit<Options, 'id'>) => updateUser({ id, ...data }),

    onSuccess(_, { active, role }) {
      const oldStaffsData = queryClient.getQueryData<User[]>(['staffs']);
      if (!oldStaffsData) return;

      let updatedStaffsData: User[] = oldStaffsData.map((staff) => {
        if (staff.id !== id) return staff;
        return { ...staff, active: active || staff.active, role: role || staff.role };
      });
      updatedStaffsData = updatedStaffsData.filter((staff) => staff.role !== 'user');

      queryClient.setQueryData<User[]>(['staffs'], updatedStaffsData);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    }
  });
};

type Options = {
  role?: 'user' | 'admin' | 'staff';
  active?: boolean;
  id: string;
};
const updateUser = async ({ id, ...data }: Options) => {
  try {
    await axios.put(`${backend_url}/api/users/${id}`, data, { withCredentials: true });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
