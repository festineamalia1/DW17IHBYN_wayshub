const { Videos, Chanels, Comments } = require("../../models");
const Joi = require("@hapi/joi");
const { Op } = require("sequelize");
exports.allVideos = async (req, res) => {
  try {
    const allVideosData = await Videos.findAll({
      include: {
        model: Chanels,
        as: "chanels",
        attributes: {
          exclude: ["chanelId", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["chanelId", "ChanelId", "updatedAt"],
      },
    });
    res.send({
      message: "Success",
      data: {
        videos: allVideosData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.detailVideo = async (req, res) => {
    try {
        const {id} = req.params;
        const detailVideosData = await Videos.findOne({
          where: {
            id,
          },
          include: [
            {
              model: Chanels,
              as: "chanels",
              attributes: {
                exclude: ["chanelId", "createdAt", "updatedAt"],
              },
            },
            {
              model: Comments,
              as: "comments",
              include: {
                model: Chanels,
                as: "chanels",
              },
              attributes: {
                exclude: [
                  "VideoId",
                  "videoId",
                  "chanelId",
                  "ChanelId",
                  "commentId",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
          attributes: {
            exclude: [ "ChanelId", "createdAt", "updatedAt"],
          },
        });
        res.send({
          message: "Success",
          data: {
            videos: detailVideosData,
          },
        });
    } catch (error) {
         console.log(error);
         res.status(500).send({
           error: {
             message: "Server Error",
           },
         });
    }
};

exports.addVideos = async (req,res) =>{
    try {
      const { files } = req;

     const { id: chanelId } = req.user;
      const thumbnailName = files.thumbnail[0].filename;
      const videoFile = files.video[0].filename;
       console.log({ videoFile, thumbnailName });
        const schema = Joi.object({
          title: Joi.string().min(3).required(),
        
          description: Joi.string().required(),
          
         
         
        });
       const { error } = schema.validate(req.body);
        if (error)
          return res.status(400).send({
            error: {
              message: error.details[0].message,
            },
          });
        const { id } = await Videos.create({
          ...req.body,
          thumbnail: thumbnailName,
          video: videoFile,
          chanelId,
        });
        const result = await Videos.findOne({
          where: {
            id,
          },
          include: [
            {
              model: Chanels,
              as: "chanels",
              attributes: {
                exclude: ["chanelId", "createdAt", "updatedAt"],
              },
            },
            {
              model: Comments,
              as: "comments",
              include: {
                model: Chanels,
                as: "chanels",
              },
              attributes: {
                exclude: [
                  "VideoId",
                  "videoId",
                  "chanelId",
                  "ChanelId",
                  "commentId",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
          attributes: {
            exclude: ["chanelId", "ChanelId", "createdAt", "updatedAt"],
          },
        });
       
        res.send({
          message: "success",
          data: {
            videos: result,
          },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
          error: {
            message: "Server Error",
          },
        });
    }
};

exports.editVideos = async (req, res) => {
  try {
    const { id } = req.params;
     const editDataVideo = await Videos.update(req.body, {
       where: {
         id,
       },
     });
      if (editDataVideo) {
              const result = await Videos.findOne({
                where: {
                  id,
                },
                include: [
                  {
                    model: Chanels,
                    as: "chanels",
                    attributes: {
                      exclude: ["chanelId", "createdAt", "updatedAt"],
                    },
                  },
                  {
                    model: Comments,
                    as: "comments",
                    include: {
                      model: Chanels,
                      as: "chanels",
                    },
                    attributes: {
                      exclude: [
                        "VideoId",
                        "videoId",
                        "chanelId",
                        "ChanelId",
                        "commentId",
                        "createdAt",
                        "updatedAt",
                      ],
                    },
                  },
                ],
                attributes: {
                  exclude: ["chanelId", "ChanelId", "createdAt", "updatedAt"],
                },
              });

              res.send({
                message: "success",
                data: {
                  videos: result,
                },
              });
      } else {
         res.status(400).send({
           message: "Error while edit data video",
         });
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.deleteVideos = async (req, res) => {
  try {
   
     const { id } = req.params;
      await Videos.destroy({
        where: {
          id,
        },
      });
       
       res.send({
         message: `Success`,
         data: {
           id: {id},
         },
       });
  } catch (error) {
     console.log(error);
     res.status(500).send({
       error: {
         message: "Server Error",
       },
     });
  }
};

exports.getVideoByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const VideoTitle = await Videos.findAll({
      where: {
        title: {
          [Op.like]: "%" + title + "%",
        },
      },
      order: [["id", "DESC"]],
      include: {
        model: Chanels,
        as: "chanels",
        attributes: {
          exclude: ["chanelId", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["chanelId", "ChanelId", "updatedAt"],
      },
    });
    res.send({
      message: `loaded successfully`,
      data: {
        videos: VideoTitle,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
exports.getVideoByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const VideoCategory = await Videos.findAll({
      where: {
        category: {
          [Op.like]: "%" + category + "%",
        },
      },
      order: [["id", "DESC"]],
      include: {
        model: Chanels,
        as: "chanels",
        attributes: {
          exclude: ["chanelId", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["chanelId", "ChanelId", "updatedAt"],
      },
    });
    res.send({
      message: `loaded successfully`,
      data: {
        videos: VideoCategory,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
