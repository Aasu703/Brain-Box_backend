// importing a model
const Test =require('../model/Test')

//create functions to get all Test users
const getTest = async (requestAnimationFrame, res)=>{
    try{
        const tests = await Test.findAll();
        res.status(200).json(tests);
        console.log('Retreive all test users');
    }
    catch(error){
        res.status(500).json({error: 'Failed to retrive test data'});
    }
}

//create functions to create Test Users
const createTest = async (req, res)=>{
    try{
        const {username, password} = req.body;
        const newtest = await Test.create({username, password});
        res.status(200).json(newtest);
        console.log('New Test user Created')
    }
    catch(error){
        res.status(500).json({error: 'Failed to create test user'});
    }
}
