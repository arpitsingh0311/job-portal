import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import FilterCard from "./FilterCard.jsx";
import Job from "./Job.jsx";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Jobs() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter(
        (job) =>
          job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description
            ?.toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.salary.toString().includes(searchedQuery.toLowerCase()) ||
          job?.experience?.toString().includes(searchedQuery.toLowerCase())
      );
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[15%]">
            <FilterCard />
          </div>
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {filterJobs.length === 0 ? (
              <div className="flex items-center justify-center h-full text-xl font-medium text-gray-500">
                No jobs found
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-8">
                {filterJobs.map((job) => (
                  <motion.div initial={{opacity:0,x:1}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.5}}
                   key={job?._id}>
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
