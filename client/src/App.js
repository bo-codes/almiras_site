import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import AboutPage from "./pages/AboutPage/AboutPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import HomePage from "./pages/HomePage/HomePage";
import ResumePage from "./pages/ResumePage/ResumePage";
import ErrPage from "./pages/ErrPage/ErrPage";

const App = () => {
  return (
    <>
      <NavBar />
      {/* {showEnlargedImg && (
        <div>show</div>
      )} */}
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/about" exact={true} element={<AboutPage />} />
        <Route path="/resume" exact={true} element={<ResumePage />} />
        <Route path="/gallery" exact={true} element={<GalleryPage />} />
        <Route path="/err" exact={true} element={<ErrPage />} />
        <Route path="*" element={<Navigate to="/err" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
