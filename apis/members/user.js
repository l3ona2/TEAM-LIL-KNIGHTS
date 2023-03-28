//create express adminsApi
const exp=require("express");
const usersApi=exp.Router();

//user api
//import express async handler
const expressAsyncHandler=require("express-async-handler")

//import userToken
const userToken=require("../middlewares/userToken")

//using middleware
usersApi.use(userToken)

//post active log
usersApi.post("/activitylog",expressAsyncHandler(async(request,response)=>{

	//get user from client
	const activitylog=request.body;

	//get collections object
	const activitylogCollection=request.app.get("activitylogCollection");

	//insert in db
	await activitylogCollection.insertOne(activitylog);
	response.status(200).send({message:"activitylog posted"})

}))


//access reports
usersApi.get("/get-reports",expressAsyncHandler(async(request,response)=>{

	//get collections object
	const reportsCollection=request.app.get("reportsCollection");


	//find user by username
	let reports=await reportsCollection.find().toArray();

	//send response
	response.status(200).send({message:"reports",payload:reports});
}))

//export
module.exports=usersApi;