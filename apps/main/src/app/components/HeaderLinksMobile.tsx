'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useModalStore from '@/lib/store/useModal';
import { FaAngleDown } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const HeaderLinksMobile = ({ className }: HeaderProps) => {
  const pathname = usePathname();

  const { closeMenu } = useModalStore();

  const handleMenu = () => {
    closeMenu();
  };

  return (
    <div
      className={cn('w-full h-full flex sm:hidden justify-center', className)}
    >
      <ul className='w-full flex flex-col list-none gap-2.5'>
        <li
          className='text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]'
          onClick={handleMenu}
        >
          <HeaderLink href='/' active={pathname === '/'}>
            Home
          </HeaderLink>
        </li>
        <li
          className='text-base px-5 flex items-center justify-between font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]'
          onClick={handleMenu}
        >
          <HeaderLink href='/courses' active={pathname === '/courses'}>
            <div className='h-full sm:h-[screen] flex justify-between items-center'>
              <span>Courses</span>
              <span className='ml-[calc(.675*100vw)]'>
                <FaAngleDown />
              </span>
            </div>
          </HeaderLink>
        </li>
        <HeaderLink
          href='/webinars-events'
          active={pathname === '/webinars-events'}
        >
          <li
            className='text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]'
            onClick={handleMenu}
          >
            Webinars & Events
          </li>
        </HeaderLink>
        <HeaderLink href='/about-us' active={pathname === '/about-us'}>
          <li
            className='text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]'
            onClick={handleMenu}
          >
            About Us
          </li>
        </HeaderLink>
        <li
          className='text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]'
          onClick={handleMenu}
        >
          <HeaderLink href='/contact-us' active={pathname === '/contact-us'}>
            Contact Us
          </HeaderLink>
        </li>
        <li
          className='text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]'
          onClick={handleMenu}
        >
          <HeaderLink href='/login' active={pathname === '/login'}>
            Sign in
          </HeaderLink>
        </li>
      </ul>
    </div>
  );
};

export default HeaderLinksMobile;

interface HeaderLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

function HeaderLink({ href, active, children }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'transition-colors hover:text-gray-900',
        active ? 'text-[#151515] font-semibold' : 'text-gray-500'
      )}
    >
      {children}
    </Link>
  );
}
