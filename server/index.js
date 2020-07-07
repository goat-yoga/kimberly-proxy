const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')

const { createProxyMiddleware } = require('http-proxy-middleware');

const service = express();
const port = 3000;

service.use(bodyparser.json());
service.use(bodyparser.urlencoded({extended:true}));
service.use(morgan('dev'));
service.use(cors());

// service.use('/', router);

service.use('/', express.static(path.join(__dirname, '../public')))

service.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// service.get('/search', (req, res) => {
//   res.redirect('http://localhost:3500/search')
// })

// service.use('/search', createProxyMiddleware({ target: 'http://localhost:3500', changeOrigin: true }));

service.use('/search', createProxyMiddleware({
  target: 'http://localhost:3500',
  changeOrigin: true
}));