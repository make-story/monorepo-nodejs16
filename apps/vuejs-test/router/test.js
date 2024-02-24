import path from 'node:path';
import express from 'express';

const __dirname = path.resolve();
const router = express.Router();
//const paths = import(path.resolve(__dirname, '../config/paths'));

// build manifest
/*const manifestRead = require(path.resolve(
  __dirname,
  '../config/manifest-read',
));
const manifestTag = require(path.resolve(__dirname, '../config/manifest-tag'));
const manifest = {
  // library: manifestRead({name: 'library'}),
  // basics: manifestRead({name: 'basics'}),
  // context: manifestRead({name: 'context'}),
  // todo: manifestRead({name: 'todo'}),
  // vanillaRedux: manifestRead({name: 'vanillaRedux'}),
  // redux: manifestRead({name: 'redux'}),
  // reduxMiddleware: manifestRead({name: 'reduxMiddleware'}),
  // reduxThunk: manifestRead({name: 'reduxThunk'}),
  // news: manifestRead({name: 'news'}),
  test: manifestRead({ name: 'test' }),
};*/

// SPA 방식에 따라 JavaScript 내부 라우트가 설정되어 있을 수 있으므로 '*' 로 설정
router.get('*', (request, response) => {
  const css = {
    //test: manifestTag.css({ manifest: manifest.test }),
  };
  const script = {
    //test: manifestTag.js({ manifest: manifest.test }),
  };

  //response.json({ test: true });
  response.render('test.ejs', {
    title: 'test',
    //css,
    //script,
  });
});

export default router;
