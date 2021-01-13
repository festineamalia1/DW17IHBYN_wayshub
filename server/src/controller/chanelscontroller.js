const { Videos, Chanels, Comments, Subcribes } = require("../../models");
const Joi = require("@hapi/joi");
exports.allChanels = async (req, res) => {
try {
  

    const allChanelsData = await Chanels.findAll({
      include: [
        {
          model: Subcribes,
          as: "subcribe",

          attributes: {
            exclude: ["createdAt", "updatedAt", "ChanelId", "ChanelId"],
          },
        },
        {
          model: Videos,
          as: "video",

          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
     res.send({
       message: "Success",
       data: {
         chanels: allChanelsData,
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

exports.detailChanels = async (req, res) => {
    try {
        const {id} = req.params;
        const detailChanelsData = await Chanels.findOne({
          where: {
            id,
          },
          include: [
            {
              model: Subcribes,
              as: "subcribe",

              attributes: {
                exclude: ["createdAt", "updatedAt", "ChanelId", "ChanelId"],
              },
            },
            {
              model: Videos,
              as: "video",

              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        });
        res.send({
          message: "Success",
          data: {
            chanels: detailChanelsData,
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

exports.editChanels = async (req, res) => {
    try {
       const { body, files } = req;

       const thumbnailName = files.thumbnail[0].filename;
       const photoFile = files.photo[0].filename;

       console.log({ photoFile, thumbnailName });

        const schema = Joi.object({
          chanelName: Joi.string().min(3),

          description: Joi.string(),

         
        });
const { error } = schema.validate(req.body);
 if (error)
   return res.status(400).send({
     error: {
       message: error.details[0].message,
     },
   });
         const { id } = req.params;
         const editDataChanels = await Chanels.update(
           {
             ...req.body,
thumbnail: thumbnailName,
           photo: photoFile,
        }, {
           where: {
             id,
           },

           
         });
          if (editDataChanels) {
              const result = await Chanels.findOne({
                where: {
                  id,
                },
                include: {
                  model: Subcribes,
                  as: "subcribe",

                  attributes: {
                    exclude: ["createdAt", "updatedAt", "ChanelId", "ChanelId"],
                  },
                },
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                },
              });
              res.send({
                message: "Success",
                data: {
                  chanels: result,
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

exports.deleteChanels = async (req, res) => {
    try {
        const { id } = req.params;
        await Chanels.destroy({
          where: {
            id,
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