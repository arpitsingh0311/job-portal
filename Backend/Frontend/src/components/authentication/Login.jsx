import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { setLoading, setUser } from "@/redux/authSlice";
function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if(user){
      navigate("/");
    }
  },[]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/3 border border-gray-400 rounder-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 items-center text-center text-blue-600">
            Login
          </h1>
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
          {loading ? (
            <Button>
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <button
              type="submit"
              className="block w-full  text-white rounded-md bg-blue-600 hover:bg-blue-800/90 py-3 my-3"
            >
              Login
            </button>
          )}

          <div className="text-gray-500 text-center text-sm mt-5 ">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 font-semibold">
              Sign up
            </Link>{" "}
            instead.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
