"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR  from "swr";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [Prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  //TODO: UseSwr to get model from Api

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Prompt) return;

    const input = Prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );
    //* Toaster Notification to say Loading
    const notify = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      //* Toaster Notification to say success
      toast.success("ChatGPT has responded...",{
        id: notify,
      });
    });
  };

  return (
    <div className="bg-[#40414f] text-gray-400 rounded-md text-sm font-semiboldbold w-1/2 absolute top-[90%] left-1/3 shadow-shadowInput">
      <form onSubmit={sendMessage} className="p-3 space-x-5 flex">
        <input
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          value={Prompt}
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          disabled={!Prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-2 py-2 rounded disabled:bg-transparent disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      {/* //* Modal Selection */}
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
