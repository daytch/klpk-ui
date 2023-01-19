export const passwordPattern = /^.*(?=.{8,})(?=.*[\d])(?=.*[\W]).*$/
export const phoneNumberPattern = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
export const usernamePattern =
  /^(?=.{6,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.-])$/
