require('dotenv').config()
const app = require('./app.js')
const connectToDB = require('./config/db.js')

connectToDB()

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})




// CtVB20PHywj52fss

// mongodb+srv://kukkarraghav02_db_user:CtVB20PHywj52fss@cluster0.ppuonwt.mongodb.net/?appName=Cluster0