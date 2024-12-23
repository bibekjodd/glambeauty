import { closePostFeedbackDialog } from '@/components/dialogs/post-feedback-dialog';
import { backendUrl } from '@/lib/constants';
import { PostFeedbackSchema } from '@/lib/form-schemas';
import { extractErrorMessage } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const postFeedbackKey = ['post-feedback'];

export const usePostFeedback = () => {
  return useMutation({
    mutationKey: postFeedbackKey,
    mutationFn: postFeedback,
    onError(err) {
      toast.error(`Could not post feedback! ${err.message}`);
    },
    onSuccess() {
      toast.success('Your feedback has been sent successfully');
      closePostFeedbackDialog();
    }
  });
};

const postFeedback = async (data: PostFeedbackSchema) => {
  try {
    await axios.post(`${backendUrl}/api/feedbacks`, data, { withCredentials: true });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
