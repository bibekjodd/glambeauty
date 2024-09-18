import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return err.response?.data.message || err.message;
  } else if (err instanceof Error) {
    return err.message;
  }
  return 'Unknown error occurred!';
};

export const imageToDataUri = (file: File): Promise<string> => {
  return new Promise((res) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (ev) => {
      const result = ev.target?.result?.toString();
      res(result || '');
    });
  });
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      formData
    );
    return data.data.display_url;
  } catch (error) {
    throw new Error('Could not upload image');
  }
};

export const wait = async (time = 1000) => {
  return new Promise((res) => {
    setTimeout(() => {
      res('okay');
    }, time);
  });
};

export const formatDate = (value: string | Date | number) => {
  const date = new Date(value);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${month} ${day}, ${hours % 12 || 12}${minutes !== 0 ? `:${minutes}` : ''}${hours > 12 ? 'pm' : 'am'}`;
};
