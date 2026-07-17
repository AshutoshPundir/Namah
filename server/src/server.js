const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

app.get('/',(req,res) => {
    res.json({
        "message":"message from express"
    }) 
})

app.get('/api/health', (req,res) => {
    res.json({
        "status": "OK",
        "database": "Connected"
    })
})



app.listen(port, ()=> (
    console.log(`server running on port ${port}`)
))
