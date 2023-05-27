const db = require("../Models/index");

const admin = db.admin;

const signUp = (req,res)=>{
    async function signUpAdmin(){
    var postData = req.body;
    let data = await admin.create({'first_name':postData.first_name,'middle_name':postData.middle_name,'last_name':postData.last_name,'mobile_number':postData.mobile_number,'email':postData.email,'password':postData.password}); 
     res.status(200).send(data) 
    };
return signUpAdmin();
}
 module.exports={signUp}