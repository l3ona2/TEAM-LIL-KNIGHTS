//import jwt
const jwt=require("jsonwebtoken")

const adminToken=(request,response,next)=>{
	//token verification
	//get bearer
	let bearerToken=request.headers.authorization;
	console.log()

	//if bearer doesn't exist
	if(bearerToken===undefined){
		response.send({message:"Unauthorized request"})
	}
	//if bearer exist
	else{
		//get token
		let token=bearerToken.split(" ")[1]
		console.log(token);
		try{
			jwt.verify(token,"adminlogin123");
			next();
		}catch(err){
			console.log("**")
			response.send({message:err})
		}
	}
}

//export
module.exports=adminToken;