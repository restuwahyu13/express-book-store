export const secondToDays = (second: number): number => {
  const secondFirst = second / 24
  return Math.abs(secondFirst / 60 / 60)
}
