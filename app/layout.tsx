import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/Components/Ui/toast-container'
import Navbar from '@/Components/Ui/CORE-COMPONENT/navbar'
import Footer from '@/Components/Ui/CORE-COMPONENT/footer'


export const metadata: Metadata = {
  title: 'GTEL Shop',
  description: 'Premium mobile repairing tools and equipment shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
