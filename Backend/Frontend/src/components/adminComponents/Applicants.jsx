import React, { useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../utils/data";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setApplications } from "@/redux/applicationSlice";

function Applicants() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${id}/applicants`,
          {
            withCredentials: true,
          }
        );
        dispatch(setApplications(res.data.job));
      } catch (e) {
        console.error(e);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-10">
          Applicants ({applicants?.applications?.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
