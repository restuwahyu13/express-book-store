import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import { BookStoreError } from '@helpers/helper.error'

export const renderTemplate = async (to: string, token: string, templateName: string): Promise<string | boolean> => {
  try {
    const url: string = process.env.URL || ''
    const dirname: string = path.resolve(__dirname, `../templates/${templateName}.ejs`)

    if (fs.existsSync(dirname)) {
      const html: string = ejs.renderFile(dirname, (err: any, str: string): any => {
        if (!err) return str
      })
      const res: string = await ejs.render(html, { to, token, url }, { async: true, beautify: true })
      return res
    } else {
      return false
    }
  } catch (err: any) {
    return Promise.reject(new BookStoreError('Render template from ejs failed'))
  }
}
