type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: 'user' | 'admin' | 'staff';
  phone: number | null;
  address: string | null;
  active: boolean;
};

type Service = {
  id: string;
  image: string | null;
  active: boolean | null;
  title: string;
  price: number;
  description: string;
  duration: number;
};

type Appointment = {
  id: string;
  customer: User;
  service: Service;
  staff: User;
  starts_at: string;
  ends_at: string;
  status: 'pending' | 'completed' | 'cancelled';
  cancelReason: string | null;
  isRescheduled: boolean | null;
};
