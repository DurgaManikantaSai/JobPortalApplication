import jobModel from "../models/jobModel.js";
import mongoose, { mongo, startSession } from "mongoose";
import moment from "moment";
// import { query } from "express";

export const createJobController = async (req,res,next) => {
    const {company,position} = req.body;
    if(!company || !position) {
        next('please provide All fields');
    }
    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body)
    res.status(201).json({job});
};


// ******************** GET JOBS ********************
export const getAllJobsController = async (req,res,next) => {

    const {status,workType,search,sort} = req.query;

    //conditions for seraching filters
    const queryObject = {
      createdBy:req.user.userId
    }

    
    //logic filters
    if(status && status !== 'all'){
      queryObject.status = status
    }
    if(workType && workType !== 'all'){
      queryObject.workType = workType;
    }

    if(search){
      queryObject.position = {$regex: search, $options:'i'}
    }


    let queryResult = jobModel.find(queryObject);

    //sorting
    if(sort === 'latest'){
        queryResult = queryResult.sort('-createdAt');
    }
    if(sort === 'oldest'){
        queryResult = queryResult.sort('createdAt');
    }
    if( sort === "a-z"){
      queryResult = queryResult.sort("position");
    }
    if(sort === 'A-Z'){
      queryResult = queryResult.sort("-position");
    }


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit;

    queryResult = queryResult.skip(skip).limit(limit)

    //jobs count
    const totalJobs = await jobModel.countDocuments(queryResult);
    const numOfPage  = Math.ceil(totalJobs/limit)
    const jobs = await queryResult;

    res.status(200).json({
        totalJobs,
        jobs,
        numOfPage,
    })
}


// ============ UPDATE JOBS ==================
export const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;
    //validation
    if (!company || !position) {
      next("Please Provide All Fields");
    }
    //find job
    const job = await jobModel.findOne({ _id: id });
    //validation
    if (!job) {
      next(`no jobs found with this id ${id}`);
    }
    if (!req.user.userId === job.createdBy.toString()) {
      next("Your Not Authorized to update this job");
      return;
    }
    const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    //res
    res.status(200).json({ updateJob });
  };

  
// ***************** DELETE JOBS ************************
export const deleteJobController = async (req,res,next) => {
    const {id} = req.params;
    
    const job = await jobModel.findOne({_id:id})

    //validation 
    if(!job){
        next(`No Job is Found with Id ${id}`);
    }

    if(!req.user.userId === job.createdBy.toString()){
        next('You are not Authorized to delete this job');
        return ;
    }

    await job.deleteOne();
    res.status(200).json({
        message:"Success, Job Deleted"
    })
}



// ---------------------- JOB STATS ------------------------
export const jobStatsController = async (req, res) => {
  const stats = await jobModel.aggregate([
    // search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  //monthly yearly stats
  let monthlyApplication = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    // Simplified moment usage
    const date = moment({
      year: year,
      month: month - 1,
    }).format("MMM Y");
    return { date, count };
  }).reverse();



  res
    .status(200)
    .json({ totlaJob: stats.length, defaultStats, monthlyApplication });
};