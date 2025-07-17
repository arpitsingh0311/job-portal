import { Job } from "../models/job.model.js";

// ADMIN JOB POSTING

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      companyId,
      experience,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId ||
      !experience
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), 
      salary: Number(salary),
      location,
      jobType,
      position,
      company: companyId,       
      experience: Number(experience), 
      created_by: userId
    });
    return res.status(201).json({
      message: "Job posted successfully",
      job,
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { jobType: { $regex: keyword, $options: "i" } },
        { position: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
      path:"company",
    }).sort({createdAt:-1});

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(201).json({
      jobs,
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// USERS

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(201).json({
      job,
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ADMIN JOB
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      sort: { createdAt: -1 },
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(201).json({
      jobs,
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
