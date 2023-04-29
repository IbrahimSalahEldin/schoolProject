//validate all errors
const {validationResult} = require("express-validator");
//to define teacher/admin schema
const userModule=require("../../models/user");
const studentModule=require("../../models/student");
class admin {
    //create teacher
    async createTeacher(req,res){
        const errors=validationResult(req);
        const {email}=req.body.email;
        if (errors.isEmpty()){
            const userExist=await userModule.find({email});
            if(!userExist){
                await userModule.create(req.body);
                return res.status(200).json({message:"Teacher has created successfully"})
            }
            else{
                return res.status(401).json({errors: [{message: `${email} email is already exist` }]})
            }
        }
        else{
            return res.status(401).json({errors:errors.array()});
        }
    }

    //create student
    async createStudent(req,res){
        const errors=validationResult(req);
        const {ssn}=req.body.ssn;
        if (errors.isEmpty()){
            const studentExist=await studentModule.find({ssn});
            if(!studentExist){
                await studentModule.create(req.body);
                return res.status(200).json({message:"Student has created successfully"})

            }
            else{
                return res.status(401).json({errors: [{message: `${ssn} SSN is already exist` }]})
            }
        }
        else{
            return res.status(401).json({errors:errors.array()});
        }
    }


    async getTeacher(req,res){
        const page =req.params.page ||1;
        const Num_Of_Teachers_Items=10;
        const skip=(page-1)*Num_Of_Teachers_Items;
        const index=page*Num_Of_Teachers_Items;
        const result={};
        try{
            //to count users number
            const count=await userModule.find({}).countDocuments();
            const response =await userModule.find({}).skip(skip).limit(Num_Of_Teachers_Items).sort({updatAt:-1});
            
            if(index<count){
                result.next={page:+(page) +1,
                limit:Num_Of_Teachers_Items
                }
            }

            if(skip>0){
                result.previous={page:page -1,
                limit:Num_Of_Teachers_Items
                }
            }

            result.totalPages=Math.ceil(count/Num_Of_Teachers_Items);
            result.totalDocyments=count;
            result.currentPage=page;
            result.documents=response;
            return res.status(200).json(result);
           
        }
        catch(error){
            console.log(error.message);
            return res.status(500).json(error);
        }
    }


    async getStudent(req,res){
        const page =req.params.page ||1;
        const Num_Of_Student_Items=10;
        const skip=(page-1)*Num_Of_Student_Items;
        const index=page*Num_Of_Student_Items;
        const result={};
        try{
            //to count student number
            const count=await studentModule.find({}).countDocuments();
            const response =await studentModule.find({}).skip(skip).limit(Num_Of_Student_Items).sort({updatAt:-1});
            
            if(index<count){
                result.next={page:+(page) +1,
                limit:Num_Of_Student_Items
                }
            }

            if(skip>0){
                result.previous={page:page -1,
                limit:Num_Of_Student_Items
                }
            }

            result.totalPages=Math.ceil(count/Num_Of_Student_Items);
            result.totalDocyments=count;
            result.currentPage=page;
            result.documents=response;
            return res.status(200).json(result);
           
        }
        catch(error){
            console.log(error.message);
            return res.status(500).json(error);
        }
    }



}
module.exports= new admin;