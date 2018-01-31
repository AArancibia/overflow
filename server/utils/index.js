export const handleError = (error, res) => {
  res.status(500).json({
    mesage: 'An error ocured',
    error
  })
}
