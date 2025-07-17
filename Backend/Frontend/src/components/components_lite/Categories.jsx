import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



// category related to computer science jobs
const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "AI Engineer",
  "Machine Learning",
  "Full Stack Developer",
  "Product Manager",
  "UI/UX Designer",
  "Project Manager",
  "Business Analyst",
  "Cybersecurity",
  "DevOps Engineer",
  "Mobile Developer",
  "Game Developer",
  "Game Designer",
  "Software Engineer",
  "Network Security",
];

function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    // setQuery("");
    navigate("/browse");
  };
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Categories
        </h2>
        <p className="text-center text-gray-600 my-4">
          Explore the wide variety of job roles in computer science.
        </p>
      </div>
      <Carousel className="w-full max-w-xl mx-auto my-12">
        <CarouselContent>
          {Category.map((category, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button onClick={()=>searchJobHandler(category)} >{category}</Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Categories;
