import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolkata",
      "Chennai",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Jaipur",
      "Lucknow",
      "Nagpur",
      "Surat",
      "Vadodara",
      "Ahmedabad",
      "Indore",
      "Visakhapatnam",
      "Bhopal",
      "Kanpur",
      "Ludhiana",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "MERN",
      "Frontend",
      "Backend",
      "Full Stack",
      "Data Science",
      "Machine Learning",
      "AI",
      "Blockchain",
      "DevOps",
      "Cyber Security",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-2 years", "2-5 years", "5-10 years", "10+ years"],
  },
  {
    filterType: "Salary(in LPA)",
    array: ["10", "12", "15", "20"],
  },
];

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value) => {
    setSelectedValue(value);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  },[selectedValue])
  return (
    <div className="w-full bg-white rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup onValueChange={handleChange} value={selectedValue} className="p-4"> 
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-bold text-lg">{data.filterType}</h2>
            {data.array.map((item, indx) => {
              const itemId = `id${index}-${indx}`; 
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId}></RadioGroupItem>
                  <label htmlFor={itemId}>{item}</label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
export default FilterCard;
