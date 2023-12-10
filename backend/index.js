const fs = require('fs');
const yaml = require('js-yaml');
global.foodData = require('./db')(function call(err, data, MealData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;
  global.mealName = MealData;
})
//testing
const environment = process.env.NODE_ENV || 'development';
const configPath = './env-local.yaml';
const configFile = fs.readFileSync(configPath, 'utf8');
const config = yaml.load(configFile);

const { PORT, MONGODB_URI, TEST_MONGODB_URI } = config[environment];

if (!MONGODB_URI && environment !== 'test') {
  console.log('MongoDB URI is missing.');
  process.exit(1);
}

const mongoDBURI = environment === 'test' ? TEST_MONGODB_URI : MONGODB_URI;

const express = require('express')
const app = express()
const port = 5000
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend is running...')
})

app.use('/api/auth', require('./Routes/Auth'));

if(environment !== 'test') {
  const port = PORT || 5000;
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
  })
}

module.exports = app;