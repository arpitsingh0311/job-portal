import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {

  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.role === "Recruiter"){
      navigate("/admin/companies")
    }
  }, []);

  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
