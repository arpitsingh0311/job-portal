import { APPLICATION_API_ENDPOINT } from "@/components/utils/data";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
  return null;
};

export default useGetAllAppliedJobs;