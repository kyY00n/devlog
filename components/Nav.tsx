import Link from 'next/link';
import nav from '@/data/nav';

interface NavProps {
  type: 'toggle' | 'normal';
  onClick?: () => void;
}

export default function Nav({ type, onClick }: NavProps) {
  const defaultStyleString =
    'dark:text-white dark:hover:text-green-500 text-center transition duration-250 hover:scale-125 hover:text-green-500';
  return (
    <>
      {nav.map((item) => {
        const { title, link } = item;
        return (
          <Link
            href={link}
            key={title}
            className={
              type === 'normal' ? defaultStyleString : defaultStyleString + ' text-lg py-4'
            }
            onClick={
              onClick
                ? onClick
                : () => {
                    return;
                  }
            }
          >
            {title}
          </Link>
        );
      })}
    </>
  );
}
