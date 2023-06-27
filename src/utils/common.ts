import { ChangeEvent } from 'react'
import Router from 'next/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'
import { ProfilePhotoDataModel } from '@/interfaces/profile'
import { TransactionHistoryStatus } from '@/interfaces/transaction'

dayjs.locale('id')
dayjs.extend(relativeTime)

export function joinClass(...args: Array<string | boolean | undefined>) {
  return args
    .filter((str) => typeof str === 'string')
    .join(' ')
    .trim()
}

export function changePhoneNumberFormat(phoneNumber: string) {
  const removePlus = phoneNumber.replace('+', '')
  if (removePlus.slice(0, 2) === '62') {
    return `0${removePlus.slice(2)}`
  }
  return removePlus
}

export function formatMoney(amout: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amout)
}

export function formatNumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function createImagePreview(e: ChangeEvent<HTMLInputElement>) {
  const imageFiles = e.target.files
  const imageFilesLength = imageFiles?.length

  if (!imageFilesLength) return ''

  const imageSrc = URL.createObjectURL(imageFiles[0])
  return imageSrc
}

export function createNumberArray(
  min: number,
  max: number,
  step: number
): number[] {
  const result: number[] = []

  for (let i = min; i <= max; i += step) {
    result.push(i)
  }

  // Sort the array in ascending order
  result.sort((a, b) => a - b)

  return result
}

export function authGuardAction(token: string, callback: () => void) {
  if (!token || !token.length) {
    return Router.push('/auth/login')
  } else {
    callback()
  }
}

export function selectUserPhotos(
  type: 'avatar' | 'cover',
  photos: ProfilePhotoDataModel[]
) {
  if (!photos.length) return ''
  const selectedType = photos.find((photo) => photo.type === type)
  return selectedType !== undefined ? selectedType.url : ''
}

export async function sanitizeHTML(html: string) {
  const DOMPurify = (await import('dompurify')).default
  return DOMPurify.sanitize(html)
}

export function createTableTextTransactionHistory(
  status: TransactionHistoryStatus,
  metadata: string,
  amount?: number
) {
  if (!metadata.length) return ''
  let textResult = ''
  const parseMetadata = JSON.parse(metadata)
  switch (status) {
    case 'topup':
      textResult = `Topup ${
        parseMetadata?.product?.topupRequestAmount ?? ''
      } koin`
      break

    case 'bookPurchase':
      textResult = `Pembelian Buku - ${
        parseMetadata?.product?.bookTitle ?? ''
      } ${amount} koin`
      break

    case 'chapterPurchase':
      textResult = `Pembelian ${parseMetadata?.product?.chapterName ?? ''} - ${
        parseMetadata?.product?.bookTitle ?? ''
      } ${amount} koin`
      break

    case 'withdraw':
      textResult = `Withdraw ${
        parseMetadata?.withdrawAmount ?? ''
      } koin -> ${formatMoney(Number(parseMetadata?.withdrawPrice ?? 0))}`
      break

    case 'withdrawRejection':
      textResult = `Withdraw Ditolak ${
        parseMetadata?.withdrawAmount ?? ''
      } koin -> ${formatMoney(Number(parseMetadata?.withdrawPrice ?? 0))}`
      break

    case 'bookSales':
      textResult = `Penjualan Buku "${
        parseMetadata?.product?.bookTitle ?? ''
      }" oleh "${parseMetadata?.customer?.fullName ?? ''}" -> ${
        amount ?? 0
      } koin`
      break

    case 'chapterSales':
      textResult = `Penjualan Bab "${
        parseMetadata?.product?.chapterName ?? ''
      }" oleh "${parseMetadata?.customer?.fullName ?? ''}" -> ${
        amount ?? 0
      } koin`
      break

    default:
      textResult = ''
      break
  }

  return textResult
}

export function formatDate(date: string | Date, format = 'DD MMMM YYYY') {
  if (!dayjs(date).isValid()) return ''
  return dayjs(date).format(format)
}

export function createRelativeTime(date: string) {
  return dayjs(date).fromNow()
}

export function createNotificationTitle(type: string) {
  let title = ''
  if (type.toLocaleLowerCase().includes('book')) {
    title = 'Buku'
  } else if (type.toLocaleLowerCase().includes('topup')) {
    title = 'Topup'
  } else {
    title = 'Pesan'
  }
  return title
}
