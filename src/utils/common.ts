import { ChangeEvent } from 'react'

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
