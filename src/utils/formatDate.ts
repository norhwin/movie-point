
export function formatDate(value: string): string {
  const d = new Date(value)
  if (isNaN(d.getTime())) return "Дата неизвестна"
  return d.toLocaleDateString("ru-RU", {day: "numeric", month:"long", year: "numeric"})
}