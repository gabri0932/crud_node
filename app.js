import express, {json} from 'express';

const app = express()

app.use(json())


//puerto que usa la app
const port = process.env.PORT || 3000
//lugar donde corre el servidor
app.listen(port, ()=>{
    console.log(`server is running in http://localhost:${port}`)
})