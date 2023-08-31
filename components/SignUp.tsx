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
import { FC } from 'react'

export const SignUp: FC<{ eventId: string }> = ({ eventId }) => {
  if (!eventId) return null

  return (
    <Dialog>
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
          <SignUpForm eventId={eventId} />
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

const SignUpForm: FC<{ eventId: string }> = ({ eventId }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: '',
      job: '',
      wechat: '',
      social: '',
    },
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit">提交</Button>
      </form>
    </Form>
  )
}
