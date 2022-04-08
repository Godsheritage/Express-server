import fs from 'fs'
import app from './app';
import https from 'https'

const PORT = process.env.PORT || 3000;

const server = https.createServer({
  key : fs.readFileSync('key.pem'),
  cert :  fs.readFileSync('cert.pem')
}, app)

server.listen(PORT, () => {
  console.log(`server is listening at port: ${PORT}`);
});
