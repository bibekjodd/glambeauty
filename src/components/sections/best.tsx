import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Clock12, Gem, Headset, UsersRound } from 'lucide-react';

const list = [
  {
    title: '24/7 support',
    icon: Headset
  },
  {
    title: 'Fantastic stylists',
    icon: UsersRound
  },
  {
    title: 'Top notch service',
    icon: Gem
  },
  {
    title: 'Flexible scheduling',
    icon: Clock12
  }
];

export default function Best() {
  return (
    <section id="best" className="mt-24 py-12">
      <h3
        className={cn(
          poppins.className,
          'text-balance text-center text-4xl font-semibold text-gray-900'
        )}
      >
        Why are we the <span className="text-pink-500">Best</span> on the{' '}
        <span className="text-pink-500">Market!</span>
      </h3>

      <div className="cont mt-12 grid space-y-12 lg:grid-cols-4 lg:space-y-0">
        {list.map((item) => (
          <div key={item.title} className="flex flex-col items-center space-y-5">
            <item.icon className="size-12 text-pink-500" />
            <p className="text-lg font-semibold">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
