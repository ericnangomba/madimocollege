import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, Merriweather } from 'next/font/google';
import './globals.css';
import { LMSProvider } from '@/lib/store';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap'
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Madimo College of Missions | Online LMS & University Portal',
  description:
    'Equipping Christian servant-leaders, master educators, and tentmaking marketplace missionaries for Malawi and the nations. Launch Cohort: January 2027.',
  keywords: [
    'Madimo College',
    'Madimo College of Missions',
    'Malawi Christian University',
    'LMS Malawi',
    'Effective Teaching',
    'Educational Leadership',
    'Disciple Making Movements',
    'KNOW-BE-DO model',
    'Airtel Money LMS',
    'TNM Mpamba LMS'
  ],
  icons: {
    icon: '/madimo-logo.jpg',
    apple: '/madimo-logo.jpg'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${outfit.variable} ${merriweather.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-amber-200 selection:text-amber-900 font-sans">
        <LMSProvider>
          {children}
        </LMSProvider>
      </body>
    </html>
  );
}
