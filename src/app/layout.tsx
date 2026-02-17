import Header from '@/components/Header';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Life Calendar - Visualize Your Weeks of Life',
  description:
    'Track your life week by week with the Life Calendar. Reflect on time passed and plan your future effectively.',
  keywords: [
    'life calendar',
    'your life in weeks',
    'life planner',
    'weeks lived',
    'productivity',
    'life tracker',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <ThemeProvider>
          <UserProvider>
            <Header />
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
