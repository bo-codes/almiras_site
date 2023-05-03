import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer-container">
      <div id="links">
        <a
          id="link"
          href="https://www.instagram.com/almiraakin/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillInstagram />
        </a>
        <a
          id="link"
          href="https://www.linkedin.com/in/almira-akin-a86a09178/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin />
        </a>
      </div>
      <div id="copyright">©2023-Almira Akin</div>
    </div>
  );
};

export default Footer;
