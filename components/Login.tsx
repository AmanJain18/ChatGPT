"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
function Login() {
  return (
    <div className="h-screen flex flex-col bg-[#11a37f] items-center justify-center text-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={250}
        height={250}
        alt="logo"
      />
      <button
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000/chat" })
        }
        className="text-white font-bold animate-pulse text-2xl"
        // onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
}

export default Login;
