import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { PiBuildingOfficeLight } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    // setQuery(""); 
    navigate("/browse");
  }
  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <span className="flex items-center justify-center gap-2 px-4 py-2 mx-auto rounded-full bg-gray-200 text-[#fa4f09] font-md">
            <PiBuildingOfficeLight />
            No.1 Job Hunt Website
          </span>
          <h2 className="text-5xl font-bold">
            Search Apply & <br />
            Get your <span className="text-[#6a38c2]">Dream Job</span>
          </h2>
          <p>
            Start your hunt for the best, life-changing career opportunities
            from here in your <br /> selected areas conveniently and get hired
            quickly.
          </p>
          <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full"
            />
            <Button onClick={searchJobHandler} className="rounded-r-full">
              <Search className="h-5 w-7"></Search>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header