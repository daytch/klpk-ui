export const passwordPattern = /^.*(?=.{8,})(?=.*[\d])(?=.*[\W]).*$/
export const phoneNumberPattern = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
export const usernamePattern =
  /^(?=[a-zA-Z0-9._]{6,32}$)(?!.*[_.]{2})[^_.].*[^_.]$/
export const NIKPattern = /^\d{16}$/
export const bankAccountPattern = /^[0-9]*$/
