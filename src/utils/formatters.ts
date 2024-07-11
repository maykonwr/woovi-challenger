interface FormatCurrencyI {
  country?: string
  currency?: string
  value: string | number
}

export const formatCurrency = ({
  country = "pt-BR",
  currency = "BRL",
  value,
}: FormatCurrencyI): string => {
  const numberValue = Number(value) || 0
  return new Intl.NumberFormat(country, {
    style: "currency",
    currency,
  }).format(numberValue)
}

export const formatDate = (date: Date): string => {
  const timeFormat = new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "short",
  }).format(date)

  const dateFormat = new Intl.DateTimeFormat("pt-BR").format(date)

  return `${dateFormat} - ${timeFormat}`
}