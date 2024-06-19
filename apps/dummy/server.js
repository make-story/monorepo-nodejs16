import path from 'node:path';
import url from 'node:url';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // 또는 const __dirname = path.resolve();
const logPrefix = 'server - dummy';

/**
 * node 예외처리
 * UncatchedException 이 발생하면 Node.js 인스턴스가 죽음(서버다운) 방지
 * https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
 */
process.on('uncaughtException', error => {
  console.log(logPrefix, 'uncaughtException ', error);
});

/**
 * env 환경변수
 *
 * dotenv 적용 우선순위
 * https://www.npmjs.com/package/dotenv-flow#variables-overwritingpriority
 */
console.log(logPrefix, 'NODE_ENV', process.env.NODE_ENV);
dotenv.config();
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 9090;
const portSSL = process.env.PORT_SSL || 9091;
const certificate = {
  key:
    (fs.existsSync('./cert/127.0.0.1+1-key.pem') &&
      fs.readFileSync('./cert/127.0.0.1+1-key.pem')) ||
    '',
  cert:
    (fs.existsSync('./cert/127.0.0.1+1.pem') &&
      fs.readFileSync('./cert/127.0.0.1+1.pem')) ||
    '',
};

/**
 * express
 */
const app = express();
app.set('trust proxy', 1);
app.use(
  cors({
    origin: true, // '*' 또는 true : 모든 출처 허용
    credentials: false,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);
app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
]);
app.use(express.static(path.join(__dirname, 'public'))); // public 정적 경로
/*app.use(
  '/product',
  createProxyMiddleware(
    // filter
    (pathname, request) => {
      console.log('createProxyMiddleware', pathname);
      return true;
    },
    // options
    {
      //target: 'https://pbf.lotteon.com',
      target: 'https://test-pbf.lotteon.com',
      changeOrigin: true,
      logger: console,
    },
  ),
);*/
app.use('/api/:file', (request, response, next) => {
  const { params, query, body } = request;
  const { file = '' } = params;
  const filepath = path.join(__dirname, `./dummy/${file}.json`);

  console.log('request', request.url);
  console.log('body', body);
  if (fs.existsSync(filepath)) {
    fs.readFile(filepath, (error, buffer) => {
      response.json(JSON.parse(buffer));
    });
  } else {
    response.json({ test: true });
  }
});
app.post('/list', (request, response) => {
  const { body } = request; // headers: { 'Content-Type': 'application/json' }
  setTimeout(() => {
    response.json(body);
  }, 3000);
});
app.use('*', (request, response) => response.send('TEST'));

app.once('error', error => {
  console.error(logPrefix, error);
  process.exit(1);
});
const server = app.listen(port, () =>
  console.log(`[더미데이터 Server!!] http://localhost:${port}`),
);
/*https
  .createServer(certificate, app)
  .listen(portSSL, () =>
    console.log(`[더미데이터 Server!!] https://localhost:${portSSL}`),
  );*/
