import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) formData.append("file", input.file);
    // send data to server
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "Server error";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/3 border border-gray-400 rounder-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 items-center text-center text-blue-600">
            Sign up
          </h1>
          <div className="my-2">
            <Label>Fullname</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="John Doe"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example123@gmail.com"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="*********"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="9876543210"
            ></Input>
          </div>
          <div className="flex items-center justify-between">
            <Label>Role</Label>
            <RadioGroup className="flex items-center justify-around gap-4 my-5 ">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2">
            <Label>Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
          {loading ? (
            <Button>
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <button
              type="submit"
              className="block w-full bg-primary text-white rounded-md hover:bg-primary/90 py-3 my-3"
            >
              Sign up
            </button>
          )}

          <div className="text-gray-500 text-center text-sm mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-semibold">
              Login
            </Link>{" "}
            instead.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
