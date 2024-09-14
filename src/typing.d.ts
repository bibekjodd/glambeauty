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
