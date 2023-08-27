'use client'

import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export const runtime = 'edge'

type Winner = {
  code: string
  name: string
}
export default function GiveawayPage() {
  const [pickedCodes, setPickedCodes] = React.useState<string[]>([])
  const [winner, setWinner] = React.useState<Winner | null>(null)
  const [showConfetti, setShowConfetti] = React.useState(false)
  const pickWinner = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch('/api/giveaway', {
      method: 'POST',
      body: JSON.stringify({ pickedCodes }),
    })
    const { winner } = await response.json()
    setPickedCodes((prev) => [...prev, winner.code])
    setWinner(winner)
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 4000)
  }
  const { width, height } = useWindowSize()
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
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

      {winner && (
        <section>
          <h2 className="text-8xl text-sky-200/90 tracking-tight font-mono font-black text-center">
            {winner.code}
          </h2>
          <p className="text-lg text-zinc-100/80 tracking-tight font-semibold text-center">
            {winner.name}
          </p>
        </section>
      )}

      <form onSubmit={pickWinner}>
        <button
          className="px-10 lg:px-12 py-3 text-lg font-bold bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.zinc.50)_0%,theme(colors.zinc.800)_10%,theme(colors.zinc.50)_20%)] animate-[shimmer_2.5s_linear_infinite] rounded-[24px] relative after:flex after:absolute after:bg-zinc-50 after:inset-[2px] after:rounded-[22px] after:content-[attr(aria-label)] after:text-zinc-800 after:items-center after:justify-center transform-gpu hover:scale-[1.02] transition-transform"
          aria-label="抽取幸运儿"
          rel="noopener noreferrer"
          type="submit"
        >
          <span className="opacity-0">抽取幸运儿</span>
        </button>
      </form>
    </>
  )
}