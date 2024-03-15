const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser")
const app = express();

const PORT = process.env.PORT || 8877

app.use(cors())
app.use(bodyParser.json())

//listen server
app.listen(PORT,()=>{
    console.log(`Server running on port :${PORT}`)
})
