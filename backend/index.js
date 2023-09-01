const connectToMongo = require('./db');
connectToMongo();
var cors = require('cors')

const express = require('express')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
//available routes 


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World aslan here !')
})

app.listen(port, () => {
  console.log(`inotebook listening on port ${port}`)
})

