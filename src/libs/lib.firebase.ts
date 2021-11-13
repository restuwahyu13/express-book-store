import * as firebase from 'firebase-admin'
import * as config from '@configs/firebase.json'
import { BookStoreError } from '@helpers/helper.error'

export async function sendNotification(title: string, body: string, data: Record<string, any>, tokens: string[]): Promise<any> {
  try {
    const notification: firebase.messaging.MulticastMessage = { notification: { title, body }, data, tokens }
    const res: firebase.messaging.BatchResponse = await firebase.messaging().sendMulticast(notification)
    return res
  } catch (e: any) {
    return Promise.reject(new BookStoreError(`Firebase notification error: ${e.message}`))
  }
}

;(function () {
  const firebaseConfig = config as firebase.ServiceAccount
  firebase.initializeApp({ credential: firebase.credential.cert(firebaseConfig) })
})()
