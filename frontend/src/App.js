import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AboutPage from "./pages/AboutPage/AboutPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import HomePage from "./pages/HomePage/HomePage";
import ResumePage from "./pages/ResumePage/ResumePage";


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact={true} element={<HomePage />}/>
        <Route path="/about" exact={true} element={<AboutPage />}/>
        <Route path="/resume" exact={true} element={<ResumePage />}/>
        <Route path="/gallery" exact={true} element={<GalleryPage />}/>
      </Routes>
    </>
  )
}

export default App;
