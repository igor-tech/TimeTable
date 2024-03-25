export function randomInteger(number: number) {
  const rand = Math.random() * (number + 1)

  return Math.floor(rand)
}
