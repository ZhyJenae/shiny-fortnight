// Both devBundle lines must be commented out during production.
import devBundle from "./devBundle"
import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'




import { MongoClient } from 'mongodb'



devBundle.compile(app)


mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true, useUnifiedTopology: true
})
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
// const url = process.env.MONGODB_URI || 'mongodb+srv://newUser:Vantol@cluster0.sosjs.mongodb.net/god?retryWrites=true&w=majority'
// MongoClient.connect(url, (err, db) => {
//     console.log("Connected successfully to mongodb server")
//     db.close().then(r => r)
// })

// const CURRENT_WORKING_DIR = process.cwd()
// //
//
//
//
// app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
//


// let port = process.env.PORT || 3000
//
app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})