import AlmirasResume from  "../../imgs/AlmiraAkin_Resume.pdf"
import ResumeImg from "../../imgs/almiras_resume.png"
import "./ResumePage.css";

const ResumePage = () => {
  return (
    <div id="resume-page">
      <div id="resume-container">
        <a id="download-resume-btn" href={AlmirasResume} download><span>Download Resume</span></a>
        <img id="resume-img" src={ResumeImg} alt="almira's resume"/>
      </div>
    </div>
  );
};

export default ResumePage;
