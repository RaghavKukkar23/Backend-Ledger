require('dotenv').config()
const app = require('./app.js')
const connectToDB = require('./config/db.js')

connectToDB()

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})