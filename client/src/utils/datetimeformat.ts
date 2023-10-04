export const showTime = (D: string) => {
  const t = new Date(D)
  return `${String(t.getHours()).padStart(2, "0")}:${String(
    t.getMinutes()
  ).padStart(2, "0")}`
}
