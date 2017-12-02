const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
const keys = require('./keys.json');
const Faced = require('faced');
const faced = new Faced();
const sizeOf = require('image-size');
const gm = require('gm').subClass({
  imageMagick: true
})
const { registerFont, createCanvas } = require('canvas');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.on('unhandledRejection', (reason)=>{ console.log("unhandledRejection\n" + reason); return; });
process.on('uncaughtException', (err)=>{ console.log("uncaughtException\n" + err); return; });

registerFont('./fonts/libel.ttf', {family: 'libel'});
registerFont('./fonts/ribbon.ttf', {family: 'ribbon'});
registerFont('./fonts/Handstand.ttf', {family: 'handspeak'});
registerFont('./fonts/revolt.ttf', {family: 'revolt'});
registerFont('./fonts/Cocksure.ttf', {family: 'penis'});
registerFont('./fonts/Brixs.ttf', {family: 'brix'});
registerFont('./fonts/unicorn.ttf', {family: 'unicorn'});

console.log('Connected. API is online.');

//////////////////////// ENDPOINTS ////////////////////////

app.get('/api', (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>In Development... This page is working...</h1>');
    res.end();
  });
app.post('/api/trumptweet', (req, res)=>{
    authorization(req, res);
    trump(req, res);
  });
app.post('/api/shit', (req, res) => {
    authorization(req, res);
    sendShit(req, res)
  });
app.post('/api/welcomer', (req, res) => {
    authorization(req, res);
    welcome(req, res)
  });
app.post('/api/ribbon', (req, res) => {
    authorization(req, res);
    sendRibbon(req, res)
  });
app.post('/api/handspeak', (req, res) => {
    authorization(req, res);
    sendHands(req, res)
  });
app.post('/api/fancytext1', (req, res) => {
    authorization(req, res);
    fancyText(req, res)
  });
app.post('/api/cocktext', (req, res) => {
    authorization(req, res);
    cockText(req, res)
  });
app.post('/api/brix', (req, res) => {
    authorization(req, res);
    brix(req, res)
  });
app.post('/api/unicorntext', (req, res) => {
    authorization(req, res);
    unicornText(req, res)
  });
app.post('/api/dogfilter', (req, res) => {
    authorization(req, res);
    hoeFilter(req, res);
  });
app.post('/api/redeyes', (req, res) => {
    authorization(req, res);
    redEyes(req, res);
  });
app.post('/api/magik', (req, res)=>{
    authorization(req, res);
    magik(req, res);
  });
app.post('/api/eyes', (req, res)=>{
    authorization(req, res);
    eyes(req, res);
  });

//////////////////////// ENDPOINT FUNCTIONS ////////////////////////

async function authorization(r, p) {
  if (!r.get('Authorization') || !keys.auth.includes(r.get('Authorization'))) { 
    p.status(401).send('You are not authorized to use this endpoint. Please contact Solace#2701(205912295837138944) for information on gaining access.'); 
    console.log('Person not authorized');
    return p.end()
  }
}

async function trump(req, res) {
  let toBuffer = req.body.url;
  let trumpTweet = await fsn.readFile('./img/trumpTweet.png');
  imageDownload(toBuffer).then(incomingBuffer => {
    let img = new Canvas(650, 551)
    .addImage(trumpTweet, 0, 0, 650, 551)
    .addImage(incomingBuffer, 76, 86, 425, 426)
    .toBuffer();
    res.send(img);
    return res.end(); 
  })
}

async function sendShit(req, res) {
  let toBuffer = req.body.url;
  let shitPic = await fsn.readFile('./img/shit.png');
  imageDownload(toBuffer).then(incomingBuffer => {
    let img = new Canvas(680, 962)
    .addImage(shitPic, 0, 0, 680, 962)
    .addImage(incomingBuffer, 221, 653, 141, 141)
    .toBuffer();
    res.send(img);
    return res.end(); 
  })
}

