import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/themeprovider";
import Home from "./views/Home";
import MainApp from "./views/MainApp";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<MainApp />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
