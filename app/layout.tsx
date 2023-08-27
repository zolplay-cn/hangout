import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { MovingGradients } from '@/app/MovingGradients'

const fontSans = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '2023佐玩首届开发者交流会',
  description:
    '在深圳与优秀的开发者们面对面交流，我们有咖啡有点心，还有满满的技术八卦等你来听。赶紧加入我们的大家庭，认识一下社区里的各路英雄好汉！',
  metadataBase: new URL('https://hangout.zolplay.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${fontSans.className} bg-[#6126b5] relative`}>
        <MovingGradients />
        <main className="flex min-h-screen relative z-20 flex-col items-center justify-between p-10 md:p-16 lg:p-24 text-zinc-100">
          {children}
        </main>
      </body>
    </html>
  )
}
