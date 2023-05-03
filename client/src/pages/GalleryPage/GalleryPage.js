import { useEffect, useState } from "react";
import ImgPrev from "../../components/ImgPrev/ImgPrev";
import { Modal } from "../../components/Modal/index.js";
import EnlargedImg from "../../components/EnlargedImg/EnlargedImg"
import img1 from "../../imgs/almis_gallery/1.jpeg";
import img2 from "../../imgs/almis_gallery/2.jpeg";
import img3 from "../../imgs/almis_gallery/3.jpeg";
import img4 from "../../imgs/almis_gallery/4.jpeg";
import img5 from "../../imgs/almis_gallery/5.jpeg";
import img6 from "../../imgs/almis_gallery/6.jpeg";
import img7 from "../../imgs/almis_gallery/7.jpeg";
import img8 from "../../imgs/almis_gallery/8.jpeg";
import img9 from "../../imgs/almis_gallery/9.jpeg";
import img10 from "../../imgs/almis_gallery/10.jpeg";
import img11 from "../../imgs/almis_gallery/11.jpeg";
import img12 from "../../imgs/almis_gallery/12.jpeg";
import img13 from "../../imgs/almis_gallery/13.jpeg";
import img14 from "../../imgs/almis_gallery/14.jpeg";
import img15 from "../../imgs/almis_gallery/15.jpg";
import img16 from "../../imgs/almis_gallery/16.jpg";
import "./GalleryPage.css";

const posts1 = [
  { title: "Sparkle's Nighttime Story", desc: "desc", img: img1 },
  { title: "Gator Rescue", desc: "desc", img: img2 },
  { title: "Sparkle and Didi", desc: "desc", img: img3 },
  { title: "Sparkle Color Study", desc: "desc", img: img4 },
  { title: "Gator Friends", desc: "desc", img: img5 },
  { title: "Glorby and Wanda", desc: "desc", img: img6 },
  { title: "Bun Bun Sees a Rock", desc: "desc", img: img7 },
  { title: "Joshua Tree Trip", desc: "desc", img: img8 },
  { title: "Garden of Hope", desc: "desc", img: img9 },
  { title: "Dancers", desc: "desc", img: img10 },
  { title: "San Francisco", desc: "desc", img: img11 },
  { title: "Bad Intentions", desc: "desc", img: img12 },
  { title: "Mouse Trap", desc: "desc", img: img13 },
  { title: "Frogster", desc: "desc", img: img14 },
  { title: "Gator Babe", desc: "desc", img: img15 },
  { title: "Bobby, My Honey", desc: "desc", img: img16 },
  //
  //
];

const posts2 = [
  { title: "title", desc: "desc", img: img1 },
  { title: "title", desc: "desc", img: img2 },
  { title: "title", desc: "desc", img: img3 },
  { title: "title", desc: "desc", img: img4 },
  { title: "title", desc: "desc", img: img5 },
  { title: "title", desc: "desc", img: img6 },
  { title: "title", desc: "desc", img: img7 },
  { title: "title", desc: "desc", img: img8 },
  { title: "title", desc: "desc", img: img9 },
  { title: "title", desc: "desc", img: img10 },
  { title: "title", desc: "desc", img: img11 },
  { title: "title", desc: "desc", img: img12 },
  { title: "title", desc: "desc", img: img13 },
  { title: "title", desc: "desc", img: img14 },
  //
];

const posts3 = [
  { title: "title", desc: "desc", img: img1 },
  { title: "title", desc: "desc", img: img2 },
  { title: "title", desc: "desc", img: img3 },
  { title: "title", desc: "desc", img: img4 },
  { title: "title", desc: "desc", img: img5 },
  { title: "title", desc: "desc", img: img6 },
  { title: "title", desc: "desc", img: img7 },
  { title: "title", desc: "desc", img: img8 },
  { title: "title", desc: "desc", img: img9 },
  { title: "title", desc: "desc", img: img10 },
  { title: "title", desc: "desc", img: img11 },
  { title: "title", desc: "desc", img: img12 },
  { title: "title", desc: "desc", img: img13 },
  { title: "title", desc: "desc", img: img14 },
];


const GalleryPage = () => {
  useEffect(() => {
    if (window.innerWidth < 1778 && window.innerWidth > 705) {
      setPosts(posts2)
    }
    else if (window.innerWidth >= 1778) {
      setPosts(posts1)
    }
    else if (window.innerWidth <= 705) {
      setPosts(posts3)
    }
  }, [window.innerWidth])

  const [showEnlargedImg, setShowEnlargedImg] = useState(false);
  const [currentPost, setCurrentPost] = useState("");
  const [posts, setPosts] = useState();

  return (
    <div id="gallery-container">
      {showEnlargedImg && (
        <Modal onClose={() => setShowEnlargedImg(false)} currentPost={currentPost}>
          <EnlargedImg
            currentPost={currentPost}
          />
        </Modal>
      )}
      <div id="img-prevs">
        {posts1.map((post, i) => {
          return (
            <ImgPrev
              post={post}
              setCurrentPost={setCurrentPost}
              setShowEnlargedImg={setShowEnlargedImg}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
