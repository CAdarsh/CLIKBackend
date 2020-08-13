const app = require('./app');

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://clikAdmin:<Yb4Zb4XbTKz6Rpq>@cluster0.mgwoh.mongodb.net/<clikIndia>?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  /* eslint no-console: "error" */
  //  custom console
  console.log('Mongo Running');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
