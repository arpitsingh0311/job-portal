import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable.jsx";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs.jsx";
import { setSearchJobByText } from "@/redux/jobSlice.js";

function AdminJobs() {
  const navigate = useNavigate();
  useGetAllAdminJobs();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/jobs/post")}>
            Post new Job
          </Button>
        </div>
        <div>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
}

export default AdminJobs;
