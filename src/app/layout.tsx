import Navbar from '@/components/Navbar'
import '../styles/global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TanstackProvider from '@/components/TanstackProviders'
import ScrollToTop from '@/components/ScrollToTop'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog',
  description: 'CRUD on blog site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <ScrollToTop />
          <ToastContainer />
          <div className='bg'>
            <div className='gradient' />
          </div>
          <main className='main'>
            <Navbar />
            {children}
          </main>
        </TanstackProvider>
      </body>
    </html>
  )
}
