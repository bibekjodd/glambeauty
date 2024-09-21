import { TopService } from '@/queries/use-top-services';
import axios, { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colors = [
  '#4A90E2',
  '#D5A86B',
  '#E94E77',
  '#5D6D93',
  '#F6C3B4',
  '#8FCB3D',
  '#FF8C00',
  '#7D5BA6',
  '#1ABC9C',
  '#F39C12'
] as const;

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

export const findNextNDaysDate = (days: number): string => {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.toISOString();
};

export type AppointmentsChartData = {
  date: string;
  pending: number;
  completed: number;
  cancelled: number;
};

export const prepareAppointmentsChartData = ({
  stats,
  type
}: {
  stats: AppointmentStats[];
  type: 'appointment' | 'booking';
}) => {
  const data: AppointmentsChartData[] = [];
  for (const item of stats) {
    let date = item.startsAt.slice(0, 10);
    if (type === 'booking') date = item.bookedAt.slice(0, 10);
    const itemGroup = data.find((group) => group.date === date);
    if (itemGroup) {
      itemGroup.cancelled += item.status === 'cancelled' ? 1 : 0;
      itemGroup.pending += item.status === 'pending' ? 1 : 0;
      itemGroup.completed += item.status === 'completed' ? 1 : 0;
    } else {
      data.push({
        date,
        pending: item.status === 'pending' ? 1 : 0,
        cancelled: item.status === 'cancelled' ? 1 : 0,
        completed: item.status === 'completed' ? 1 : 0
      });
    }
  }
  return data.sort((a, b) => a.date.localeCompare(b.date));
};

type TopServiceData = { title: string; count: number; fill: string };
export const prepareTopServicesData = (services: TopService[]): TopServiceData[] => {
  const data: TopServiceData[] = [];

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    data.push({
      title: service.title,
      count: service.count,
      fill: colors[i]
    });
  }

  return data;
};
