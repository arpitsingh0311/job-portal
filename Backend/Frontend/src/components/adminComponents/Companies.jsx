import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import CompaniesTable from "./CompaniesTable.jsx";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies.jsx";
import { useDispatch } from "react-redux";
import { searchCompanyByText } from "@/redux/companySlice.js";

function Companies() {
  const navigate = useNavigate();
  useGetAllCompanies();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(searchCompanyByText(input));
  },[input]);

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
          <Button onClick={() => navigate("/admin/companies/create")}>
            Add Company
          </Button>
        </div>
        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
}

export default Companies;
