const hexToRgb = (hex: string, type: string): string | null => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16)
  if (isNaN(bigint)) {
    return null
  }

  let r = (bigint >> 16) & 255
  let g = (bigint >> 8) & 255
  let b = bigint & 255

  return `--color-${type}: ${r}, ${g}, ${b};`
}

const getAccessibleColor = (hex: string): string => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16)
  if (isNaN(bigint)) {
    return '#000000'
  }

  let r = (bigint >> 16) & 255
  let g = (bigint >> 8) & 255
  let b = bigint & 255

  // Calculate the luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black for light backgrounds and white for dark backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export { hexToRgb, getAccessibleColor }
