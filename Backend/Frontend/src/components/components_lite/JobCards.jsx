import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

function JobCards({ job }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3"
    >
      <div>
        <h1 className="text-lg font-medium">{job?.company?.name}</h1>
        <p className="text-sm text-gray-600">India</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job?.title}</h2>
        <p className="text-sm text-gray-600">
          {job?.description?.length > 100
            ? `${job.description.substring(0, 100)}...`
            : job.description}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#6a38c2] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
        <Badge className="text-[#fa4f09] font-bold" variant="ghost">
          {job?.location}
        </Badge>
        <Badge className="text-black font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
      </div>
    </div>
  );
}

export default JobCards;
