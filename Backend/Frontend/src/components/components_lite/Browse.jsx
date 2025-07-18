import React, { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice.js';
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';

const Browse = () =>{

  useGetAllJobs();
  const {allJobs} = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(""));
  },[]);

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-10'>Serch Results {allJobs.length}</h1>
        <div className='grid grid-cols-3 gap-4 mt-5'>
        {
          allJobs.map((job) => {
            return <Job key={job?._id} job={job} />
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse