import React, { use } from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";


function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
 
  return (
    <div>
      <div className="max-w-7xl mx-auto my-20">
        <h2 className="text-4xl font-bold">
          <span className="text-[#6a38c2]">Latest & Top </span>Job Openings
        </h2>
        {/* Job Cards */}
        <div className="grid grid-cols-3 gap-4 my-5">
          {allJobs.length <= 0 ? (
            <span>No jobs available.</span>
          ) : (
            allJobs
              .slice(0, 6)
              .map((job) => (
                <JobCards
                  
                  key={job._id}
                  job={job}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LatestJobs;
