import React from 'react';

interface AuthProps {
  children: React.ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  return (
    <main className='flex min-h-screen'>
      {/* left side */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-8'>
        {children}
      </div>
      {/* right side - success message */}
      <div className='hidden md:flex w-1/2 h-[100vh] bg-[url(/images/auth-background.svg)] bg-cover bg-no-repeat bg-center'></div>
      {/* <div className='hidden relative md:flex w-1/2 h-[100vh] border z-10'>
      <div className='absolute top-0 -left-40 w-full h-full bg-[url(/images/auth-background.svg)] bg-cover bg-no-repeat bg-center z-50'></div>
      </div> */}
    </main>
  );
};

export default Auth;
