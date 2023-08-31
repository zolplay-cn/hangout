'use client'

import { gradient } from '../../Gradient.js'
import { useEffect } from 'react'
import { LogoHelmet } from '@/components/LogoHelmet'
import Link from 'next/link'
import Image from 'next/image'
import Venue1 from '../1/venue_1.jpg'
import Venue2 from '../1/venue_2.jpg'
import { getEvent } from '@/app/event/events'
import { SignUp } from '@/components/SignUp'

const locationLink = 'https://surl.amap.com/fo5h75l189Rm'

export const runtime = 'edge'

const event = getEvent('2')
export default function Event() {
  useEffect(() => {
    gradient.initGradient('#gradient-canvas')
  }, [])

  return (
    <>
      <canvas
        id="gradient-canvas"
        className="fixed inset-0 w-full h-full [--gradient-color-1:#a405da] [--gradient-color-2:#05338f] [--gradient-color-3:#b28ef5] [--gradient-color-4:#6126b5] pointer-events-none select-none z-10"
        data-transition-in
      />

      <main className="flex min-h-screen relative z-20 flex-col items-center justify-between p-10 md:p-16 lg:p-24 text-zinc-100">
        <div className="z-10 max-w-5xl w-full items-center justify-end text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-[#6126b5] via-[#6126b5] lg:static lg:h-auto lg:w-auto lg:bg-none">
            <Link
              className="pointer-events-none text-lg font-semibold flex place-items-center p-8 lg:pointer-events-auto lg:p-0 hover:opacity-80 transition-opacity"
              href="https://x.com/zolplay"
              target="_blank"
              rel="noopener noreferrer"
            >
              𝕏 / Twitter
            </Link>
          </div>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] py-16 text-center flex-col">
          <Link
            href="https://zolplay.com?utm_source=Zolplay+Hangout"
            target="_blank"
            className="opacity-80 hover:opacity-100"
          >
            <LogoHelmet className="w-12 lg:w-16 h-12 lg:h-16 mix-blend-overlay text-white drop-shadow-xl" />
          </Link>

          <h2 className="z-20 text-4xl lg:text-6xl tracking-tight mix-blend-overlay font-bold select-none flex flex-col py-5 space-y-1.5 items-center w-full [text-shadow:rgba(67,28,170,0.3)_6px_6px_12px]">
            <span className="text-2xl lg:text-4xl tracking-wide opacity-70">
              2023佐玩第二届
            </span>

            <span>
              <span className="bg-clip-text text-transparent from-sky-300 to-[#F0B6FD] bg-gradient-to-br">
                开发者
              </span>
              交流会
            </span>
          </h2>
        </div>

        <div className="mb-32 flex items-center flex-col text-center lg:max-w-5xl lg:w-full lg:mb-20 lg:grid-cols-4 lg:text-left">
          {event?.allowSignUp ? (
            <SignUp eventId={event.id} />
          ) : (
            <span className="select-none text-zinc-100/60">报名已结束</span>
          )}
        </div>

        <div className="mx-auto max-w-lg">
          <h1 className="font-semibold text-sky-200">开发者交流会</h1>
          <p className="mt-3 text-xl font-semibold tracking-tight text-white">
            在深圳与优秀的开发者们面对面交流
          </p>
          <div className="mt-6 space-y-6 text-sm/6 text-zinc-50/80">
            <p>
              来和众多互联网行业内的开发者和设计师一起聊天！我们有咖啡有点心，还有满满的技术八卦等你来听。赶紧加入我们的大家庭，认识一下社区里的各路英雄好汉！
            </p>
          </div>
          <section className="mt-10">
            <h2 className="sr-only">交流会细节</h2>
            <dl className="border-t border-dashed border-white/30 text-sm/6">
              <div className="border-b border-dashed border-white/30 py-4 sm:flex">
                <dt className="flex items-start gap-x-3 pr-6 font-semibold text-white sm:w-2/5 sm:flex-none">
                  <div className="flex-none rounded-full bg-zinc-100 ring-1 ring-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 fill-black/70"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 18s5-4.239 5-7a5 5 0 0 0-10 0c0 2.761 5 7 5 7Zm0-5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  方位
                </dt>
                <dd className="mt-1 pl-9 text-zinc-100 sm:mt-0 sm:w-3/5 sm:flex-none sm:pl-0">
                  <a
                    className="hover:text-zinc-50 hover:underline"
                    target="_blank"
                    href={locationLink}
                  >
                    CM 书咖（深圳湾店）3F
                  </a>
                  <br />
                  <span className="text-zinc-100/80">2/8号线湾厦 A 出口</span>
                </dd>
              </div>
              <div className="border-b border-dashed border-white/30 py-4 sm:flex">
                <dt className="flex items-start gap-x-3 pr-6 font-semibold text-white sm:w-2/5 sm:flex-none">
                  <div className="flex-none rounded-full bg-zinc-100 ring-1 ring-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 fill-black/70"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H8Zm0 4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H8Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  时间
                </dt>
                <dd className="mt-1 pl-9 text-zinc-100 sm:mt-0 sm:w-3/5 sm:flex-none sm:pl-0">
                  <time dateTime="2023-09-10T14:00+08:00">
                    北京时间 2023年9月10日 星期日
                    <br />
                    <span className="text-zinc-100/80">2:00 PM - 5:00 PM</span>
                  </time>
                </dd>
              </div>
              <div className="border-b border-dashed border-white/30 py-4 sm:flex">
                <dt className="flex items-start gap-x-3 pr-6 font-semibold text-white sm:w-2/5 sm:flex-none">
                  <div className="flex-none rounded-full bg-zinc-100 ring-1 ring-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 fill-black/70"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1a2 2 0 1 0 0 4v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1a2 2 0 1 0 0-4V9Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  门票
                </dt>
                <dd className="mt-1 pl-9 text-zinc-100 sm:mt-0 sm:w-3/5 sm:flex-none sm:pl-0">
                  ¥60/人（场地最多容纳70人）
                  <br />
                  <span className="text-zinc-100/80">咖啡和点心免费供应</span>
                </dd>
              </div>
            </dl>
          </section>
          <section className="mt-10">
            <h2 className="sr-only">日程安排</h2>
            <ul role="list">
              <li className="group relative flex flex-col pb-8 pl-7 last:pb-0">
                <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-white/30 group-first:top-3"></div>
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-300 bg-zinc-50"></div>
                <h3 className="mt-2 text-sm/6 font-semibold text-white">
                  入场
                </h3>
                <p className="order-first text-2xs/6 font-semibold text-sky-200">
                  <time dateTime="2023-09-10T13:30+08:00">1:30 PM</time>-{' '}
                  <time dateTime="2023-09-10T14:30+08:00">2:00 PM</time>
                </p>
                <p className="mt-0.5 text-sm/6 text-zinc-200/80">
                  早点儿来，领取我们精心准备的周边，喝口咖啡，吃个小蛋糕，你负责享受，我们负责买单，跟其他提前到的朋友们先聊聊天。
                </p>
              </li>
              <li className="group relative flex flex-col pb-8 pl-7 last:pb-0">
                <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-white/30 group-first:top-3"></div>
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-300 bg-zinc-50"></div>
                <h3 className="mt-2 text-sm/6 font-semibold text-white">
                  佐玩 Keynote
                </h3>
                <p className="order-first text-2xs/6 font-semibold text-sky-200">
                  <time dateTime="2023-09-10T14:00+08:00">2:00 PM</time>-{' '}
                  <time dateTime="2023-09-10T14:30+08:00">2:30 PM</time>
                </p>
                <p className="mt-0.5 text-sm/6 text-zinc-200/80">
                  佐玩创始人 CEO —— Cali Castle
                  给大家分享一下佐玩是谁，为什么举办这次的开发者交流会，以及佐玩现有的项目。
                </p>
              </li>
              <li className="group relative flex flex-col pb-8 pl-7 last:pb-0">
                <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-white/30 group-first:top-3"></div>
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-200 bg-zinc-50"></div>
                <h3 className="mt-2 text-sm/6 font-semibold text-white">
                  自由交流
                </h3>
                <p className="order-first text-2xs/6 font-semibold text-sky-200">
                  <time dateTime="2023-09-10T14:30+08:00">2:30 PM</time>-{' '}
                  <time dateTime="2023-09-10T16:45+08:00">4:45 PM</time>
                </p>
                <p className="mt-0.5 text-sm/6 text-zinc-200/80">
                  花点时间，边吃着手工小点心、边喝点上等的自制咖啡，与社区的大佬们拉拉近乎，搞搞关系！今天，就是来交朋友的~
                </p>
              </li>
              <li className="group relative flex flex-col pb-8 pl-7 last:pb-0">
                <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-white/30 group-first:top-3"></div>
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-200 bg-zinc-50"></div>
                <h3 className="mt-2 text-sm/6 font-semibold text-white">
                  大抽奖
                </h3>
                <p className="order-first text-2xs/6 font-semibold text-sky-200">
                  <time dateTime="2023-09-10T16:45+08:00">4:45 PM</time>-{' '}
                  <time dateTime="2023-09-10T17:00+08:00">5:00 PM</time>
                </p>
                <p className="mt-0.5 text-sm/6 text-zinc-200/80">
                  我们精心准备了 Apple TV 4K、HomePod
                  mini 与 Nothing Ear (2) 赶紧化身幸运儿，祝大家好运气！（抽奖活动仅限现场通过门票编号参与）
                </p>
              </li>
            </ul>
          </section>

          <section className="mt-10 border-t border-dashed border-white/30 pt-10">
            <h2 className="text-2xs/6 font-semibold uppercase text-sky-200">
              场地照片
            </h2>
            <div className="mt-6 flex w-full gap-6 md:gap-3 md:flex-row flex-col">
              {[Venue1, Venue2].map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt=""
                  className="w-full md:w-64 h-auto rounded-xl shadow-2xl"
                  priority
                />
              ))}
            </div>
          </section>

          <section className="mt-10 border-t border-dashed border-white/30 pt-10 pb-32 lg:pb-8">
            <h2 className="text-2xs/6 font-semibold uppercase text-sky-200">
              FAQs
            </h2>
            <ul role="list" className="mt-6 space-y-6">
              <li>
                <h3 className="text-sm/6 font-semibold text-white">
                  这次活动可以线上参与吗？
                </h3>
                <p className="mt-1 text-sm/6 text-zinc-200/80">
                  本次活动仅限线下参与，不提供线上直播。
                </p>
              </li>
              <li>
                <h3 className="text-sm/6 font-semibold text-white">
                  为什么要收费？
                </h3>
                <p className="mt-1 text-sm/6 text-zinc-200/80">
                  本次活动的门票收入将用于支付场地费用、咖啡和点心费用，抽奖奖品均由佐玩提供赞助。我们已经尽可能的降低了门票价格，希望大家能够理解。
                </p>
              </li>
              <li>
                <h3 className="text-sm/6 font-semibold text-white">
                  报名后多久可以收到门票？
                </h3>
                <p className="mt-1 text-sm/6 text-zinc-200/80">
                  因为本次活动的门票数量有限，所以我们需要对报名者进行筛选，如果你的报名信息通过审核，我们将在
                  24 小时内发送门票到你的微信。先到先得哟！
                </p>
              </li>
              <li>
                <h3 className="text-sm/6 font-semibold text-white">
                  门票是否可退？
                </h3>
                <p className="mt-1 text-sm/6 text-zinc-200/80">
                  门票一经售出，不可退款。如果您无法参加，可以将门票转让给其他人。
                </p>
              </li>
              <li>
                <h3 className="text-sm/6 font-semibold text-white">
                  我可以带朋友一起来吗？
                </h3>
                <p className="mt-1 text-sm/6 text-zinc-200/80">
                  每个人只能购买一张门票，如果您想邀请朋友一起来，可以让朋友自行购买报名门票。
                </p>
              </li>
              <li>
                <h3 className="text-sm/6 font-semibold text-white">
                  如果我有其他问题，可以联系谁？
                </h3>
                <p className="mt-1 text-sm/6 text-zinc-200/80">
                  你可以通过邮件或者 𝕏 / Twitter 联系我们：
                  <a
                    href="mailto:cali@zolplay.com"
                    className="text-white hover:underline"
                  >
                    cali@zolplay.com
                  </a>{' '}
                  或{' '}
                  <a
                    href="https://x.com/zolplay"
                    target="_blank"
                    className="text-white hover:underline"
                  >
                    𝕏 / Twitter
                  </a>
                  .
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}
