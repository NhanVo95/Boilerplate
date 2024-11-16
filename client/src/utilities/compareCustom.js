const twoStrings = (strA, strB) => {
  let strAFixed = strA.replace(/\s+/g, '').toLowerCase()
  let strBFixed = strB.replace(/\s+/g, '').toLowerCase()

  return strAFixed === strBFixed
}

const twoObjects = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB)
}

export const compare = { twoObjects, twoStrings }
