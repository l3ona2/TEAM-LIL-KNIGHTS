//create express adminsApi
const exp=require("express");
const adminsApi=exp.Router();

//user api
//import express async handler
const expressAsyncHandler=require("express-async-handler")




//import adminToken
const adminToken=require("../middlewares/adminToken")

//body parser
adminsApi.use(exp.json())

//using middleware
adminsApi.use(adminToken)


//register user
//protected route
adminsApi.post("/register",expressAsyncHandler(async(request,response)=>{

	//get user from client
	const newUser=request.body;
	
	if(newUser.post==="user"){
	//get collections object
	const clubMembersCollection=request.app.get("clubMembersCollection");

	//check for duplicate user
	let userOfDB=await clubMembersCollection.findOne({username:newUser.username});

	//if user existed
	if(userOfDB!==null){
		response.status(200).send({message:"user already existed"})
	}
	//if user doesn't exist
	else{

		//insert in db
		await clubMembersCollection.insertOne(newUser);
		response.status(200).send({message:"user registered"})
	}}

	else  if(newUser.post==="admin"){
		console.log(newUser)
	//get collections object
	const adminsCollection=request.app.get("adminsCollection");
	
	//check for duplicate user
	let userOfDB=await adminsCollection.findOne({username:newUser.username});

	//if user existed
	if(userOfDB!==null){
		response.status(200).send({message:"user already existed"})
	}
	//if user doesn't exist
	else{

		//insert in db
		await adminsCollection.insertOne(newUser);
		response.status(200).send({message:"user registered"})
	}}

}))



//remove user
//protected user
adminsApi.delete("/delete-user/:username",expressAsyncHandler(async(request,response)=>{

	//get username
	let usernameOfUrl=request.params;

	if(usernameOfUrl.post==="user"){
	//get collections object
	const clubMembersCollection=request.app.get("clubMembersCollection");

	//delete user
	await clubMembersCollection.deleteOne({username:usernameOfUrl.username})
	}
	else{

		//get collections object
		const adminsCollection=request.app.get("adminsCollection");

		//delete user
		await adminsCollection.deleteOne({username:usernameOfUrl.username})}

	//send response
	response.send({message:"member removed"})
}))
	

//generate report
//protected route
adminsApi.post("/generete-report",expressAsyncHandler(async(request,response)=>{

	//get user from client
	const report=request.body;

	//get collections object
	const reportsCollection=request.app.get("reportsCollection");

	//check for duplicate report
	let reportOfDB=await reportsCollection.findOne({heading:report.heading});

	//if user existed
	if(reportOfDB!==null){
		response.status(200).send({message:"report already existed"})
	}
	//if report doesn't exist
	else{

		//insert in db
		await reportsCollection.insertOne(report);
		response.status(200).send({message:"report generated"})
	}

}))

//delete report
adminsApi.delete("/delete-report/:heading",expressAsyncHandler(async(request,response)=>{

	//get collections object
	const reportsCollection=request.app.get("reportsCollection");

	//get heading
	let headingOfUrl=request.params;

	//delete user
	await reportsCollection.deleteOne({heading:headingOfUrl.username})
	

	//send response
	response.send({message:"report removed"})
}))





//post event
//protected route
adminsApi.post("/post-event",expressAsyncHandler(async(request,response)=>{

	//get user from client
	const event=request.body;

	//get collections object
	const eventsCollection=request.app.get("eventsCollection");

	//check for duplicate event
	let eventOfDB=await eventsCollection.findOne({name:event.name});

	//if user existed
	if(eventOfDB!==null){
		response.status(200).send({message:"event already existed"})
	}
	//if report doesn't exist
	else{

		//insert in db
		await reportsCollection.insertOne(event);
		response.status(200).send({message:"event generated"})
	}
	

}))

//delete event
adminsApi.delete("/delete-event/:name",expressAsyncHandler(async(request,response)=>{

	//get collections object
	const eventsCollection=request.app.get("eventsCollection");

	//get name
	let nameOfUrl=request.params;

	//delete user
	await reportsCollection.deleteOne({name:nameOfUrl.name})
	

	//send response
	response.send({message:"event removed"})
}))

adminsApi.get("/get-activitylog",expressAsyncHandler(async(request,response)=>{

	//get collections object
	const activitylogCollection=request.app.get("activitylogCollection");


	//find user by username
	let activitylog=await activitylogCollection.find().toArray();

	//send response
	response.status(200).send({message:"activitylog",payload:activitylog});
}))



//export module
module.exports=adminsApi;