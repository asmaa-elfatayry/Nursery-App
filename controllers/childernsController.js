// require schema
const Childerns = require("./../models/childSchema");

exports.getAllChilderns = async (req, res, next) => {
  try {
    const data = await Childerns.find({});
    if (!data) {
      throw new Error("No Childerns found");
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};

exports.addChild = async (req, res, next) => {
  try {
    const { _id, fullname, age, level, address, image } = req.body;

    const newChild = new Childerns({
      _id,
      fullname,
      age,
      level,
      address,
      image,
    });
    await newChild.save();
    res.status(201).json({ data: newChild });
  } catch (error) {
    next(error);
  }
};

exports.updateChild = async (req, res, next) => {
  try {
    const { fullname, age, level, address, image } = req.body;
    let updateFailds = {};
    // check first what user sended

    if (fullname) updateFailds.fullname = fullname;
    if (age) updateFailds.age = age;
    if (level) updateFailds.level = level;
    if (address) updateFailds.image = address;
    if (image) updateFailds.image = image;

    const updatedChild = await Childerns.findByIdAndUpdate(
      req.body._id,
      updateFailds
    );

    if (!updatedChild) {
      return res.status(404).json({ error: "Child not found" });
    }

    res.status(200).json({ data: updatedChild });
  } catch (error) {
    next(error);
  }
};

exports.deleteChild = async (req, res, next) => {
  try {
    const deletedChild = await Childerns.findByIdAndDelete(req.body._id);
    if (!deletedChild) {
      return res.status(404).json({ error: "Child not found" });
    }
    res.status(200).json({ message: "Delete Successfuly", data: deletedChild });
  } catch (error) {
    next(error);
  }
};

exports.findChildById = async (req, res, next) => {
  try {
    const data = await Childerns.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Sorry can't find it!" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};
