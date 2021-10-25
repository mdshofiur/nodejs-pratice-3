const express = require('express')
const app = express()
const port = 5000
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e7yhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {

  try{
    await client.connect();
    const database = client.db('CarMechanic');
    const ServiceCollection = database.collection('services');

  // POST API
  app.post('/services', async (req, res) => {
    const service = req.body;
    const result = await ServiceCollection.insertOne(service);
    res.json(result);
  })
 
// GET API 
    app.get('/services', async (req, res) => {
    const cursor = ServiceCollection.find({});
    const services = await cursor.toArray();
    res.json(services);
})

// Get Single API

app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const service = await ServiceCollection.findOne(query);
      res.json(service);
})


// Delete API

app.delete('/services/:id', async (req,res) => {
  const id = req.params.id;
  const query = {_id: ObjectId(id)};
  const result = await ServiceCollection.deleteOne(query);
  res.send(result);
})




  }
  finally{
   // await client.close();
  }

}


run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



/* 
 const Unserinformation = {
      name: "Md Shafikur Rahaman",
      study: "Bsc In EEE",
      address: "Dhamari,Dhaka",
      university: "NPI University Of Bangladesh"
    }

    const result = await UserCollections.insertOne(Unserinformation);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
*/


