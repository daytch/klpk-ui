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
