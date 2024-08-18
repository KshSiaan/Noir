import { useEffect } from "react";
import LoginForm from "../components/loginForm";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/app");
    }
  }, [navigate]);

  return (
    <>
      <div className=" h-screen bg-no-repeat bg-cover object-cover w-screen flex flex-row flex-wrap justify-center items-center bg-slate-100 bg-gradient-to-bl from-slate-100 to-blue-500 dark:bg-background dark:bg-none font-poppins">
        <img
          className="invert absolute h-[200px] object-fill overflow-visible top-2 left-[52%] translate-x-[-50%]"
          src="/sleepingcat.gif"
          alt=""
        />
        <LoginForm />
      </div>
    </>
  );
}
