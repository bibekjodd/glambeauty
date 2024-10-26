export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const loginLink = `${backendUrl}/api/auth/login/google?redirect=${typeof location === 'undefined' ? { origin: '' } : location.origin}`;
export const dummyUserImage = 'https://avatars.githubusercontent.com/u/110604197?v=4';
export const dummyServiceImage = 'https://i.postimg.cc/HxjCcRRM/Untitled.jpg';
export const aboutUsImage = 'https://i.postimg.cc/Jz1xTfLB/Untitled.jpg';

const facebookImage = 'https://i.postimg.cc/8CHsQjWC/facebook.png';
const xImage = 'https://i.postimg.cc/BZ78tdfP/x.png';
const instagramImage = 'https://i.postimg.cc/g0drTvx5/instagram.png';
export const socialLinks = [
  { title: 'Facebook', image: facebookImage },
  { title: 'Instagram', image: instagramImage },
  { title: 'X', image: xImage }
];
