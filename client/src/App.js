import { Outlet } from "react-router-dom";
import Header from "./shared/header";
import { Footer } from "./shared/Footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
