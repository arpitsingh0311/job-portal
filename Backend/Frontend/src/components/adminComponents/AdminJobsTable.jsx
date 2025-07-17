import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const { allAdminJobs = [] } = useSelector((state) => state.job || {});
  const { searchJobByText } = useSelector((state) => state.job);
  const navigate = useNavigate();
  console.log("job", allAdminJobs);
  // const [filter, setFilter] = useState(allAdminJobs);
  // useEffect(() => {
  //   const filteredJobs =
  //     allAdminJobs.length >= 0 &&
  //     allAdminJobs.filter((job) => {
  //       if (!searchJobByText) {
  //         return true;
  //       }
  //       return (
  //         job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
  //         job?.company?.name
  //           .toLowerCase()
  //           .includes(searchJobByText.toLowerCase())
  //       );
  //     });
  //   setFilter(filteredJobs);
  // }, [allAdminJobs, searchJobByText]);

  const filteredJobs = allAdminJobs.filter((job) => {
    if (!searchJobByText) return true;
    return (
      job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    );
  });

  return (
    <div>
      <Table>
        <TableCaption>Your registered Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <span>No Job registered yet.</span>
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mb-1"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <hr />
                      <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                       className="flex items-center gap-2 w-fit cursor-pointer mt-1">
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
