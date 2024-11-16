export const joinStrings = (
  separator: string,
  ...strings: string[]
): string => {
  return strings.join(separator)
}
