import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJobs from "./AppliedJobs.jsx";
import EditProfileModel from "./EditProfileModel.jsx";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";

function Profile() {
  const isResume = true;
  useGetAllAppliedJobs();
  const user = useSelector( (state) => state.auth.user );

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 cursor-pointer">
              <AvatarImage src={user?.profile?.profilePhoto} alt="Avatar" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="">
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1 mt-2">
              {user?.profile?.skills.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span>No skills found</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-md font-bold">Resume</label>
            <div>
              {isResume ? (
                <Button>
                  <a
                    target="_blank"
                    href={user?.profile?.resume}
                    download={"resume.pdf"}
                  >
                    Download
                  </a>
                </Button>
              ) : (
                <Button>Upload</Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-lg font-bold">Applied Jobs</h1>
        {/* Add application table */}
        <AppliedJobs />

        {/* Edit Profile Model */}
        <EditProfileModel open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Profile;
