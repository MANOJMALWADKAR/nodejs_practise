const express = require('express')
const app = express()
const { products } = require('./data')
app.get('/', (req, res) => {
  //sending json data as response
  res.status(200).json(products)
  // res.status(500).json({ error: 'message' })
  // res.status(200).json(products)
  // res.status(200).json([{ name: 'manoj', food: 'paratha' }, { name: 'pratik', food: 'pizza' }])

})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
