import express from 'express'
import {question, auth } from './routes'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) //formato utf-8

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
next();
});
if (process.env.NODE_ENV === 'development') {
}

app.use('/api/questions', question)
app.use('/api/auth', auth)

export default app
