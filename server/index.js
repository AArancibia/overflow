import Debug from 'debug';
import app from  './app'
import mongoose from 'mongoose'
import { mongoUrl } from './config'

const port = 3000
const debug = new Debug('platzi-overflow:root')


async function start() {
  await mongoose.connect(mongoUrl)

  app.listen(port, () => {
    debug(`Server running at port ${port}`)
})
}

start()

