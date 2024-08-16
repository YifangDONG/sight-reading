import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sight Reading',
  description: 'Application for piano sight reading training'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen items-center justify-center">
          <header></header>
          <main className="w-full max-w-full mx-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
