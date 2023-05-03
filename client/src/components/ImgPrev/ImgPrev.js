import "./ImgPrev.css";

const ImgPrev = ({ post, setCurrentPost, setShowEnlargedImg }) => {
  const changeCurrentImg = (img) => {
    setCurrentPost(img);
    setShowEnlargedImg(true);
  };

  return (
    <div
      className="img-prev-container"
      onClick={() => {
        changeCurrentImg(post);
      }}
    >
      <img src={post.img} className="img-img" alt={post.title} />
      <div className="img-prev-overlay">
        <div className="img-prev-title">{post.title}</div>
      </div>
    </div>
  );
};

export default ImgPrev;
