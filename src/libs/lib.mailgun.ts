import { BookStoreError } from '@/helpers/helper.error'
import { NodeMailgun } from 'ts-mailgun'

export const sendMail = async (to: string, suject: string, template: string): Promise<any> => {
  try {
    const mailgun = new NodeMailgun(process.env.MAILGUN_KEY as string) as NodeMailgun
    const res = (await mailgun.send(to, suject, template)) as Promise<any>
    return res
  } catch (e: any) {
    return Promise.reject(new BookStoreError(`Sending email error: ${e.message}`))
  }
}
