//importing express module
const exp=require("express");
const app=exp();
app.listen(4002,()=>console.log("server running on port number 4002"));

//import express async handler
const expressAsyncHandler=require("express-async-handler")

//import jwt
const jwt=require("jsonwebtoken")

//import usersApi and adminsApi
const usersApi=require("./apis/members/user")
const adminsApi=require("./apis/members/admin")

//body parser
app.use(exp.json())

//import path
//const path=require("path")
//connect to front-end
//app.use(exp.static(path.join(__dirname,"./build")))


//get mongo client
const mclient=require("mongodb").MongoClient;
mclient.connect("mongodb://127.0.0.1:27017")
.then(dbRef=>{
	//get db
	dbObj=dbRef.db("hackathondb");
	console.log("DB connected successfully");
	//get club members collection
	let clubMembersCollection=dbObj.collection("clubMembersCollection");
	app.set("clubMembersCollection",clubMembersCollection);
	//get admins collection
	let eventsCollection=dbObj.collection("eventsCollection");
	app.set("eventsCollection",eventsCollection)
	//get admins collection
	let activitylogCollection=dbObj.collection("activitylogCollection");
	app.set("activitylogCollection",activitylogCollection)
	//get admins collection
	let reportsCollection=dbObj.collection("reportsCollection");
	app.set("reportsCollection",reportsCollection)
	//get admins collection
	let adminsCollection=dbObj.collection("adminsCollection");
	app.set("adminsCollection",adminsCollection)
})
.catch(err=>{console.log("err in connecting to DB",err)})

//public routes
//user login
//public route
app.post("/login",expressAsyncHandler(async(request,response)=>{

	//get user credentials
	const userCredentialsObj=request.body;

	console.log(userCredentialsObj)

	if(userCredentialsObj.post==="user"){
	//get collections object
	const clubMembersCollection=request.app.get("clubMembersCollection");

	//find in db
	let userOfDB=await clubMembersCollection.findOne({username:userCredentialsObj.username})

	//if username is invalid
	if(userOfDB===null){
		response.status(200).send({message:"Invalid username"})
	}
	//if username is valid
	else{

		//if passwords doesn't match
		if(userOfDB.password!==userCredentialsObj.password){
			response.status(200).send({message:"Invalid password"})
		}
		//if passwords match
		else{
			//create JWT token
			let signedJWTToekn=jwt.sign({username:userOfDB.username},"userlogin123",{expiresIn:"1h"})

			//send token in response
			response.status(200).send({message:"Login success",payload:signedJWTToekn})

		}
	}}
	else{
	//get collections object
	const adminsCollection=request.app.get("adminsCollection");

	//find in db
	let userOfDB=await adminsCollection.findOne({username:userCredentialsObj.username})
	console.log(userOfDB)

	//if username is invalid
	if(userOfDB===null){
		response.status(200).send({message:"Invalid username"})
	}
	//if username is valid
	else{

		//if passwords doesn't match
		if(userOfDB.password!==userCredentialsObj.password){
			response.status(200).send({message:"Invalid password"})
		}
		//if passwords match
		else{
			//create JWT token
			let signedJWTToekn=jwt.sign({username:userOfDB.username},"adminlogin123",{expiresIn:"1d"})

			//send token in response
			response.status(200).send({message:"Login success",payload:signedJWTToekn})

		}
	}
	}
}))

//public routes
app.get("/get-users",expressAsyncHandler(async(request,response)=>{


	//get collections object
	const adminsCollection=request.app.get("adminsCollection");
	//get collections object
	const clubMembersCollection=request.app.get("clubMembersCollection");

	//from CSI
	let CSIMembers=await clubMembersCollection.find({club:"CSI"}).toArray()
	let CSIAdmins=await adminsCollection.find({club:"CSI"}).toArray()

	//send response
	response.status(200).send({message:"CSI members",payload:[CSIMembers,CSIAdmins]});
}))

//events
app.get("/get-events",expressAsyncHandler(async(request,response)=>{

	//get collections object
	const eventsCollection=request.app.get("eventsCollection");


	//find user by username
	let events=await eventsCollection.find().toArray();

	//send response
	response.status(200).send({message:"Events",payload:events});
}))
//forward request to usersApi when url starts with /users-api
app.use("/users-api",usersApi);

//forward request to admins Api when url starts with /admins-api
app.use("/admins-api",adminsApi);

