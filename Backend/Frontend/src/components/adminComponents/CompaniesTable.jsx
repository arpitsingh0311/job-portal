import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const { companies = [] } = useSelector((state) => state.company || {});
  const {searchCompanyByText} = useSelector((state) => state.company);
  const [filter,setFilter] = useState(companies);
  const navigate = useNavigate();

  useEffect(() =>{
    const filterCompanies = companies.length>0 && 
    companies.filter((company) => {
      if(!searchCompanyByText){
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    })
    setFilter(filterCompanies);
     
  },[companies,searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>Your registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filter.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <span>No Companies registered yet.</span>
              </TableCell>
            </TableRow>
          ) : (
            filter.map((company) => (
              <TableRow key={company?._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company?.logo ||
                        "https://plus.unsplash.com/premium_vector-1736784542990-e7e0d098ebb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGpvYiUyMHBvcnRhbCUyMGxvZ298ZW58MHx8MHx8fDA%3D"
                      }
                      alt="company logo"
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
