import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import AboutPage from "./pages/AboutPage/AboutPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import HomePage from "./pages/HomePage/HomePage";
import ResumePage from "./pages/ResumePage/ResumePage";
import ErrPage from "./pages/ErrPage/ErrPage";

import img1 from "./imgs/almis_gallery/1.jpeg";
import img2 from "./imgs/almis_gallery/2.jpeg";
import img3 from "./imgs/almis_gallery/3.jpeg";
import img4 from "./imgs/almis_gallery/4.jpeg";
import img4_5 from "./imgs/almis_gallery/4.jpg";
import img5 from "./imgs/almis_gallery/5.jpeg";
import img6 from "./imgs/almis_gallery/6.jpeg";
import img7 from "./imgs/almis_gallery/7.jpeg";
import img8 from "./imgs/almis_gallery/8.jpeg";
import img9 from "./imgs/almis_gallery/9.jpeg";
import img10 from "./imgs/almis_gallery/10.jpeg";
import img11 from "./imgs/almis_gallery/11.jpeg";
import img12 from "./imgs/almis_gallery/12.jpeg";
import img13 from "./imgs/almis_gallery/13.jpeg";
import img14 from "./imgs/almis_gallery/14.jpeg";
import img15 from "./imgs/almis_gallery/15.jpg";
import img16 from "./imgs/almis_gallery/16.jpg"

const galleryImages = {img1, img2, img3, img4, img4_5, img5, img6, img7,img8, img9, img10, img11, img12, img13, img14, img15, img16}

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
        <Route path="/gallery" exact={true} element={<GalleryPage galleryImages={galleryImages}/>} />
        <Route path="/err" exact={true} element={<ErrPage />} />
        <Route path="*" element={<Navigate to="/err" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
