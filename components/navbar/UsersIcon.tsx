import { fetchProfileImage } from "@/lib/action";
import Image from "next/image";
import React from "react";
import { LuUser2 } from "react-icons/lu";

const UsersIcon = async () => {
  const profileImage = await fetchProfileImage();

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt="profile image"
        width={20}
        height={20}
        className=" rounded-full object-cover"
      />
    );
  }

  return <LuUser2 className="bg-primary text-white w-6 h-6 rounded-full" />;
};

export default UsersIcon;
