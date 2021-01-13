const { Videos, Chanels, Comments } = require("../../models");
const Joi = require("@hapi/joi");
exports.allComments = async (req, res) => {
try {
    const { videoId } = req.params;
     const allCommentsData = await Comments.findAll({
         where:{
             videoId,
         },
       include: {
         model: Chanels,
         as: "chanels",
         attributes: {
           exclude: ["chanelId", "createdAt", "updatedAt"],
         },
       },
       attributes: {
         exclude: [
           "VideoId",
           "videoId",
           "chanelId",
           "ChanelId",
           "createdAt",
           "updatedAt",
         ],
       },
     });
      res.send({
        message: "Success",
        data: {
          comments: allCommentsData,
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

exports.detailComments = async (req, res) => {
try {
    const { id, videoId } = req.params;
     const detailCommentsData = await Comments.findOne({
       where: { id, videoId },
       include: {
         model: Chanels,
         as: "chanels",
         attributes: {
           exclude: ["chanelId", "createdAt", "updatedAt"],
         },
       },
       attributes: {
         exclude: [
           "VideoId",
           "videoId",
           "chanelId",
           "ChanelId",
           "createdAt",
           "updatedAt",
         ],
       },
     });
     res.send({
       message: "Success",
       data: {
         comments: detailCommentsData,
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

exports.addComments = async (req,res) =>{
   try {
     const { videoId } = req.params;
     const { id: chanelId } = req.user;
      const schema = Joi.object({
        

        comment: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error)
        return res.status(400).send({
          error: {
            message: error.details[0].message,
          },
        });
        
        const { id } = await Comments.create({...req.body, videoId, chanelId});
        const result = await Comments.findOne({
          where: { id, videoId },
          include: {
            model: Chanels,
            as: "chanels",
            attributes: {
              exclude: ["chanelId", "createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: [
              "VideoId",
              "videoId",
              "chanelId",
              "ChanelId",
              "createdAt",
              "updatedAt",
            ],
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

exports.editComments = async (req, res) => {
    try {
        const { id, videoId } = req.params;
        const editDataComments = await Comments.update(req.body, {
          where: { id, videoId },

        });
         if (editDataComments) {
           const result = await Comments.findOne({
             where: { id, videoId },
             include: {
               model: Chanels,
               as: "chanels",
               attributes: {
                 exclude: ["chanelId", "createdAt", "updatedAt"],
               },
             },
             attributes: {
               exclude: [
                 "VideoId",
                 "videoId",
                 "chanelId",
                 "ChanelId",
                 "createdAt",
                 "updatedAt",
               ],
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
                message: "Error while edit data Comments",
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

exports.deleteComments = async (req, res) => {
    try {
          const { id, videoId } = req.params;
           await Comments.destroy({
             where: {
               id,
               videoId,
             },
           });
           res.send({
             message: `Success`,
             data: {
               id: { id },
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
