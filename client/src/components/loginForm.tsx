import { ReactNode, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const passInpRef = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const unRef = useRef<HTMLInputElement>(null);
  const Navigate = useNavigate();
  const [eye, setEye] = useState<ReactNode>(
    <img
      width="24"
      height="24"
      src="https://img.icons8.com/ios/30/ffffff/closed-eye.png"
      alt="closed-eye--v1"
    />
  );

  function changeVis() {
    if (passInpRef.current) {
      if (passInpRef.current.type === "password") {
        passInpRef.current.type = "text";

        setEye(
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios/30/ffffff/visible--v1.png"
            alt="visible--v1"
          />
        );
      } else {
        passInpRef.current.type = "password";
        setEye(
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios/30/ffffff/closed-eye.png"
            alt="closed-eye--v1"
          />
        );
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!unRef.current || !passInpRef.current) {
      return;
    }

    const finalUn = unRef.current.value;
    const finalpass = passInpRef.current.value;

    if (!finalUn || !finalpass) {
      console.error("Username or password is empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: finalUn,
          password: finalpass,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        localStorage.setItem("username", finalUn);
        Navigate("/app");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <form
        // action=""
        // method="post"
        className="md:w-1/2 h-2/3 mx-auto"
        id="loginForm"
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className="w-full h-full flex flex-col flex-wrap justify-around items-center bg-slate-100 dark:bg-inherit rounded-md">
          <h1 className="text-primary font-kolker text-6xl">
            Welcome to <span className="text-8xl">NoiR</span>
          </h1>

          <input
            type="text"
            name="username"
            id="username"
            className="bg-inherit border-b-2 border-slate-500 outline-none text-xl px-4 py-2 pr-8"
            placeholder="Username"
            ref={unRef}
          />
          <div className="border-b-2 border-slate-500 flex flex-row flex-wrap justify-between items-center">
            <input
              type="password"
              name=""
              className="bg-inherit outline-none w-[80%] text-xl px-4 py-2"
              placeholder="Password"
              ref={passInpRef}
            />
            <label htmlFor="passVis" className="cursor-pointer">
              {eye}
            </label>
            <input
              className="hidden"
              type="checkbox"
              name="passVis"
              id="passVis"
              onChange={changeVis}
            />
          </div>
          <button className="">
            <p>Log in</p>
            {
              <svg
                width="100"
                height="12"
                viewBox="0 0 313 12"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M109.029 5.47791C111.007 5.88791 112.726 6.44291 115.38 6.39691C116.156 6.38391 116.699 6.68991 116.63 6.99191C116.562 7.29091 115.78 7.33091 115.106 7.37191C114.086 7.43291 113.055 7.51291 112.034 7.51791C109.268 7.53191 106.486 7.64191 103.839 7.87591C96.6369 8.50291 89.361 8.77591 82.03 8.90091C80.42 8.93091 78.802 8.97491 77.367 9.28691C75.451 9.70391 73.542 9.86791 71.587 9.42691C71.198 9.33891 70.672 9.24791 70.337 9.35491C68.416 9.96891 66.0159 9.83191 63.7959 9.97691C63.1149 10.0209 62.173 10.0889 62.428 10.3799C63.102 11.1479 61.5079 11.1419 60.1579 11.1829C54.0949 11.3759 48.079 11.4199 42.053 11.1939C33.996 10.9019 26.179 10.3899 18.702 9.43391C17.763 9.31591 16.7019 9.25391 16.0549 8.97691C12.3489 7.38991 6.66696 6.65091 2.17496 5.39791C-0.44504 4.66691 -0.545049 4.40291 2.39995 3.71191C3.57595 3.43591 4.88196 3.25991 6.22396 3.11491C7.66696 2.95891 9.16296 2.83991 10.529 2.61991C16.212 1.69891 22.215 1.25291 28.233 0.863908C31.217 0.667908 34.827 0.560911 36.811 1.19191C39.876 2.16291 43.503 2.55891 47.299 2.95391C48.264 3.05491 49.155 3.25091 50.142 3.30191C56.161 3.60891 62.2209 3.79391 68.3989 3.47091C69.6689 3.40391 69.982 3.19191 69.182 2.85091C68.396 2.51591 67.4919 2.21291 66.5809 1.87491C67.5879 1.71591 68.304 1.77591 68.827 1.89591C70.062 2.18091 72.16 2.18691 71.514 3.07791C71.192 3.52291 72.785 3.62991 74 3.57991C75.254 3.52791 76.497 3.42391 77.747 3.34891C78.414 3.30791 78.6959 3.40391 78.9169 3.63091C79.9319 4.67591 82.54 5.08891 85.738 4.69491C87.17 4.51891 88.52 4.31191 90.075 4.41791C91 4.48091 91.946 4.40591 92.618 4.15091C93.384 3.85891 92.951 3.57491 92.521 3.29691C92.127 3.04291 92.421 2.83291 93.186 2.73791C94.082 2.62691 95.678 2.62691 95.53 2.89491C94.959 3.92891 98.3239 3.40591 98.9159 3.95491C99.0439 4.07291 99.7299 3.92291 100.038 3.79991C101.254 3.31291 102.789 3.30591 104.04 3.61991C105.761 4.05191 107.645 3.99591 109.586 3.98291L113.35 3.99891C113.807 4.00391 114.312 4.04191 114.391 4.22191C114.504 4.47791 113.883 4.55991 113.327 4.59391C111.184 4.72491 108.976 4.73391 106.427 5.16491C107.582 5.29991 108.388 5.34491 109.029 5.47791ZM95.173 5.49991C97.049 6.00891 99.212 5.74991 101.027 5.92491C101.854 6.00391 102.718 5.74591 103.207 5.19291C100.45 5.33591 97.936 4.95291 95.173 5.49991Z" />
                <path d="M243.731 7.13291C242.237 7.27091 241.414 7.02691 240.29 6.84291C237.664 6.41491 234.587 6.04091 232.089 6.59491C229.347 7.19991 227.487 7.23391 225.201 6.45991C223.757 5.97091 221.939 5.97291 220.314 6.40691C219.07 6.73891 217.844 6.77891 216.469 6.63091C215.46 6.52191 214.477 6.52391 213.428 6.56191C211.121 6.64391 210.991 6.58991 210.569 5.81191C209.705 4.22191 209.698 4.22891 205.116 3.76091C204.101 3.65691 203.089 3.66691 202.064 3.64891C201.158 3.63291 200.214 3.61091 199.838 3.13391C201.816 2.88091 204.077 3.38691 206.057 2.92591C205.263 2.53291 204.182 2.55891 203.212 2.48791C202.226 2.41591 201.023 2.43991 200.451 1.85891C203.043 1.95291 205.327 2.21191 207.591 1.87491C206.025 1.67991 205.16 1.0979 203.467 1.0739C201.796 1.0499 200.456 0.724907 198.894 0.611907C196.33 0.424907 193.77 0.157907 191.349 0.792907C191.304 0.804907 191.021 0.711907 190.793 0.653907C191.129 0.138907 192.255 -0.00109312 193.612 0.0149069C198.835 0.0839069 204.115 0.0499062 209.255 0.307906C212.577 0.473906 216.191 0.150905 219.272 0.850905C219.571 0.918905 220.202 0.877904 220.607 0.824904C222.334 0.598904 223.977 0.709907 225.636 0.902907C226.865 1.04591 228.106 0.986911 229.368 0.910911C232.835 0.698911 236.525 0.70191 239.453 1.28691C243.154 2.02391 246.337 1.09791 249.737 1.27991C249.869 1.28691 250.144 1.19091 250.198 1.12691C250.561 0.702906 251.347 0.76091 252.342 0.85691C253.765 0.99291 255.106 1.07691 256.18 1.53091C257.206 1.96591 258.76 2.26291 260.363 2.34891C260.821 2.15891 260.603 2.05891 260.416 1.96091C260.121 1.80691 259.546 1.65991 260.136 1.46791C260.501 1.34891 261.007 1.38191 261.409 1.46691C262.711 1.74291 264.208 1.78491 265.63 1.92591C268.158 2.17691 270.697 2.49791 272.783 3.05091C275.025 3.64791 277.425 3.82491 280.126 3.73791C282.606 3.65791 284.126 4.20491 285.574 4.76091C286.118 4.96991 285.764 5.14591 285.248 5.35091C282.506 6.44291 284.301 8.09191 288.624 8.28791C290.427 8.37091 292.234 8.41791 293.968 8.64491C294.381 8.69891 294.882 8.63491 294.963 8.43191C294.887 8.21491 294.385 8.11091 293.933 7.99191C293.439 7.86191 293.099 7.69791 293.535 7.50591C293.851 7.36691 294.343 7.42191 294.795 7.47391C296.248 7.64291 297.469 7.92191 298.483 8.31591C299.5 8.71191 300.496 9.13391 302.074 8.54291C302.605 8.34391 303.374 8.44091 303.93 8.60691C305.35 9.03091 307.033 9.07391 308.783 9.06891C309.922 9.06591 310.993 9.16391 312.142 9.44091C310.061 9.66391 308.227 9.50591 306.419 9.51391C298.903 9.54591 291.427 9.29491 283.934 9.08991C281.585 9.02291 279.163 8.83991 276.805 8.95991C274.897 9.05691 273.226 9.04891 271.643 8.60491C270.847 8.38091 269.427 8.17891 268.78 8.39191C266.725 9.06791 265.043 8.54891 263.284 8.29491C260.431 7.88291 257.494 7.77491 254.576 8.06791C252.933 8.23191 252.108 8.1319 251.251 7.6299C250.14 6.9809 248.094 6.92091 246.405 7.41491C245.993 7.53491 245.72 7.7099 245.4 7.8519C243.74 7.7369 245.661 6.95591 243.731 7.13291ZM272.348 6.2409C273.968 6.4209 275.565 6.64591 277.22 6.77291C279.334 6.93591 281.701 6.06091 281.243 5.33191C281.118 5.13191 280.736 4.98191 280.172 4.91291C279.474 4.82791 279.222 5.00391 278.886 5.16791C277.436 5.87691 277.234 5.87491 275.746 5.16291C275.421 5.00691 275.124 4.83991 274.911 4.66491C274.584 4.39691 274.194 4.16391 273.2 4.22291C272.431 4.27091 272.153 4.47591 272.021 4.71891C271.837 5.05691 271.602 5.39191 271.362 5.76991C271.154 6.01691 271.619 6.1599 272.348 6.2409ZM218.948 1.51191C218.719 1.66391 218.922 1.8199 219.214 1.9359C219.498 2.0479 219.874 2.19291 220.25 2.20691C221.631 2.25991 222.456 2.52491 223.172 2.89591C223.56 3.09691 224.357 3.2039 224.945 3.0329C225.666 2.8219 224.879 2.62091 224.573 2.44091C223.569 1.84991 222.111 1.45291 220.25 1.32091C219.603 1.31291 219.168 1.36491 218.948 1.51191ZM214.096 2.8109C213.877 3.0249 215.469 3.41691 216.627 3.42691C217.281 3.43191 217.846 3.30891 217.713 3.08691C217.441 2.62991 216.175 2.71691 215.31 2.64791C214.751 2.62591 214.282 2.6289 214.096 2.8109ZM241.893 2.36091C241.379 2.33891 241.012 2.43891 241.066 2.61991C241.117 2.79091 241.533 2.87291 242.009 2.89291C242.469 2.91191 242.894 2.88491 243.038 2.69591C242.946 2.47591 242.464 2.38491 241.893 2.36091ZM230.993 1.98291C231.047 1.74991 230.598 1.65591 229.969 1.67391C229.62 1.68391 229.332 1.77091 229.365 1.89791C229.41 2.07091 229.791 2.13991 230.274 2.15391C230.619 2.14691 230.966 2.10291 230.993 1.98291ZM223.448 4.61091C223.111 4.58891 222.732 4.60591 222.617 4.72291C222.491 4.85191 222.792 4.92691 223.144 4.94691C223.47 4.96591 223.811 4.9659 224 4.8109C224.032 4.7039 223.803 4.63391 223.448 4.61091Z" />
                <path d="M115.847 2.25791C115.109 2.30091 114.067 2.43991 113.832 2.06991C113.621 1.73791 114.621 1.63091 115.335 1.51691C116.095 1.39691 116.942 1.36191 117.684 1.47591C120.761 1.94591 124.065 1.30591 127.174 1.60791C127.445 1.63391 127.906 1.57791 128.137 1.50691C129.536 1.07791 131.136 1.20091 132.716 1.23991C135.69 1.31291 136.221 1.59691 134.646 2.43091C133.706 2.92891 133.423 3.40691 133.767 3.98591C136.475 3.99091 139.121 4.07091 140.472 3.00491C140.642 2.87091 141.226 2.80591 141.691 2.88691C142.191 2.97291 142.061 3.12391 141.95 3.28591C141.477 3.97591 141.784 4.21691 143.648 4.25191C146.666 4.30891 149.758 4.40391 152.691 3.81791C151.898 3.42791 151.408 3.05091 151.618 2.59891C151.707 2.40791 151.742 2.21091 151.706 2.01991C151.671 1.83191 151.622 1.62891 151.389 1.46491C151.063 1.23491 150.323 1.22291 149.628 1.18891C149.222 1.16891 148.549 1.33291 148.415 1.07891C151.019 0.670911 153.238 0.729907 155.19 1.48991C156.469 1.98591 158.321 2.20391 160.329 2.30091C163.245 2.44191 163.449 2.54191 163.245 3.54791C163.189 3.82591 163.367 3.99291 164.029 4.11191C168.413 4.90691 172.983 5.48391 178.118 5.15891C182.913 4.85591 187.401 5.34591 191.983 5.59991C192.668 5.63791 193.648 5.67991 193.48 6.22291C189.878 6.17791 186.241 6.30591 182.66 6.27391C176.618 6.21391 170.571 6.52791 164.529 6.25291C161.027 6.09491 157.432 6.39791 153.926 6.36991C149.193 6.32891 144.599 6.48491 139.993 6.85991C138.226 7.00391 136.385 7.14991 134.561 6.97891C133.318 6.86091 132.626 6.78091 133.006 6.12891C133.958 4.49491 131.487 3.82091 126.536 4.16191C125.823 4.21091 125.059 4.30191 124.329 4.06891C125.774 3.66791 127.856 3.87891 128.802 3.15491C124.923 2.11491 120.529 1.98791 115.847 2.25791ZM160.993 3.84991C161.333 3.45191 160.534 3.17191 159.535 3.06691C158.227 2.92991 156.896 3.15791 155.623 3.25791C154.945 3.31191 155.148 3.66391 155.645 3.83991C156.46 4.12791 157.589 4.19491 158.766 4.23391C159.635 4.20591 160.692 4.20391 160.993 3.84991ZM145.807 5.86491C146.475 5.80391 147.101 5.64991 146.789 5.36791C146.476 5.08491 145.812 5.09191 145.181 5.26091C144.274 5.50491 143.214 5.62791 141.508 5.84691C143.366 5.92691 144.597 5.97391 145.807 5.86491ZM137.367 5.85891C136.941 5.81091 136.428 5.79991 136.109 5.92091C135.81 6.03391 136.117 6.12191 136.456 6.14591C136.897 6.17691 137.35 6.18291 137.655 6.02591C137.562 5.96791 137.505 5.87491 137.367 5.85891Z" />
                <path d="M58.82 2.1329C58.227 2.1749 57.536 2.18591 57.472 2.43691C57.412 2.66991 57.972 2.7469 58.567 2.7779C58.903 2.7959 59.255 2.8399 59.578 2.8199C60.54 2.7599 61.996 3.3409 62.365 2.6799C62.632 2.2009 60.863 2.24091 59.811 2.15891C59.484 2.13291 59.131 2.1399 58.82 2.1329Z" />
                <path d="M120.24 6.28691C120.668 6.71091 121.374 6.97291 122.646 7.00991C123.525 7.03491 124.31 6.97291 124.219 6.58791C124.155 6.31991 124.058 5.98691 122.85 6.14491C122.053 6.24991 121.262 6.03291 120.24 6.28691Z" />
                <path d="M182.184 3.90091C182.994 3.91391 183.69 3.83491 183.777 3.57591C183.867 3.30791 183.138 3.20791 182.475 3.15891C182.052 3.12791 181.591 3.12991 181.156 3.14591C180.593 3.16691 179.97 3.23291 179.895 3.44591C179.814 3.67291 180.436 3.73991 180.972 3.79391C181.394 3.83191 181.825 3.86991 182.184 3.90091Z" />
                <path d="M192.875 3.30491C192.727 3.16591 192.349 3.11491 191.883 3.15991C191.527 3.19391 191.344 3.30991 191.547 3.40891C191.701 3.48391 192.055 3.54391 192.333 3.54891C192.674 3.55591 192.923 3.46791 192.875 3.30491Z" />
              </svg>
            }
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;