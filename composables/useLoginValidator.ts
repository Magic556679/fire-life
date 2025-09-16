import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, { message: '信箱為必填' }).email('請輸入正確的信箱'),
  password: z
    .string()
    .min(1, { message: '密碼為必填' })
    .min(6, { message: '密碼至少要6個字元' }),
})
