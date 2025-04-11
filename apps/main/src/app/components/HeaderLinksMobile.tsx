'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useModalStore from '@/lib/store/useModal'
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const HeaderLinksMobile = ({ className }: HeaderProps) => {
  const pathname = usePathname();

  const { closeMenu } = useModalStore()

  const handleMenu = () => {
    closeMenu()
  }

  return (
    <div
      className={cn(
        'w-full h-full sm:hidden items-center justify-center',
        className
      )}
    >
      <nav className='flex flex-col list-none gap-2.5'>
        <HeaderLink href='/' active={pathname === '/'}>
          <span className='text-base px-5 py-3 font-medium h-10 border-t' onClick={handleMenu}>
            Home
          </span>
        </HeaderLink>
        <HeaderLink href='/courses' active={pathname === '/courses'}>
          <span className='text-base px-5 py-3 font-medium h-10' onClick={handleMenu}>
            Courses
          </span>
        </HeaderLink>
        <HeaderLink
          href='/webinars-events'
          active={pathname === '/webinars-events'}
        >
          <span className='text-base px-5 py-3 font-medium h-10' onClick={handleMenu}>
            Webinars & Events
          </span>
        </HeaderLink>
        <HeaderLink href='/about-us' active={pathname === '/about-us'}>
          <span className='text-base px-5 py-3 font-medium h-10' onClick={handleMenu}>
            About Us
          </span>
        </HeaderLink>
        <HeaderLink href='/contact-us' active={pathname === '/contact-us'}>
          <span className='text-base px-5 py-3 font-medium h-10' onClick={handleMenu}>
            Contact Us
          </span>
        </HeaderLink>
        <HeaderLink href='/contact-us' active={pathname === '/contact-us'}>
          <span className='text-base px-5 py-3 font-medium h-10' onClick={handleMenu}>
            Sign in
          </span>
        </HeaderLink>
      </nav>
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
