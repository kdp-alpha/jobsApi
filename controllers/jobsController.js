import jobsModel from "../model/jobsModel.js";
import mongoose from "mongoose";

export const createJobController = async (req,res,next) => {
    const {company,position} = req.body;
    if(!company || !position){
        next('Please Provide All Fields');
    }

    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body);
    res.status(201).json({job});
};

export const getAllJobsController = async (req,res,next) => {
    const {status,workType,search,sort } = req.query

    const queryObject = {
        createdBy: req.user.userId
    }

  

    if(status && status !== 'all'){
        queryObject.status = status
    }

    if(workType && workType !== 'all'){
        queryObject.workType = workType;
    }

    if(search){
        queryObject.position = {$regex: search, $options: 'i'};
    }

    let queryResult = jobsModel.find(queryObject) 

    //sorting
    if(sort==='latest'){
        queryResult = queryResult.sort('-createdAt')
    }
    if(sort==='oldest'){
        queryResult = queryResult.sort('createdAt')
    }   

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip =  (page - 1) * limit;
    
    queryResult = queryResult.skip(skip).limit(limit)

    //jobs count
    const totalJobs = await jobsModel.countDocuments(queryResult)
    const numberOfPage = Math.ceil(totalJobs / limit);
    const jobs = await queryResult;

    // const jobs = await jobsModel.find({createdBy:req.user.userId});
    res.status(200).json({
        totalJobs,
        jobs,
        numberOfPage
    })
}                

export const updateJobsController = async (req,res,next) => {
    const {id} = req.params;
    const {company,position} = req.body;

    if(!company || !position){
        next('Please Provide All Fields');
    }

    //find jobs
    const job = await jobsModel.findOne({_id:id})

    //validation
    if(!job){
        next(`No jobs found for this id `)
    }

    if(!req.user.userId === job.createdBy.toString()){
        next('You are not authorized to update this job')
        return
    }

    const updateJobs = await jobsModel.findOneAndUpdate({_id:id},req.body,{
        new: true,
        runValidators:true
    })

    res.status(200).json({updateJobs});

}

export const deleteJobs = async (req,res,next) => {
    const {id} = req.params;
    const job = await jobsModel.findOne({_id:id});
    if(!job){
        next(`No Job Found With This ID ${id}`)
    }

    if(!req.user.userId === job.createdBy.toString()){
        next('You are not authorized to delete this job');
        return;
    }
    await job.deleteOne();
    res.status(200).json({message:"Success, Job Deleted"})
}   

export const jobsStatsController = async (req,res) => {
    const stats = await jobsModel.aggregate([
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: "$status",
                count:{$sum: 1}
            }
        }
    ])

    const defaultStats = {
        pending: stats.pending || 0,
        pending: stats.interview || 0,
        pending: stats.reject || 0,
    }

    console.log(defaultStats)

    res.status(200).json({ totalJobs:stats.length,defaultStats});
}