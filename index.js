/** @format */

const express = require("express");
const app = express();
const fs = require("fs");
const p = (get) => console.log(get);
app.get("/", (req, res) => {
  p("request received");
  //   console.log(req);
  res.sendFile("./index.html", { root: __dirname });
});
// app.get("/video", (req, res) => {
//   p("video request");
//   //   const range = req.header.range;
//   const range = req.range();
//   p(req.range());
//   if (!range) res.status(400).send("require header range");

//   const video = "./assets/def.mp4";
//   const videoSize = fs.statSync("./assets/def.mp4").size;
//   p("video size = " + videoSize);
//   const CHUNK_SIZE = 10 ** 6; //1mb
//   const start = req.range() + 1;
//   const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
//   const contentLength = end - start + 1;
//   const headers = {
//     // "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     "Accept-Range": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "video/mp4",
//   };
//   res.writeHead(206, headers);
//   const videoStream = fs.createReadStream(video, { start, end });
//   videoStream.pipe(res);
// });

// ============sencond video==========================
app.get("/video2", (req, res) => {
  p("video request 2");
  //   const range = req.header.range;
  console.log("alternate range = " + req.headers.range);
  // const range = +(req.range() + 2);
  const range = Number(req.headers.range.replace(/\D/g, ""));
  p("req range= " + req.range());
  p(range);

  if (!range) res.status(400).send("require header range");

  const video =
    "/mnt/qwert/homeBackup_may9_22/Downloads/Sherlock Holmes (2009) [1080p]/Sherlock.Holms.2009.1080p.BrRip.x264.YIFY.mp4";
  const videoSize = fs.statSync(video).size;
  p("video size = " + videoSize);

  const CHUNK_SIZE = 10 ** 6; //1mb
  const start = range;
  p("start = " + start);
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(video, { start, end });
  videoStream.pipe(res);
});

app.listen(3000);
