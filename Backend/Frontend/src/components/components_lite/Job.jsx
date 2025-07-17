import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Job = ({ job })=> {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer transition delay-150 duration-500 ease-in-out hover:shadow-2xl hover:shadow-blue-200 hover:p-3">
        <div className="flex justify-between items-center">
          {job?.createdAt && (
            <p className="text-sm text-gray-600">
              {formatDistanceToNow(new Date(job.createdAt), {
                addSuffix: true,
              })}
            </p>
          )}{" "}
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 my-2">
          <div>
            <div className="flex gap-6">
              <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                  <AvatarImage src={job?.company?.logo || "https://img.freepik.com/free-vector/young-man-with-glasses-illustration_1308-174706.jpg?semt=ais_items_boosted&w=740"}></AvatarImage>
                </Avatar>
              </Button>
              <div>
                <h1 className="text-lg font-medium">{job?.company?.name}</h1>
                <p className="text-sm text-gray-600">India</p>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg my-2">{job?.title}</h2>
              <p className="text-sm text-gray-600">
                {job?.description?.length > 100
                  ? `${job?.description?.substring(0, 100)}...`
                  : job?.description}
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
        </div>
        <div className="flex gap-4 items-center mt-4">
          <Button
            onClick={() => {
              // Handle click event
              navigate(`/description/${job?._id}`);
            }}
            variant="outline"
            className=" ronded-sm px-3 py-1.5"
            size="large"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            className="bg-[#fa4f09] text-white rounded-sm px-3 py-1.5"
            size="large"
          >
            Save for Later
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Job;
