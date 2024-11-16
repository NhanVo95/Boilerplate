// ^.*              : Start
// (?=.{8,})        : Minimum length
// (?=.*[A-Z])      : Upper case letters
// (?=.*[a-z])      : Lower case letters
// (?=.*\d)         : Digits
// (?=.*[!#$%&? "]) : Special characters
// .*$              : End
export const PASSWORD_RULE = /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
export const PASSWORD_RULE_MESSAGE = 'Please create a stronger password.'

// Rule for Vietnamese phone number
export const PHONE_RULE =
  /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g
export const PHONE_RULE_MESSAGE =
  'Your Phone number fails to match the pattern!'

export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE =
  'Your string fails to match the Object Id pattern!'
