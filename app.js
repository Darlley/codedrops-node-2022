const express = require('express');
const {randomUUID} = require('crypto');
const fs = require('fs')

const app = express();
app.use(express.json());

let products = [];

fs.readFile('products.json', "utf-8", (err, data) => {
  if(err){
    console.log(err)
  }else{
    products = JSON.parse(data)
  }
})

app.post('/products', (request,response) => {
  const {name,price} = request.body;
  
  const product = {
    id: randomUUID(),
    name,
    price
  }

  products.push(product);

  createProductsFile(products, `O produto '${product.name}' foi inserido!`)

  return response.json(product)
})

app.get('/products', (request, response) => {
  return response.json(products)
})

app.get('/products/:id', (request, response) => {
  const {id} = request.params;

  const product = products.find((currentProduct) => currentProduct.id === id)

  return response.json(product)
})

app.put('/products/:id', (request,response) => {
  const {id} = request.params;
  const {name,price} = request.body;

  const indexProduct = products.findIndex((currentProduct) => currentProduct.id === id)

  products[indexProduct] = {
    ...products[indexProduct],
    name,
    price
  }

  const product_name = products[indexProduct].name

  createProductsFile(products, `O produto '${product_name}' foi alterado com sucesso!`)

  return response.json({
    message: `O produto '${product_name}' foi alterado com sucesso!`
  })
})

app.delete('/products/:id', (request,response) => {
  const {id} = request.params;

  const indexProduct = products.findIndex((currentProduct) => currentProduct.id === id)
  
  const product_name = products[indexProduct].name
  
  products.splice(indexProduct,1)

  createProductsFile(products, `O produto '${product_name}' foi deletado!`)

  return response.json({
    message: `O produto '${product_name}' foi deletado!`
  })
})

function createProductsFile(data, message){
  fs.writeFile('products.json', JSON.stringify(data), (error) => {
    if(error){
      return console.log(error)
    }

    console.log(message)
  })
}

app.listen(4002, () => console.log('Server is running at http://localhost:4002'));
