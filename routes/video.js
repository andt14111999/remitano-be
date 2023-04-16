var express = require('express');
var router = express.Router();
const ytdl = require('ytdl-core');
const verifyToken = require('../middlewares/verifyToken');
const Video = require('./../models/Video');
const parseJwt = require('../utils/parseJwt');
const User = require('../models/User');

router.post('/', verifyToken, async (request, response, next) => {
  const checkYoutubeExist = await Video.findOne({
    videoURL: request.body.videoURL,
  });

  if (checkYoutubeExist)
    return response.status(422).send('This video has already been shared');

  const jwtData = parseJwt(request);
  const checkUserExist = await User.findOne({ _id: jwtData._id });

  if (!checkUserExist) return response.status(422).send("User doesn't exist");

  await ytdl
    .getInfo(request.body.videoURL)
    .then(async (info) => {
      console.log('info', info);
      const description = info.videoDetails.description;
      const video = new Video({
        title: info.videoDetails.title,
        embeddedURL: info.videoDetails.embed.iframeUrl,
        videoURL: info.videoDetails.video_url,
        description: description ? description.replace(/\n/g, "<br/>") : '',
        userEmail: checkUserExist.email,
      });
      const newVideo = await video.save();
      response.send(newVideo);
    })
    .catch(err => {
        console.error(err)
        response.status(500).send("INTERNAL SERVER ERROR");
    });
});

router.get('/', async (request, response, next) => {
  await Video.find({})
    .then((videos) => {
      response.status(200).send(videos);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).send('INTERNAL SERVER ERROR');
    });

});

module.exports = router;
