const express = require("express");

const router = express.Router();

const { authenticated } = require("../middleware/authentication");
const { register, login, checkAuth } = require("../controller/auth");
 
const { uploadFile1, uploadFile2 } = require("../middleware/upload");

const {
  allVideos,
  detailVideo,
  addVideos,
  editVideos,
  deleteVideos,
  getVideoByTitle,
  getVideoByCategory,
} = require("../controller/videoscontroller");
const {allComments, detailComments, addComments, editComments, deleteComments} = require("../controller/commentscontroller");
const {
  allSubcribtion,
  addSubcribtion,
 deleteSubcribtion
} = require("../controller/subcribescontroller");
const {allChanels, detailChanels, editChanels, deleteChanels} = require("../controller/chanelscontroller");

router.get("/videos", authenticated, allVideos);
router.get("/videos/:id", authenticated, detailVideo);
router.post(
  "/videos",
  authenticated,
  uploadFile1("thumbnail", "video"),
  addVideos
);
router.patch("/videos/:id", authenticated, editVideos);
router.delete("/videos/:id", authenticated, deleteVideos);
router.get("/video2?", authenticated, getVideoByTitle);
router.get("/video3?", authenticated,getVideoByCategory);
 
router.get("/videos/:videoId/comments", authenticated, allComments);
router.get("/videos/:videoId/comments/:id", authenticated, detailComments);
router.post("/videos/:videoId/comments", authenticated, addComments);
router.patch("/videos/:videoId/comments/:id", authenticated, editComments);
router.delete("/videos/:videoId/comments/:id", authenticated, deleteComments);

router.get("/subcribtion", authenticated, allSubcribtion);
router.delete("/subcribtion/:subcriber", authenticated, deleteSubcribtion);
router.post("/subcribtion/:subcriber", authenticated, addSubcribtion);


router.get("/chanels", authenticated, allChanels);
router.get("/chanels/:id", authenticated, detailChanels);
router.patch(
  "/chanels/:id",
  authenticated,
  uploadFile2("thumbnail", "photo"),
  editChanels
);
router.delete("/chanels/:id", authenticated, deleteChanels);

router.post("/register", register);
router.post("/login", login);
router.get("/auth", authenticated, checkAuth);

  module.exports = router;