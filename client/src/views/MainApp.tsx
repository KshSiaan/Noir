import Navbar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HomeIcon,
  CatIcon,
  Smile,
  Image,
  Sparkles,
  Send,
  LogOutIcon,
} from "lucide-react";
import { socket } from "@/socket";
import React, { useState, useRef, useEffect } from "react";
import { checkAccess } from "@/functions/functionalities";
import { useNavigate } from "react-router-dom";
import users from "@/functions/users";

export default function MainApp() {
  let listener: { id: number; name: string; dp: string } | null = null;

  if (localStorage.getItem("username") == "shafayat") {
    listener = users.user;
  } else if (localStorage.getItem("username") == "guest") {
    listener = users.shafayat;
  }

  const Navigate = useNavigate();
  useEffect(() => {
    const storageData = localStorage.getItem("username");

    if (checkAccess(storageData)) {
      // console.log("Its working fine with : " + storageData);
    } else {
      // console.log("Its not working right with : " + storageData);
      Navigate("/");
    }
    socket.emit("fresh");
  }, [Navigate]);

  const menuStuffs = [
    { icon: <HomeIcon />, lead: "Home" },
    { icon: <CatIcon />, lead: "Stuff" },
    {
      icon: <LogOutIcon />,
      lead: "Log Out",
      func: () => {
        localStorage.clear();
        Navigate("/");
      },
    },
  ];

  const mainInp = useRef<HTMLInputElement>(null);

  const [sendShow, setSendShow] = useState(
    <>
      <Image size={28} className="cursor-pointer" />
      <Sparkles size={28} className="cursor-pointer" />
    </>
  );
  interface Message {
    user: string;
    message: string;
  }
  const [messages, setMessages] = useState<Array<Message>>();

  function mainInpChange() {
    if (mainInp.current) {
      if (mainInp.current.value == "") {
        setSendShow(
          <>
            <Image size={28} className="cursor-pointer" />
            <Sparkles size={28} className="cursor-pointer" />
          </>
        );
      } else {
        setSendShow(
          <Send size={28} onClick={sendText} className="cursor-pointer" />
        );
      }
    }
  }

  const sendText = () => {
    if (mainInp.current) {
      const finalInpVal = mainInp.current.value;
      const finalData = {
        user: localStorage.getItem("username"),
        message: finalInpVal,
      };

      socket.emit("talk", finalData, () => {});
    }
    if (mainInp.current) {
      mainInp.current.value = "";
    }
  };

  socket.on("serve", (data) => {
    setMessages(data);
  });

  socket.on("connect", () => {
    socket.emit("fresh");
  });

  function checkEnter(event: React.KeyboardEvent) {
    if (event.key == "Enter") {
      sendText();
    }
  }

  return (
    <>
      <Navbar />

      <div className="h-screen w-full pt-[64px] flex flex-row justify-start items-start">
        <div className="hidden md:flex md:w-1/5 md:h-full md:text-zinc-400 md:border-r md:flex-col md:justify-between md:items-start">
          <div className="h-[90%] w-full">
            {menuStuffs.map((item, index) => (
              <div
                className="p-4 hover:bg-zinc-800 cursor-pointer"
                key={index}
                onClick={item.func}
              >
                <h4 className="text-md font-medium flex flex-row flex-wrap justify-start items-center">
                  {item.icon}
                  <p className="pl-2">{item.lead}</p>
                </h4>
              </div>
            ))}
          </div>
          <div className="h-[10%] w-full border-t flex flex-row justify-around items-center">
            <Avatar>
              <AvatarImage src={listener?.dp} alt="@shadcn" />
              <AvatarFallback>X</AvatarFallback>
            </Avatar>
            <div className="h-full w-2/3 flex flex-col flex-wrap justify-evenly items-start py-2">
              <h4 className="font-poppins font-semibold">{listener?.name}</h4>
              <span className="text-green-600">
                <p>...</p> <div className=""></div>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/5 h-full bg-background flex flex-col flex-wrap justify-end">
          <div className="h-[80%] w-full overflow-y-auto custom-scrollbar">
            {messages?.map((item, index) => (
              <div
                className="sender px-4 py-6 flex flec-row flex-wrap justify-start items-center border-t"
                key={index}
              >
                <div className="px-4">
                  <Avatar>
                    {item.user == "shafayat" ? (
                      <AvatarImage src={users.shafayat.dp} />
                    ) : (
                      <AvatarImage src={users.user.dp} />
                    )}
                  </Avatar>
                </div>
                <p className="w-[85%] message">{item.message}</p>
              </div>
            ))}
          </div>

          <div className="h-[74px] w-full  flex flex-wrap justify-center items-center">
            <div className="h-4/5 w-[90%] md:w-4/5 border rounded-full bg-inherit flex flex-row flex-wrap justify-between items-center">
              <div className="w-[12%]  md:w-[7%] h-full flex flex-wrap justify-center items-center ">
                <Smile size={28} />
              </div>
              <input
                type="text"
                name=""
                id=""
                className="w-[67%] md:w-4/5 py-3 font-poppins bg-inherit outline-none"
                placeholder="Message.."
                ref={mainInp}
                onChange={mainInpChange}
                onKeyDown={checkEnter}
              />
              <div className="w-[16%] md:w-[10%] h-full flex flex-row justify-center items-center pr-4 space-x-2 md:space-x-2">
                {sendShow}

                {/* <p className="font-medium text-blue-700">Send</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
