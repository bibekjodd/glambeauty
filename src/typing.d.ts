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
  title: string;
  price: number;
  duration: number;
  active: boolean;
};
