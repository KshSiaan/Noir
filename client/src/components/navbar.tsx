import { CatIcon, HomeIcon, LogOutIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../components/ui/sheet";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const Navigate = useNavigate();

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

  return (
    <>
      <nav className="absolute w-screen px-4 bg-background h-[64px] flex flex-row flex-wrap justify-between items-center text-primary">
        <div className="font-kolker text-4xl pl-4">
          <div className="glitch-wrapper">
            <div className="glitch" data-glitch="NoiR">
              NoiR
            </div>
          </div>
        </div>
        <div className="">
          <Sheet>
            <SheetTrigger className="h-[28px] w-[28px] flex flex-col justify-around items-end md:hidden">
              <span className="block w-[70%] h-[2px] bg-white border-2 border-white rounded-md"></span>
              <span className="block w-[40%] h-[2px] border-2 border-white rounded-md"></span>
              <span className="block w-[100%] h-[2px] border-2 border-white rounded-md"></span>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>Navigation</SheetHeader>
              <SheetDescription>
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
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
