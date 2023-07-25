import './globals.css'
import { Assistant } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const assistant = Assistant({ weight:"variable", subsets: ['latin'] })

export const metadata = {
  title: 'Alfonso\'s Resume GPT APP',
  description: 'SWE w/+7 years. EXP: PHP, Python, Typescript and LLMs.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={assistant.className + " h-full"}>{children}</body>
      <Analytics />
    </html>
  )
}
