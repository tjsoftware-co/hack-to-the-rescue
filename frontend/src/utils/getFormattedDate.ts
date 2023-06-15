const getFormattedDate = (month: string, year: string) => {
  const intMonth = parseInt(month)
  const formattedYear = parseInt(year).toString()
  let formattedMonth = ""

  if (intMonth < 10) {
    formattedMonth = "0" + intMonth.toString()
  } else {
    formattedMonth = intMonth.toString()
  }

  return `${formattedMonth}-${formattedYear}`
}

export default getFormattedDate
