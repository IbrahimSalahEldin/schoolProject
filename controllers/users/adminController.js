//validate all errors
const { validationResult } = require("express-validator");
//to define teacher/admin schema
const userModule = require("../../models/user");

class admin {
 

  async create(req, res) {
    try {
      const objuser = {
        name: req.body.name,
        img: req.file.filename,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        token: req.body.token,
      };

      const email = await userModule.findOne({ email: req.body.email });
      if (!email) {
        await userModule.create(objuser);
        return res.status(201).send("User has created successfully!");
      } else {
        return res.status(409).send("email already exists");
      }
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  async get(req, res) {
    const page = req.params.page || 1;
    const Num_Of_Teachers_Items = 10;
    const skip = (page - 1) * Num_Of_Teachers_Items;
    const index = page * Num_Of_Teachers_Items;
    const result = {};
    try {
      //to count users number
      const count = await userModule.find({}).countDocuments();
      const response = await userModule
        .find({})
        .skip(skip)
        .limit(Num_Of_Teachers_Items)
        .sort({ updatAt: -1 });

      if (index < count) {
        result.next = { page: +page + 1, limit: Num_Of_Teachers_Items };
      }

      if (skip > 0) {
        result.previous = { page: page - 1, limit: Num_Of_Teachers_Items };
      }

      result.totalPages = Math.ceil(count / Num_Of_Teachers_Items);
      result.totalDocyments = count;
      result.currentPage = page;
      result.documents = response;
      return res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error);
    }
  }

  async Edit(req, res) {
    const id = req.params.id;
    const user = await userModule.findById(id);
    if (req.file || res.statusCode != 404) {
      const imagePath = path.join(
        __dirname,
        "../../assets/uploads/user",
        user.img
      );
      fs.unlinkSync(imagePath);
      user.img = req.file.filename;
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    user.token = req.body.token;

    try {
      const userData = await user.save();
      return res.json(userData);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async delete(req, res) {
    try {
      const business = await userModule.deleteOne({ _id: req.params.id });
      return res.json(business);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
module.exports = new admin();
