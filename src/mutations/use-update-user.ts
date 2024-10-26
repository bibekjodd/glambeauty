import { backendUrl } from '@/lib/constants';
import { getQueryClient } from '@/lib/query-client';
import { extractErrorMessage } from '@/lib/utils';
import { staffsKey } from '@/queries/use-staffs';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const updateUserKey = (id: string) => ['update-user', id];

export const useUpdateUser = (id: string) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: updateUserKey(id),
    mutationFn: (data: Omit<Options, 'id'>) => updateUser({ id, ...data }),

    onSuccess(_, { active, role }) {
      const oldStaffsData = queryClient.getQueryData<User[]>(staffsKey);
      if (!oldStaffsData) return;

      let updatedStaffsData: User[] = oldStaffsData.map((staff) => {
        if (staff.id !== id) return staff;
        return {
          ...staff,
          active: active !== undefined ? active : staff.active,
          role: role || staff.role
        };
      });
      updatedStaffsData = updatedStaffsData.filter((staff) => staff.role !== 'user');

      queryClient.setQueryData<User[]>(staffsKey, updatedStaffsData);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: staffsKey });
    }
  });
};

type Options = {
  role?: 'user' | 'admin' | 'staff';
  active?: boolean;
  id: string;
};
export const updateUser = async ({ id, ...data }: Options) => {
  try {
    await axios.put(`${backendUrl}/api/users/${id}`, data, {
      withCredentials: true
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
