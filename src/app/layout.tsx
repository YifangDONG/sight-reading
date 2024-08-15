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
        <div>
          <header></header>
          <main className="container lg flex-1 text-center">{children}</main>
        </div>
      </body>
    </html>
  )
}
