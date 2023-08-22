import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

const fontSans = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '2023佐玩首届开发者交流会',
  description:
    '在深圳与优秀的开发者们面对面交流，我们有咖啡有点心，还有满满的技术八卦等你来听。赶紧加入我们的大家庭，认识一下社区里的各路英雄好汉！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${fontSans.className} bg-[#6126b5] relative`}>
        {children}
      </body>
    </html>
  )
}
