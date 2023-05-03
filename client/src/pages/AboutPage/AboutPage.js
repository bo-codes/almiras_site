import aboutImg from '../../imgs/almira_about.jpg'
import "./AboutPage.css";

const AboutPage = () => {
  const randomNumGen = () => {
    return Math.floor(Math.random() * (6 + 1) + 1);
  };
  const generateText = (name, num) => {
    let finalStr = "";

    for (let i = 0; i < num; i++) {
      let currRepeats = randomNumGen();
      for (let j = 0; j < currRepeats; j++) {
        finalStr += "blah ";
      }
      finalStr += `${name} `;
    }
    return finalStr;
  };

  const almiraText = generateText("almira", 36);

  return (
    <div id="about-page">
      <div id="about-container">
        {/* <div id="about-img"></div> */}
        <img src={aboutImg} id='about-img'/>
        <div id="about-descr">
          Almira Akin is an Istanbul born illustrator based in Long Beach. Her
          work is inspired by animals and people she has come across in life.
          Almira primarily works digitally, but she also enjoys working with
          watercolor. Since storytelling plays a key role in her illustrations,
          she uses vibrant colors to express the emotions and relationships
          between her characters. <br/> Almira plans on writing and illustrating her
          own children’s books alongside a career in visual development creating
          backgrounds and characters. In her spare time, Almira enjoys going
          outside to paint and spending time with her family and friends.
          {/* {almiraText.slice(0, almiraText.length / 3)} <br />{" "}
          {almiraText.slice(almiraText.length / 3, almiraText.length / 1.5)}{" "}
          <br />{" "}
          {almiraText.slice(almiraText.length / 1.5, almiraText.length / 0.75)}{" "}
          <br /> {almiraText.slice(almiraText.length / 0.75)} */}
        </div>
        {/* <div id="about-descr">
          {almiraText.slice(0, almiraText.length / 3)} <br />{" "}
          {almiraText.slice(almiraText.length / 3, almiraText.length / 1.5)}{" "}
          <br />{" "}
          {almiraText.slice(almiraText.length / 1.5, almiraText.length / 0.75)}{" "}
          <br /> {almiraText.slice(almiraText.length / 0.75)}
        </div> */}
      </div>
    </div>
  );
};

export default AboutPage;
