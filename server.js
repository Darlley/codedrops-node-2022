const http = require("http")

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" })

    if(request.url === '/produto'){
      return response.end(JSON.stringify({
        message: "Produto"
      }))
    }
    if(request.url === '/usuarios'){
      return response.end(JSON.stringify({
        message: "Usuários"
      }))
    }
    
    response.end(JSON.stringify({
      message: "Home"
    }))
  })
  .listen(4001, () => console.log("Server is running in http://localhost:4001"))
