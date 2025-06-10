import { DM_Sans } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from "./client-layout"

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Complete Doctor',
  description: 'All-in-one platform for doctors preparing for MRCGP AKT, SCA, MSRA & PLAB exams.',
  icons: {
    icon: "/icons/complete-doc-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased relative`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
