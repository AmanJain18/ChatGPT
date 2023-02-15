"use client";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import Logout from "./Logout";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );
  //* console.log(chats);
  //? To see the chats in the console
  return (
    <div className="h-screen p-2 flex flex-col">
      <div className="flex-1">
        <div>
          {/* New Chat  */}
          <NewChat />

          {/* //? Model Selection */}

          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
          <div className=" flex flex-col space-y-2">
            {loading && (
              <div className="text-white text-center mt-4 animate-pulse">
                <p>Loading Chats...</p>
              </div>
            )}
            {/* //* Map through the ChatRows */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div className="flex space-x-6 justify-center items-center mb-5">
            <img
              src={session.user?.image!}
              alt="Profile Icon"
              className="h-12 w-12 rounded-lg hover:opacity-70 justify-center items-center text-center"
            />
          <Logout/>
        </div>
      )}
    </div>
  );
}

export default SideBar;
