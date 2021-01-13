const { Videos, Chanels, Comments, Subcribes } = require("../../models");
const Joi = require("@hapi/joi");

exports.addSubcribtion = async (req, res) => {
    try {
          const chanel = req.user.id;
      const { subcriber } = req.params;
    
     
       await Subcribes.create({
         chanel,
         subcriber,
       });

       res.send({
         status: "success",
         message: "added successfully",
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

exports.deleteSubcribtion = async (req, res) => {
    try {
         const chanel = req.user.id;
         const { subcriber } = req.params;
        await Subcribes.destroy({
          where: {
           
            subcriber,
          },
        });
        res.send({
          message: `Success`,
          data: {
            id: { subcriber },
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

exports.allSubcribtion = async (req, res) => {
  try {
     const chanel = req.user.id;
    const allVideoData = await Subcribes.findAll({
      where: {
        chanel,
      },
      include: {
        model: Chanels,
        as: "subcribe",

        include: {
          model: Videos,
          as: "video",
          attributes: {
            exclude: ["updatedAt", "chanelId", "ChanelId"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "ChanelId"],
      },
    });
    res.send({
      message: "Success",
      data: {
        video: allVideoData,
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

