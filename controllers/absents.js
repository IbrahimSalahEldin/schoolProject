// const absentModule = require("../models/absence");
// const studentModule = require("../models/student");
// class Absent{

//     async create(req,res){
//         try{
//             const student= studentModule.findById({_id:req.params.id});
//             if(student){
//                  await studentModule.create(req.body);
//                 return res.status(201).send("absent has created successfully!");
//             } else {
//             return res.status(409).send("student is not found ");
//             }
//         } catch (error) {
//             return res.status(401).send(error);
//         }
//     }



    
//   async delete(req, res) {
//     try {
//       const absent = await absentModule.deleteOne({ _id: req.params.id });
//       return res.json(absent);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }

// }
// module.exports = new Absent();





  


// //   async Edit(req, res) {
// //     const id = req.params.id;
// //     const user = await studentModule.findById(id);
// //     if (req.file || res.statusCode != 404) {
// //       const imagePath = path.join(
// //         __dirname,
// //         "../../assets/uploads/student",
// //         user.img
// //       );
// //       fs.unlinkSync(imagePath);
// //       user.img = req.file.filename;
// //     }

// //     user.name = req.body.name;
// //     user.address = req.body.address;
// //     user.ssn = req.body.ssn;
// //     user.amountaOfBsence = req.body.amountaOfBsence;
// //     user.report = req.body.report;
// //     user.class = req.body.class;
// //     user.academic_year = req.body.academic_year;
// //     user.father_description = req.body.father_description;
// //     try {
// //       const userData = await user.save();
// //       return res.json(userData);
// //     } catch (error) {
// //       return res.status(500).send(error);
// //     }
// //   }

  