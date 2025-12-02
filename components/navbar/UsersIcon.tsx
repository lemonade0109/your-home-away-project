"use client";

import Image from "next/image";
import React from "react";
import { LuUser2 } from "react-icons/lu";
import { useUser } from "@clerk/nextjs";

const UsersIcon = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <LuUser2 className="bg-primary text-white w-6 h-6 rounded-full" />;
  }

  // Check for custom profile image in metadata first, then fall back to Clerk's image
  const profileImage =
    (user?.publicMetadata?.profileImage as string) || user?.imageUrl;

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt="profile image"
        width={30}
        height={30}
        className="rounded-full object-cover"
      />
    );
  }

  return <LuUser2 className="bg-primary text-white w-6 h-6 rounded-full" />;
};

export default UsersIcon;
