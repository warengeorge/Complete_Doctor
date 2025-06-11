'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import HeaderLinks from './HeaderLinks';
import useModalStore from '@/lib/store/useModal';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useUserStore } from '../../../store/userStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { openMenu } = useModalStore();
  const router = useRouter();
  const { logoutUser } = useUserStore();
  const currentUser = useUserStore((state) => state.currentUser);

  const handleMenu = () => {
    openMenu();
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  return (
    <div className='flex justify-between items-center px-5 py-[30px] lg:px-20 w-full h-[86px] lg:h-20 bg-white'>
      {/* Logo */}
      <Link href='/' className='lg:hidden'>
        <Image
          src='/icons/complete-doc-logo.svg'
          alt='logo'
          width={125}
          height={26}
          
        />
      </Link>
      <Link href='/' className='hidden lg:block'>
        <Image
          src='/icons/complete-doc-logo.svg'
          alt='logo'
          width={160}
          height={40}
          
        />
      </Link>

      {/* Header Links */}
      <HeaderLinks />

      {/* Right Section */}
      <div className='flex justify-around md:justify-between items-center w-[4.406875rem] sm:w-[100px] md:w-[125px] lg:w-[250px] h-7 lg:h-8'>
        <span className='lg:p-2'>
          <Image src='/icons/cart.svg' alt='cart' width={18.75} height={15} />
        </span>
        <span className='sm:hidden' onClick={handleMenu}>
          <Image
            src='/icons/hamburger.svg'
            alt='menu'
            width={18.75}
            height={15}
          />
        </span>
        <Separator orientation='vertical' className='hidden md:block' />

        {/* Conditional Rendering: Avatar or Sign In Button */}
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='hidden sm:flex relative h-10 px-0'
              >
                <div className='flex items-center gap-2'>
                  <Image
                    src={`https://ui-avatars.com/api/?name=${currentUser.firstname}+${currentUser.lastname}`}
                    alt='User Avatar'
                    width={32}
                    height={32}
                    className='rounded-full'
                  />
                  <span className='hidden sm:block text-sm text-[#151515] font-semibold'>
                    {currentUser.firstname} {currentUser.lastname}
                  </span>
                </div>
                <span className='flex items-center justify-center w-[19px] h-[19px] border border-[#5C5C5C] rounded-full'>
                  <ChevronDown />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
              <DropdownMenuLabel className=''>
                <div className='flex flex-col items-start gap-2'>
                  <span className='text-sm text-[#151515] font-semibold'>
                    {currentUser.firstname} {currentUser.lastname}
                  </span>
                  <span className='text-xs text-[#898989]'>
                    {currentUser.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='dark:text-[#fafafa] hover:dark:bg-[#111827]'>
                My Courses
              </DropdownMenuItem>
              <DropdownMenuItem className='dark:text-[#fafafa] hover:dark:bg-[#111827]'>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='dark:text-[#fafafa] hover:dark:bg-[#111827]'
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href='/login'
            className='hidden sm:flex justify-center items-center text-white text-xs h-full px-4 bg-[#007AFF] rounded-xs'
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
