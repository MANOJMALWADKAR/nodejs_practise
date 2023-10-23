//this approach is example of ecommerse store like sending all products, sending products minimal info, whole info

const express = require('express')
const app = express()
const { products } = require('./data')

//sending to home page with link of '/api/products' so when user clicks on it, user gets all data
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1> <a href="/api/products">Products</a>')
})

//this will send whole data in one go in the josn format to this '/api/products url address
// app.get('/api/products', (req, res) => {
//     res.status(200).json(products)
// })

//here we are sending whole data with some properties like (id, name ,img) not (description,price)
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product
    return { id, name, image }
  })
  res.json(newProducts)
})


//here we are getting product info according to their id
app.get('/api/products/:productID', (req, res) => {
  //Route parameters  => fetching specific data or implementing custom behavior based on the parameter values.
  console.log(req.params) //req.params is an object in Express.js that contains route parameters
  const { productID } = req.params; //req.params fetch the :productID from the route

  const singleProduct = products.find((product) => product.id === +productID) // the id that we getting from req.params is string so first convert it

  if (!singleProduct) return res.send('product does not exist')

  return res.json(singleProduct)
})

//gives the reviewID
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params)
  res.send('Hello World')
})


//QUERY Param  (eg of search functionality)
//query parameter gives the ouput in key-value pair if the content is present after '?'
app.get('/api/v1/query', (req, res) => {
  //e.g -> '/api/v1/query?name=manoj&id=121  o/p -> {name:'manoj', id:'121'}
  // console.log(req.query) 
  const { search, limit } = req.query;
  let sortedProduct = [...products]

  if (search) {
    sortedProduct = sortedProduct.filter((product) => {
      return product.name.includes(search)  //name is comming from product.name = products = data.js
      // return product.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProduct = sortedProduct.slice(0, +(limit))
  }

  if (sortedProduct < 1) {
    return res.status(200).send('no products found matched search')
  }

  res.send(sortedProduct)
})


app.listen(5000, () => {
  console.log('server is listening on port 5000..')
})