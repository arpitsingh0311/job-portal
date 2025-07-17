import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-[#6a38c2]">Job</span>{" "}
            <span className="text-[#fa4f09]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Job</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-600 hover:bg-red-700">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-4 shadow-md rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="Avatar"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{user?.fullname}</h3>
                    <p className="text-xs text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-3 text-sm text-gray-700">
                  {user && user.role === "Student" && (
                    <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                      <User2 size={18} />
                      <Button
                        variant="link"
                        className="p-0 h-auto m-0 border-none rounded-none text-sm font-medium"
                      >
                        <Link to={"/profile"}>Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-2 hover:text-red-600 cursor-pointer">
                    <LogOut size={18} />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="p-0 h-auto"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
