import { useSession } from "next-auth/react";
import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";
  return (
    <div className={`py-6 text-white ${isChatGPT && "bg-[#444654]"}`}>
      <div className="flex space-x-6 px-8 max-w-2xl mx-auto">
        <img
          src={message.user?.avatar}
          alt="User Profile"
          className="h-8 w-8"
        />

        <p className="text-sm pt-1">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
