import bcryptjs from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {
  return bcryptjs.hash(password, bcryptjs.genSaltSync(20))
}

export const comparePassword = (password: string, hashPassword: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    await bcryptjs.compare(password, hashPassword, (error, success) => resolve({ error, success }))
  })
}
