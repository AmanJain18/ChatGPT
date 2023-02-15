"use client";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
function Logout() {
  return (
    <div
      className="border-gray-700 border logoutbtn text-[0.5rem] md:text-base lg:text-lg"
      onClick={() => signOut({ callbackUrl: "http://localhost:3000/login" })}
    >
      <ArrowLeftOnRectangleIcon className="h-[10px] w-[10px] md:h-4 md:w-4" />
      <p>Log out</p>
    </div>
  );
}


export default Logout;
