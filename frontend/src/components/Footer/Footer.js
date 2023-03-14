import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer-container">
      <div id="links">
        <a
          id="link"
          href="https://www.instagram.com/almiraakinart/"
          target="_blank"
        >
          <AiFillInstagram />
        </a>
        <a
          id="link"
          href="https://www.linkedin.com/in/almira-akin-a86a09178/"
          target="_blank"
        >
          <AiFillLinkedin />
        </a>
      </div>
      <div id="copyright">©2022-Almira Akin</div>
    </div>
  );
};

export default Footer;
