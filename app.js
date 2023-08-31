const express = require('express');
const passport = require('passport');
const app = express();
app.use(require('./utils/responseHandler'));

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const { apsPassportStrategy } = require('./config/ecomPassport');
const cors = require('cors');
const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const models = require('./models');
const routes = require('./routes');

apsPassportStrategy(passport);
models.sequelize.sync({ alter:false }).then(()=>{
  app.use(routes);

  console.log('DB connected!');
});

app.listen(process.env.PORT, () => {
  console.log("server is started on port " + process.env.PORT);
});