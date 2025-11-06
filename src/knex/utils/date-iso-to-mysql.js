export const dateIsoToMySQL = (dateISOString) => {
  const dateArg = new Date(dateISOString || null).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium'
  })

  const [date, time] = dateArg.split(' ')
  const [day, month, year] = date.split('/')

  return `${year}-${month}-${day} ${time}`
}