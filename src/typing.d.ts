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
  customerId: string;
  serviceId: string | null;
  staffId: string;
  startsAt: string;
  endsAt: string;
  status: 'pending' | 'completed' | 'cancelled';
  cancelReason: string | null;
  isRescheduled: boolean | null;
  bookedAt: string;
  staff: User;
  customer: User;
  service: Service;
};

type AppointmentStats = {
  id: string;
  status: 'pending' | 'completed' | 'cancelled';
  startsAt: string;
  endsAt: string;
  bookedAt: string;
};