async function welcome(req, res) {
  let toBuffer = req.body.url;
  let welcomePic = await fsn.readFile('./img/welcomer.png');
  imageDownload(toBuffer).then(incomingBuffer => {
    let img = new Canvas(400, 98)
    .addImage(welcomePic, 0, 0, 400, 98)
    .addImage(incomingBuffer, 85, 13, 81, 81)
    .setTextFont('15px libel')
    .setTextAlign('center')
    .setColor('#FFFFFF')
    .addResponsiveText(req.body.user, 247, 82, 169)
    .toBuffer();
    res.send(img);
    return res.end(); 
  })
}

async function sendRibbon(req, res) {
  let beforeStr = req.body.text.split('');
  if(beforeStr.join('').length > 60) {
    res.status(403).send('This request string is too long. Please keep it below 60 characters.'); 
    return res.end()
  }
  let afterStr = [];
  ribbonize(beforeStr);
  function ribbonize(array) {
    for (var i = 0, len = array.length; i < len; i++) {
      if(i === 0) afterStr.unshift(array[i]);
      if(i > 0) afterStr.push(array[i].replace(array[i], `_${array[i]}`));
    }
  }
  let initWidth = Math.floor(254 + (beforeStr.join('').length * 31));
  let img = new Canvas(initWidth, 196)
  .setTextFont('120px ribbon')
  .setTextAlign('center')
  .setColor('#FFFFFF')
  .addText(`(${afterStr.join('')})`, Math.floor(initWidth / 2), 98)
  .toBuffer();
  res.send(img);
  return res.end(); 
}

async function sendHands(req, res) {
  let newStr = req.body.text.split('');
  if(newStr.join('').length > 80) {
    res.status(403).send('This request string is too long. Please keep it below 80 characters.'); 
    return res.end()
  }
  let initWidth = Math.floor(76 + (newStr.join('').length * 60));
  let img = new Canvas(initWidth, 120)
  .setTextFont('120px handspeak')
  .setTextAlign('center')
  .setColor('#FFFFFF')
  .addText(newStr.join(''), Math.floor(initWidth / 2), 104)
  .toBuffer();
  res.send(img);
  return res.end(); 
}

async function fancyText(req, res) {
  let newStr = req.body.text.split('');
  if(newStr.join('').length > 50) {
    res.status(403).send('This request string is too long. Please keep it below 50 characters.'); 
    return res.end()
  }
  let initWidth = Math.floor(139 + (newStr.join('').length * 67));
  let img = new Canvas(initWidth, 168)
  .setTextFont('120px revolt')
  .setTextAlign('center')
  .setColor('#FFFFFF')
  .addText(newStr.join('').toUpperCase(), Math.floor(initWidth / 2), 125)
  .toBuffer();
  res.send(img);
  return res.end(); 
}

async function cockText(req, res) {
  let newStr = req.body.text.split('');
  if(newStr.join('').length > 70) {
    res.status(403).send('This request string is too long. Please keep it below 70 characters.'); 
    return res.end()
  }
  let initWidth = Math.floor(100 + (newStr.join('').length * 66));
  let img = new Canvas(initWidth, 124)
  .setTextFont('120px penis')
  .setTextAlign('center')
  .setColor('#E6C682')
  .addText(newStr.join(''), Math.floor(initWidth / 2), 108)
  .toBuffer();
  res.send(img);
  return res.end(); 
}

async function brix(req, res) {
  let newStr = req.body.text.split('');
  if(newStr.join('').length > 70) {
    res.status(403).send('This request string is too long. Please keep it below 70 characters.'); 
    return res.end()
  }
  let initWidth = Math.floor(89 + (newStr.join('').length * 64));
  let img = new Canvas(initWidth, 112)
  .setTextFont('120px brix')
  .setTextAlign('center')
  .setColor('#FFFFFF')
  .addText(newStr.join(''), Math.floor(initWidth / 2), 110)
  .toBuffer();
  res.send(img);
  return res.end(); 
}

