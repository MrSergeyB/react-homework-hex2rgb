import React, {useState} from "react";
import "./App.css";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [alert, setAlert] = useState("");
  const [bgColor, setBgColor] = useState("");

  const handleChange = (e) => {
    setAlert("");
    setUserInput(e.target.value.trim());
    if (e.target.value.length === 7) {
      checkForErrors(e.target.value);
    }
  };

  /* Проверка ввода юзера*/

  const checkForErrors = (e) => {
    const re = /[0-9A-Fa-f]{6}/g;
    if (re.test(e)) {
      /* HEX TO RGB*/

      let userInputColor = hex2rgb(e);
      console.log(userInputColor);
      setBgColor(userInputColor);
    } else {
      setAlert("Ошибка");
    }
    re.lastIndex = 0;
  };

  const hex2rgb = (e) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  return (
    <div
      style={{
        backgroundColor: ` rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }}
      className={`container ${alert ? "alertBackgroundColor" : null}`}
    >
      <div className="form">
        <form>
          <input
            type="text"
            name="color"
            value={userInput}
            onChange={handleChange}
            placeholder="Enter  #HEX color"
            autoFocus
          />

          {alert ? <div className="alert">{alert}</div> : null}
          {bgColor ? (
            <div className="showRgb">
              rgb({bgColor.r}, {bgColor.g}, {bgColor.b})
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default App;
