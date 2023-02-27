const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.URI;

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  console.log('Conectou ao MongoDB com Mongoose');
};

main().catch((err) => console.log(err));


module.exports = mongoose;