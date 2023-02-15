"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="h-screen flex flex-col bg-[#343541] items-center justify-center text-center text-white">
      <Image
        src="/chatgptLogoTs.svg"
        width={40}
        height={40}
        alt="logo"
        className="mb-5"
      />
      <p className="mb-2">Welcome to ChatGPT</p>
      <p>Log in continue</p>
      <button
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000/chat" })
        }
        className="text-white font-semibold text-md bg-[#10a37f] hover:bg-[#1a7f64d9] rounded-md mt-2 px-5 py-2"
      >
        Log In
      </button>
    </div>
  );
}

export default Login;
