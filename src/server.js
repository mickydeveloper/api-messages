import express from 'express';
import db from './db';
import bodyParse from 'body-parser';

// Set up the express app
const app = express();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:false}));

// get all messages
app.get('/api/v1/messages', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'messages retrieved successfully',
    messages: db
  })
});
// post a new message
app.post('/api/v1/messages', (req, res) => {
    if(!req.body.content) {
      return res.status(400).send({
        success: 'false',
        message: 'content is required'
      });
    }
   const message = {
     id: db.length + 1,
     content: req.body.content,
     timestamp: (new Date()).toJSON()
   };
   db.push(message);
   return res.status(201).send({
     success: 'true',
     message: 'message added successfully',
     createdMessage: message
   });
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});