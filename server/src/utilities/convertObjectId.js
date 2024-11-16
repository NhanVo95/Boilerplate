import { ObjectId } from 'mongodb'

export const convertObjectId = (id) => {
  if (typeof id === 'object') {
    return id
  } else if (ObjectId.isValid(id)) {
    if (String(ObjectId.createFromHexString(id)) === id) return ObjectId.createFromHexString(id)
  } else {
    throw new Error('Your ID fails to match the Object Id pattern!')
  }
}
