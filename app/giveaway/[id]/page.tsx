'use client'

import { EventGuard } from '@/components/EventGuard'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import React from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { toast } from 'sonner'

export const runtime = 'edge'

const ANIMATION_DURATION = 5
const ANIMATION_RATE = 8
const ANIMATION_COUNT_MAX = ANIMATION_DURATION * ANIMATION_RATE

const getRandomCodePool = () => {
  const getRandomChar = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return characters.charAt(Math.floor(Math.random() * characters.length))
  }
  const getRandomCode = () => {
    return getRandomChar() + getRandomChar() + getRandomChar()
  }
  return new Array(ANIMATION_COUNT_MAX + 1).fill(null).map(getRandomCode)
}

type Winner = {
  code: string
  name: string
}
export default function GiveawayPage({ params }: { params: { id: string } }) {
  const [pickedCodes, setPickedCodes] = React.useState<string[]>([])
  const [winner, setWinner] = React.useState<Winner | null>(null)
  const [showConfetti, setShowConfetti] = React.useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)

  const [randomCodePool, setRandomCodePool] = React.useState(
    getRandomCodePool()
  )
  const animationCount = useMotionValue(0)
  const animationCode = useTransform(animationCount, (count) =>
    count === 0 ? '???' : randomCodePool[Math.round(count)]
  )

  const pickWinner = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsButtonDisabled(true)
    animationCount.set(0)
    setRandomCodePool(getRandomCodePool())

    const response = await fetch('/api/giveaway', {
      method: 'POST',
      body: JSON.stringify({ pickedCodes, event: params.id }),
    })
    const { winner } = await response.json()

    if (response.status !== 200 || !winner) {
      toast.error('抽奖失败🤡')
      setIsButtonDisabled(false)
      return
    }

    await animate(animationCount, ANIMATION_COUNT_MAX, {
      duration: ANIMATION_DURATION,
    })

    setPickedCodes((prev) => [...prev, winner.code])
    setWinner(winner)
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      setIsButtonDisabled(false)
    }, 4000)
  }

  const { width, height } = useWindowSize()
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <EventGuard eventId={params.id} checkWith="allowGiveaway" />
      {isMounted && showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={350}
          gravity={0.25}
          recycle={false}
        />
      )}

      <h1 className="text-4xl font-black">🎟️ 抽奖 🎟️</h1>

      <section>
        <motion.h2 className="text-8xl text-sky-200/90 tracking-tight font-mono font-black text-center">
          {animationCount.get() === ANIMATION_COUNT_MAX
            ? winner?.code
            : animationCode}
        </motion.h2>
        <p className="text-lg text-zinc-100/80 tracking-tight font-semibold text-center">
          {animationCount.get() === ANIMATION_COUNT_MAX ? winner?.name : '???'}
        </p>
      </section>

      <form onSubmit={pickWinner}>
        <button
          className="px-10 lg:px-12 py-3 text-lg font-bold bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.zinc.50)_0%,theme(colors.zinc.800)_10%,theme(colors.zinc.50)_20%)] animate-[shimmer_2.5s_linear_infinite] rounded-[24px] relative after:flex after:absolute after:bg-zinc-50 after:inset-[2px] after:rounded-[22px] after:content-[attr(aria-label)] after:text-zinc-800 after:items-center after:justify-center transform-gpu hover:scale-[1.02] transition-transform"
          aria-label="抽取幸运儿"
          rel="noopener noreferrer"
          type="submit"
          disabled={isButtonDisabled}
        >
          <span className="opacity-0">抽取幸运儿</span>
        </button>
      </form>
    </>
  )
}
