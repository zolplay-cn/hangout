'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FC, useState } from 'react'
import { toast } from 'sonner'

export const SignUp: FC<{ eventId: string }> = ({ eventId }) => {
  const [open, setOpen] = useState(false)
  if (!eventId) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="px-10 lg:px-12 py-3 text-lg font-bold bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.zinc.50)_0%,theme(colors.zinc.800)_10%,theme(colors.zinc.50)_20%)] animate-[shimmer_2.5s_linear_infinite] rounded-[24px] relative after:flex after:absolute after:bg-zinc-50 after:inset-[2px] after:rounded-[22px] after:content-[attr(aria-label)] after:text-zinc-800 after:items-center after:justify-center transform-gpu hover:scale-[1.02] transition-transform"
        aria-label="前往报名"
      >
        前往报名
      </DialogTrigger>
      <DialogContent className="w-[85vw] rounded-md md:w-auto">
        <DialogHeader>
          <DialogTitle className="mb-8 mt-2">
            本次活动因场地有限，设为邀请制，所以要填写以下内容噢，谢谢！
          </DialogTitle>
          <SignUpForm eventId={eventId} onSuccess={() => setOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const schema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, { message: '👀' })
    .max(10, { message: '太长了，10个字符以内吧' }),
  job: z
    .string()
    .trim()
    .min(1, { message: '👀' })
    .max(20, { message: '太长了' }),
  wechat: z
    .string()
    .trim()
    .min(1, { message: '拉群用的' })
    .max(30, { message: '这么长的昵称，张小龙知道吗' }),
  social: z.string().trim(),
})

const SignUpForm: FC<{ eventId: string; onSuccess: () => void }> = ({
  eventId,
  onSuccess,
}) => {
  const [isLoading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: '',
      job: '',
      wechat: '',
      social: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true)
      await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          event: eventId,
        }),
      })

      toast.success('报名成功~')
      onSuccess()
    } catch (error) {
      toast.error('报名出错~')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* 你的名字昵称</FormLabel>
              <FormControl>
                <Input placeholder="怎么称呼呢？" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* 你的职业</FormLabel>
              <FormControl>
                <Input
                  placeholder="开发者？设计师？产品经理？还是什么 👀"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wechat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* 你的微信号</FormLabel>
              <FormControl>
                <Input placeholder="方便入群～" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social"
          render={({ field }) => (
            <FormItem>
              <FormLabel>你的 Twitter/X/GitHub 用户名</FormLabel>
              <FormControl>
                <Input placeholder="如果有的话" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          提交
          {isLoading && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
        </Button>
      </form>
    </Form>
  )
}
