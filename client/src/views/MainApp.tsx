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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import emojiStorage from "@/functions/emojis";

export default function MainApp() {
  let listener: { id: number; name: string; dp: string } | null = null;

  // States

  const [sendShow, setSendShow] = useState(
    <>
      <Image size={28} color="#393939" />
      <Sparkles size={28} className="cursor-pointer" onClick={sendSparkle} />
    </>
  );

  const [emoji, setEmoji] = useState(emojiStorage.smilys);
  const [showEmo, setshowEmo] = useState(true);

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

  interface Message {
    user: string;
    message: string;
  }
  const [messages, setMessages] = useState<Array<Message>>();

  const sendShowBasic = (
    <>
      <Image size={28} color="#393939" />
      <Sparkles size={28} className="cursor-pointer" onClick={sendSparkle} />
    </>
  );

  function mainInpChange() {
    if (mainInp.current) {
      if (mainInp.current.value == "") {
        setSendShow(sendShowBasic);
      } else {
        setSendShow(
          <Send size={28} onClick={sendText} className="cursor-pointer" />
        );
      }
    }
  }

  const chatDiv = useRef<HTMLDivElement>(null);
  const sendText = () => {
    if (mainInp.current) {
      if (mainInp.current.value != "") {
        const finalInpVal = mainInp.current.value;
        const finalData = {
          user: localStorage.getItem("username"),
          message: finalInpVal,
        };

        socket.emit("talk", finalData, () => {});
        mainInp.current.value = "";
      }
    }
  };
  function sendSparkle() {
    console.log("lol");
    const finalData = {
      user: localStorage.getItem("username"),
      message: "✨",
    };

    socket.emit("talk", finalData, () => {});
  }

  socket.on("serve", (data) => {
    setMessages(data);
    if (chatDiv.current) {
      requestAnimationFrame(() => {
        chatDiv.current!.scrollTop = chatDiv.current!.scrollHeight;
      });
    }
  });

  socket.on("connect", () => {
    socket.emit("fresh");
    if (chatDiv.current) {
      requestAnimationFrame(() => {
        chatDiv.current!.scrollTop = chatDiv.current!.scrollHeight;
      });
    }
  });

  function checkEnter(event: React.KeyboardEvent) {
    if (event.key == "Enter") {
      sendText();
    }
  }
  function reSetIcons() {
    console.log("taken aways");
    if (mainInp.current) {
      if (mainInp.current.value == "") {
        setSendShow(sendShowBasic);
      }
    }
  }

  function checkEmoji(str: string) {
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25B6}\u{25C0}\u{25FB}\u{25FC}\u{25FD}\u{25FE}\u{2B05}\u{2B06}\u{2B07}\u{2194}-\u{2199}\u{21A9}\u{21AA}\u{2139}\u{2328}\u{231A}\u{231B}\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{24C2}\u{25AA}\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2600}-\u{27BF}\u{2B50}\u{2B55}]/gu;

    if (str.length == 1 && emojiRegex.test(str)) {
      return <span className="text-4xl">{str}</span>;
    } else {
      return str;
    }
  }

  //EMojiBox

  const emojimenu = [
    {
      icon: "🙂",
      label: "Smily",
      func: () => {
        setEmoji(emojiStorage.smilys);
      },
    },
    {
      icon: "🧑‍🦲",
      label: "People",
      func: () => {
        setEmoji(emojiStorage.people);
      },
    },
    {
      icon: "🐵",
      label: "Animals and nature",
      func: () => {
        setEmoji(emojiStorage.animals);
      },
    },
    {
      icon: "🍎",
      label: "Food and drink",
      func: () => {
        setEmoji(emojiStorage.food);
      },
    },
    {
      icon: "🚗",
      label: "Travel and places",
      func: () => {
        setEmoji(emojiStorage.travel);
      },
    },
    {
      icon: "⚽",
      label: "Activities and events",
      func: () => {
        setEmoji(emojiStorage.activities);
      },
    },
    {
      icon: "🎒",
      label: "Objects",
      func: () => {
        setEmoji(emojiStorage.objects);
      },
    },
    {
      icon: "#️⃣",
      label: "Symbols",
      func: () => {
        setEmoji(emojiStorage.symbols);
      },
    },
    {
      icon: "🏳️",
      label: "Flags",
      func: () => {
        setEmoji(emojiStorage.flags);
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="h-dvh w-full pt-[64px] flex flex-row justify-start items-start">
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
          <div
            className="h-[80%] w-full overflow-y-auto custom-scrollbar"
            ref={chatDiv}
          >
            {messages?.map((item, index) => (
              <div
                className="sender px-4 py-4 flex flex-col flex-wrap justify-start items-start border-t"
                key={index}
              >
                <p className="px-4 pb-4 font-semibold text-zinc-600 capitalize">
                  {item.user}
                </p>
                <div className="w-full flex flex-row flex-wrap justify-start items-start">
                  <div className="w-[20%] md:w-fit px-4">
                    <Avatar>
                      {item.user == "shafayat" ? (
                        <AvatarImage src={users.shafayat.dp} />
                      ) : (
                        <AvatarImage src={users.user.dp} />
                      )}
                    </Avatar>
                  </div>
                  <p className="w-[80%] md:w-[85%] message break-words font-arialEmoji">
                    {item.message.length === 1
                      ? checkEmoji(item.message)
                      : item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[64px] w-full relative">
            <div className="h-[64px] w-full md:flex flex-wrap justify-center items-center ">
              <div className="h-4/5 absolute md:relative bottom-0 left-[50%] translate-x-[-50%] md:left-0 md:translate-x-0 w-[90%] mx-auto md:w-4/5 mb-6 border rounded-full bg-background flex flex-row flex-wrap justify-between items-center">
                <div className="w-[16%] md:w-[6%] h-full flex flex-wrap justify-center items-center ">
                  {/* EmojiBox */}
                  <div
                    className={
                      showEmo
                        ? "hidden"
                        : "" +
                          `absolute bottom-[64px] left-0 h-[212px] w-[90dvw] md:h-[352px] md:w-[612px] bg-background border-2 border-zinc-800 rounded-md p-[4px]`
                    }
                  >
                    <div className="h-[200px] w-full md:h-[340px] md:w-[600px] bg-zinc-900 rounded-sm flex flex-wrap flex-col md:flex-row-reverse justify-start items-start">
                      <div className="emojiScroller h-[160px] w-full md:h-full md:w-[540px] bg-zinc-800 overflow-y-auto">
                        <div className=" h-full w-full font-emoji text-2xl grid  grid-cols-6 md:grid-cols-10 gap-1 md:gap-2 justify-center items-center">
                          {emoji.map((item, index) => (
                            <span
                              className="aspect-square flex justify-center items-center"
                              key={index}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="h-[40px] w-full md:h-full md:w-[60px] bg-zinc-900 flex flex-wrap flex-row md:flex-col justify-start items-start font-emoji text-xl">
                        {emojimenu.map((item, index) => (
                          <span
                            key={index}
                            className="w-[calc(100%/9)] h-[40px] md:w-full md:h-[calc(100%/9)] flex flex-wrap justify-center items-center"
                            onClick={item.func}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>{item.icon}</TooltipTrigger>
                                <TooltipContent>{item.label}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Smile
                    size={28}
                    className="cursor-pointer"
                    onClick={() => {
                      if (showEmo) {
                        setshowEmo(false);
                      } else {
                        setshowEmo(true);
                      }
                    }}
                  />
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  className="w-[60%] md:w-4/5 py-3 font-poppins bg-inherit outline-none"
                  placeholder="Message.."
                  ref={mainInp}
                  onChange={mainInpChange}
                  onKeyDown={checkEnter}
                  onBlur={reSetIcons}
                  autoComplete="off"
                  autoSave="off"
                  autoCorrect="off"
                />
                <div className="w-[22%] md:w-[10%] h-full flex flex-row justify-center items-center pr-4 space-x-2 md:space-x-2">
                  {sendShow}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
