const Items = require("../models/item.js");
const {v4:uuidv4}=require("uuid")

const home = (req, res) => {
  console.log("Hello this is backend server of ReBazz for Code.pdf");
  res.status(200).send("Hello this is backend server of ReBazz for Code.pdf");
};

const create = async (req, res) => {
    const uuid = uuidv4() + "_" + req.body.itemInfo.title;
    const item = new Items({
        itemid:uuid,
        ...req.body,
        postedBy:req.user._id
    });
    try{
        await item.save();
        res.status(201).send({
            message:"Item has been successfully registtered !!!",
            data:item
        });
    } catch (error) {
        res.status(400).send({
            message:"Item can't be registered",
            error
        });
    }
};

const findAll = async (req, res) => {
  try {
    const item = await Items.find({});
    res.status(200).json({
      status: true,
      message: "All Items",
      errors: [],
      data: {
        items: item,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Unable to read all the items",
      errors: error,
      data: {},
    });
  }
};


const findSpecific = async (req, res) => {
  try {
    const item = await Items.find({}).limit(parseInt(req.query.limit));
    res.status(200).json({
      status: true,
      message: "All Items",
      errors: [],
      data: {
        items: item,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Unable to read all the items",
      errors: error,
      data: {},
    });
  }
};


const findCatAll = async (req, res) => {
    try {
      const item = await Items.find({...req.body});
      res.status(200).json({
        status: true,
        message: "All Items of specific category",
        errors: [],
        data: {
          items: item,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Unable to read the items of specific category",
        errors: error,
        data: {},
      });
    }
  };


module.exports = {
  home,
  create,
  findAll,
  findCatAll,
  findSpecific
};
