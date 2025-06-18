import express from 'express'
const app = express()
const PORT = 4000


app.use(express.json())

app.get(("/test"),(_req, res) => {
    res.send("<h1>hello world tested</h1>")
})

app.listen(PORT, ()=>{
    console.log(`Server listen on PORT ${PORT}`);
})