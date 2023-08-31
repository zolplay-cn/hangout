'use client'
import { EventGuard } from '@/app/_components/EventGuard'
import * as Dialog from '@radix-ui/react-dialog'
import { useCallback, useRef, useState } from 'react'
import { useZxing } from 'react-zxing'
import { toast } from 'sonner'
type CheckInResponse = {
  code: string
  name?: string
  order?: number
}

export default function CheckInPage({ params }: { params: { id: string } }) {
  const scannerReadyRef = useRef(true)
  const [dialogData, setDialogData] = useState<CheckInResponse | null>(null)

  const doCheckIn = useCallback(async (code: string) => {
    setDialogData({ code })
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        body: JSON.stringify({ code: code, event: params.id }),
      })

      if (res.status !== 200) {
        const { message } = await res.json()
        toast.error(message)
        throw new Error(res.status.toString())
      }
      const { user, order } = await res.json()

      setDialogData({ code, name: user, order })
    } catch (error) {
      console.error(error)
      setDialogData(null)
    }
  }, [])

  const onScanned = useCallback(
    async (code: string) => {
      if (!code || !scannerReadyRef.current) return

      try {
        scannerReadyRef.current = false
        await doCheckIn(code)
      } catch (error) {
        console.error(error)
      }
    },
    [doCheckIn]
  )

  const { ref } = useZxing({
    onDecodeResult(result) {
      void onScanned(result.getText())
    },
  })

  return (
    <div className="flex flex-col h-full grow">
      <EventGuard eventId={params?.id} checkWith={'allowCheckIn'} />
      <video
        ref={ref}
        id="scanner"
        className="rounded-xl border-2 border-zinc-50/30"
      />
      {dialogData && (
        <Dialog.Root open>
          <Dialog.Portal>
            <Dialog.Content className="fixed inset-0 z-30 flex items-center justify-center">
              <div className="bg-white w-[90vw] h-[40vh] rounded-lg shadow-2xl p-4 text-center flex flex-col">
                <section className="mt-12">
                  {dialogData.name && dialogData.order ? (
                    <>
                      <p className="text-xs">第 {dialogData.order} 位</p>
                      <p className="font-bold text-6xl truncate tracking-tighter">
                        {dialogData.name}
                      </p>
                      <p className="font-semibold text-zinc-500 mt-4 text-sm">
                        {dialogData.code}
                      </p>
                    </>
                  ) : (
                    <div className="flex justify-center" role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-[#AF91EB]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </section>
                <button
                  className="mt-auto bg-indigo-600 rounded-lg text-white py-2"
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
