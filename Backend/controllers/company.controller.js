import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName} = req.body;
    if (!companyName) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    res.status(200).json({
      message: `Company created successfuly ${companyName}`,
      company,
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


export const getAllCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No company found",
      });
    }

    return res.status(200).json({
      companies,
      success: true
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    return res.status(200).json({
      company,
      success: true
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
}

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location,logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    return res.status(200).json({
      message:"Company updated",
      company,
      success: true
    });


  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
}