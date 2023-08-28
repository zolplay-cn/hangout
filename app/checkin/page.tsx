'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Scanner from 'qr-scanner'
import * as Dialog from '@radix-ui/react-dialog'

type CheckInResponse = {
  code: string
  name?: string
  order?: number
}

export default function PageCheckIn() {
  const containerRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<Scanner | null>(null)
  const scannerReadyRef = useRef(true)
  const [dialogData, setDialogData] = useState<CheckInResponse | null>(null)

  const doCheckIn = useCallback(async (code: string) => {
    setDialogData({ code })
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        body: JSON.stringify({ code: code }),
      })
      const { user, order } = await res.json()

      setDialogData({ code, name: user, order })
    } catch (error) {
      console.error(error)
      setDialogData(null)
    }
  }, [])

  const onScanned = useCallback(
    async (result: Scanner.ScanResult) => {
      const code = result.data
      if (!code || !scannerRef.current || !scannerReadyRef.current) return

      try {
        scannerReadyRef.current = false
        await doCheckIn(code)
      } catch (error) {
        console.error(error)
      }
    },
    [doCheckIn]
  )

  useEffect(() => {
    if (!containerRef.current) return
    const scanner = new Scanner(containerRef.current, onScanned, {
      returnDetailedScanResult: true,
      highlightCodeOutline: true,
      highlightScanRegion: true,
      maxScansPerSecond: 10,
    })
    scanner.start()

    scannerRef.current = scanner

    return () => {
      scanner.stop()
      scanner.destroy()
      scannerRef.current = null
    }
  }, [onScanned])

  return (
    <div className="flex flex-col h-full grow">
      <video ref={containerRef} id="scanner" className="fixed inset-0 h-full" />
      {dialogData && (
        <Dialog.Root open>
          <Dialog.Portal>
            <Dialog.Content className="fixed inset-0 z-30 flex items-center justify-center">
              <div className="bg-white w-[90vw] h-[40vh] rounded-lg shadow-2xl p-4 text-center flex flex-col">
                <section className="mt-12">
                  {dialogData.name && dialogData.order ? (
                    <>
                      <p className="text-xs">第 {dialogData.order} 位</p>
                      <p className="font-[900] text-8xl ">{dialogData.name}</p>
                      <p className="font-semibold text-zinc-500 mt-4 text-sm">
                        {dialogData.code}
                      </p>
                    </>
                  ) : (
                    <div>...</div>
                  )}
                </section>
                <button
                  className="mt-auto bg-green-400/80 rounded-lg text-white py-2"
                  onClick={() => {
                    setDialogData(null)
                    scannerReadyRef.current = true
                  }}
                >
                  下一位
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  )
}
