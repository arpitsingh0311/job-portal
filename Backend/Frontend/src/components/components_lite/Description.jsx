import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/data";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Description() {
  const params = useParams();
  const jobId = params.id; // Assuming jobId is a unique identifier for each job
  const { singleJob } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  
  const isInitiallyApplied =
  singleJob?.applications?.some(
    (application) => application?.applicant === user?._id
  ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  // const [isApplied, setIsApplied] = useState(false);

  
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        console.log(res.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);



  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex gap-2 items-center mt-4">
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.position} Position
              </Badge>
              <Badge className="text-[#6a38c2] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
              <Badge className="text-[#fa4f09] font-bold" variant="ghost">
                {singleJob?.location}
              </Badge>
              <Badge className="text-black font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
            </div>
          </div>
          <div>
            <Button
              disabled={isApplied}
              onClick={isApplied ? null : applyJobHandler}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#6a38c2] hover:bg-[#6a38c2]/80 transition-all duration-300 ease-in-out"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-medium py-4 my-3">
          Job Description
        </h1>
        <div>
          <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
            {singleJob?.description}
          </h1>
          <div className="my-4">
            <h1 className="font-bold my-1 ">
              Role:{" "}
              <span className=" pl-4 font-normal text-gray-800">
                {singleJob?.title}
              </span>
            </h1>
            <h1 className="font-bold my-1 ">
              Positions Open:{" "}
              <span className=" pl-4 font-normal text-gray-800">
                {singleJob?.position}
              </span>
            </h1>
            <h1 className="font-bold my-1 ">
              Location:{" "}
              <span className=" pl-4 font-normal text-gray-800">
                {" "}
                {singleJob?.location}
              </span>
            </h1>
            <h1 className="font-bold my-1 ">
              Salary:{" "}
              <span className=" pl-4 font-normal text-gray-800">
                {singleJob?.salary} LPA
              </span>
            </h1>
            <h1 className="font-bold my-1 ">
              Experience:{" "}
              <span className=" pl-4 font-normal text-gray-800">
                {singleJob?.experienceLevel} Year
              </span>
            </h1>
            <h1 className="font-bold my-1 ">
              Total Applicants:{" "}
              <span className=" pl-4 font-normal text-gray-800">
                {singleJob?.applications?.length}
              </span>
            </h1>
            <h1 className="font-bold my-1 ">
              Job Type:
              <span className=" pl-4 font-normal text-gray-800">
                {singleJob?.jobType}
              </span>
            </h1>
            <h1 className="font-bold my-1 ">
              Post Date:
              <span className=" pl-4 font-normal text-gray-800">
                {singleJob?.createdAt?.split("T")[0]}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
