'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface HeaderProps {
  className?: string;
}

const HeaderLinks = ({ className }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'hidden sm:flex items-center justify-between lg:w-auto lg:h-[36px]',
        className
      )}
    >
      <nav className='flex items-center lg:gap-[25px] list-none'>
        <HeaderLink href='/' active={pathname === '/'}>
          <span className='text-[0.625rem] md:text-[0.8125rem] p-2.5'>
            Home
          </span>
        </HeaderLink>
        <HeaderLink href='/courses' active={pathname === '/courses'}>
          <span className='text-[0.625rem] md:text-[0.8125rem] p-2.5'>
            Courses
          </span>
        </HeaderLink>
        <HeaderLink
          href='/webinars-events'
          active={pathname === '/webinars-events'}
        >
          <span className='text-[0.625rem] md:text-[0.8125rem] p-2.5'>
            Webinars & Events
          </span>
        </HeaderLink>
        <HeaderLink href='/about-us' active={pathname === '/about-us'}>
          <span className='text-[0.625rem] md:text-[0.8125rem] p-2.5'>
            About Us
          </span>
        </HeaderLink>
        <HeaderLink href='/contact-us' active={pathname === '/contact-us'}>
          <span className='text-[0.625rem] md:text-[0.8125rem] p-2.5'>
            Contact Us
          </span>
        </HeaderLink>
      </nav>
    </div>
  );
};

export default HeaderLinks;

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
