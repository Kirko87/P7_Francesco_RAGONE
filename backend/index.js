const app = require ("./app")
const port = 3010
require('dotenv').config();
const helmet = require ('helmet')

 

  
app.use(helmet())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})