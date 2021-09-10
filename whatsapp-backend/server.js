import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

const app = express();

const pusher = new Pusher({
    appId: "1238391",
    key: "a672f4921f21ae29c74c",
    secret: "1114cfa7ae8374b52287",
    cluster: "ap2",
    useTLS: true
  });

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://admin:1234@cluster0.jntzn.mongodb.net/whatsappdb?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.once('open', () => {
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()
    changeStream.on('change', (change) => {
        if (change.operationType === 'insert'){
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        }
    })
})

app.get('/', (req, res) => {
    res.send('hey')
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        res.send(data)
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessages = req.body

    Messages.create(dbMessages, (err,data) => {
        res.send(data)
    })
})

app.listen(9000 || process.env.PORT)