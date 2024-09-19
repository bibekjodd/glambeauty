type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  phone: number | null;
  address: string | null;
  active: boolean;
};
type UserRole = 'user' | 'admin' | 'staff';

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
  status: AppointmentStatus;
  cancelReason: string | null;
  isRescheduled: boolean | null;
  bookedAt: string;
  staff: User;
  customer: User;
  service: Service;
};
type AppointmentStatus = 'pending' | 'completed' | 'cancelled';

type AppointmentStats = {
  id: string;
  status: AppointmentStatus;
  startsAt: string;
  endsAt: string;
  bookedAt: string;
};

type NotificationResult = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  receivedAt: string;
  entity: string;
  params: string | null;
};

type Feedback = {
  id: string;
  title: string;
  text: string;
  userId: string;
  rating: number;
  receivedAt: string;
  user: User;
};
