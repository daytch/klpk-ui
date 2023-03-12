import { ChangeEvent } from 'react'
import Router from 'next/router'

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
