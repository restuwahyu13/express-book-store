import crypto from 'crypto'

export const randomToken = (): string => {
	return crypto.randomBytes(10).toString('hex')
}