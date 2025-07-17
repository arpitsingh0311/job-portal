import { JOB_API_ENDPOINT } from '@/components/utils/data';
import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGetAllJobs() {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector((state) => state.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,{
          withCredentials: true,
        });
        if(res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }

      } catch (error) {
        console.error(error);
      }
    }
    fetchAllJobs();
  },[]);
}

export default useGetAllJobs