async function unicornText(req, res) {
  let newStr = req.body.text.split('');
  if(newStr.join('').length > 60) {
    res.status(403).send('This request string is too long. Please keep it below 60 characters.'); 
    return res.end()
  }
  let initWidth = Math.floor(91 + (newStr.join('').length * 106));
  let img = new Canvas(initWidth, 102)
  .setTextFont('120px unicorn')
  .setTextAlign('center')
  .setColor('#FFFFFF')
  .addText(newStr.join(''), Math.floor(initWidth / 2), 95)
  .toBuffer();
  res.send(img);
  return res.end(); 
}

async function hoeFilter(req, res) {
  let filter = await fsn.readFile('./img/hoeFilter.png');
  let toBuffer = req.body.url;
  imageDownload(toBuffer).then(incomingBuffer => {
    faced.detect(incomingBuffer, function (faces, image, file) {
      if (!faces) {
        return console.log("No faces found!");
      }
      let face = faces[0];
      let dims = sizeOf(incomingBuffer);
      console.log(JSON.stringify(face));
      let img = new Canvas(dims.width, dims.height)
      .addImage(incomingBuffer, 0, 0, dims.width, dims.height)
      .addImage(filter, face.getX(), face.getY(), face.getWidth(), face.getHeight())
      .toBuffer();
      res.send(img);
      return res.end(); 
      });
  });
}

async function redEyes(req, res) {
  let eye = await fsn.readFile('./img/redEye.png');
  let toBuffer = req.body.url;
  imageDownload(toBuffer).then(incomingBuffer => {
    faced.detect(incomingBuffer, function (faces, image, file) {
      if (!faces) {
        return console.log("No faces found!");
      }
      let face = faces[0];
      let dims = sizeOf(incomingBuffer);
      let preImg = new Canvas(dims.width, dims.height)
      .addImage(incomingBuffer, 0, 0, dims.width, dims.height)
      .addImage(eye, face.getEyeLeft().getX() - face.getEyeLeft().getWidth() * 2, face.getEyeLeft().getY() - face.getEyeLeft().getHeight() * 2, face.getEyeLeft().getWidth() * 5, face.getEyeLeft().getHeight() * 5)
      .addImage(eye, face.getEyeRight().getX() - face.getEyeRight().getWidth() * 2, face.getEyeRight().getY() - face.getEyeRight().getHeight() * 2, face.getEyeRight().getWidth() * 5, face.getEyeRight().getHeight() * 5)
      .toBuffer();
      gm(preImg).out('-sharpen', '0x3', '-quality', '12').toBuffer('JPG', (err, buffer) => {
        res.send(buffer);
        return res.end();
      })
    });
  });
}

async function magik(req, res) {
  let toBuffer = req.body.url;
  imageDownload(toBuffer).then(incomingBuffer => {
    gm(incomingBuffer).out('-liquid-rescale', '180%', '-liquid-rescale', '60%').toBuffer('GIF', (err, buffer) => {
      res.send(buffer);
      return res.end();
    }); 
  })
}

async function eyes(req, res) {
  let eye = await fsn.readFile('./img/eye.png');
  let toBuffer = req.body.url;
  imageDownload(toBuffer).then(incomingBuffer => {
    faced.detect(incomingBuffer, function (faces, image, file) {
      if (!faces) {
        return console.log("No faces found!");
      }
      let face = faces[0];
      let dims = sizeOf(incomingBuffer);
      let img = new Canvas(dims.width, dims.height)
      .addImage(incomingBuffer, 0, 0, dims.width, dims.height)
      .addImage(eye, face.getEyeLeft().getX() - face.getEyeLeft().getWidth() / 10, face.getEyeLeft().getY() - face.getEyeLeft().getHeight() / 10, face.getEyeLeft().getWidth(), face.getEyeLeft().getHeight() * 1.25)
      .addImage(eye, face.getEyeRight().getX() - face.getEyeRight().getWidth() / 10, face.getEyeRight().getY() - face.getEyeRight().getHeight() / 10, face.getEyeRight().getWidth(), face.getEyeRight().getHeight() * 1.25)
      .toBuffer();
      res.send(img);
      return res.end();
    });
  });
}

  app.listen(80);