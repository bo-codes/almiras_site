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
        <div id="about-img"></div>
        <div id="about-descr">
          {almiraText.slice(0, almiraText.length / 3)} <br />{" "}
          {almiraText.slice(almiraText.length / 3, almiraText.length / 1.5)}{" "}
          <br />{" "}
          {almiraText.slice(almiraText.length / 1.5, almiraText.length / 0.75)}{" "}
          <br /> {almiraText.slice(almiraText.length / 0.75)}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
