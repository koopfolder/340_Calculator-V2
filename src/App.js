import React, { useState } from "react";
import axios from "axios";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import { Textfit } from "react-textfit";
import './App.css'

const ex = (
  <svg
    width="29"
    height="25"
    viewBox="0 0 29 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.77273 24.3636C7.09091 24.3636 5.64015 23.9924 4.42045 23.25C3.20833 22.5 2.27273 21.4545 1.61364 20.1136C0.962121 18.7652 0.636364 17.197 0.636364 15.4091C0.636364 13.6212 0.962121 12.0455 1.61364 10.6818C2.27273 9.31061 3.18939 8.24242 4.36364 7.47727C5.54545 6.70455 6.92424 6.31818 8.5 6.31818C9.40909 6.31818 10.3068 6.4697 11.1932 6.77273C12.0795 7.07576 12.8864 7.56818 13.6136 8.25C14.3409 8.92424 14.9205 9.81818 15.3523 10.9318C15.7841 12.0455 16 13.4167 16 15.0455V16.1818H2.54545V13.8636H13.2727C13.2727 12.8788 13.0758 12 12.6818 11.2273C12.2955 10.4545 11.7424 9.8447 11.0227 9.39773C10.3106 8.95076 9.4697 8.72727 8.5 8.72727C7.43182 8.72727 6.50758 8.99242 5.72727 9.52273C4.95455 10.0455 4.35985 10.7273 3.94318 11.5682C3.52652 12.4091 3.31818 13.3106 3.31818 14.2727V15.8182C3.31818 17.1364 3.54545 18.2538 4 19.1705C4.46212 20.0795 5.10227 20.7727 5.92045 21.25C6.73864 21.7197 7.68939 21.9545 8.77273 21.9545C9.47727 21.9545 10.1136 21.8561 10.6818 21.6591C11.2576 21.4545 11.7538 21.1515 12.1705 20.75C12.5871 20.3409 12.9091 19.8333 13.1364 19.2273L15.7273 19.9545C15.4545 20.8333 14.9962 21.6061 14.3523 22.2727C13.7083 22.9318 12.9129 23.447 11.9659 23.8182C11.0189 24.1818 9.95455 24.3636 8.77273 24.3636ZM21.0341 0.727272L23.5341 5.13636L25.9886 0.727272H28.5341L25.0795 6.5L28.6705 12.3636H26.1705L23.5341 7.90909L20.8977 12.3636H18.3523L21.9432 6.5L18.5341 0.727272H21.0341Z"
      fill="black"
    />
  </svg>
);

const btnValues = [
  ["sin","log", "AC", "+-", "%", "÷"],
  ["cos","ln", 7, 8, 9, "×"],
  ["tan",ex, 4, 5, 6, "-"],
  ["1/x","e", 1, 2, 3, "+"],
  ["√","𝜋", 0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "×" ? a * b : a / b;

const App = () => {
  // ------------------------- Connect API ---------------------------------

  // const [getValue, setGetValue] = useState([]);
  // const [getResult, setGetResult] = useState([]);
  // const [getHistory, setGetHistory] = useState([[], []]);
  const value = [];
  const result = [];
  const history = [];
  const [getHistory, setGetHistory] = useState([]);
  const [toggle, setToggle] = useState(false);

  const createHis = (obj) => {
    axios.post("http://localhost:5000/history", obj,)
  }

  const historyHandle = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/history", { crossdomain: true })
      .then((respone) => {
        for (let i = 0; i < respone.data.message.length; i++) {
          value.push(respone.data.message[i].value);
          result.push(respone.data.message[i].result);
          history.push([
            respone.data.message[i].value,
            respone.data.message[i].result,
          ]);
          // console.log("value: " + value);
          // console.log("result: " + result);
          // console.log("history: " + history);
        }
        return setGetHistory(history);
      })
      .catch(function (error) {
        console.error(error);
      });
    setToggle(!toggle);
  };

  // -------------------------End Connect API-------------------------------

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const num = ['']

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
    num.push(calc.num + value)
    console.log(num)
  };

  // ----------------------------------v1

  const logClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      sign: "log",
      num: 0,
      res: toLocaleString(Math.log10(calc.num)),
    });
    const obj = {
      value: `log ${calc.num}`,
      result: `${Math.log10(calc.num)}`
    }
    createHis(obj);
  };

  const lnClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      sign: "ln",
      num: 0,
      res: toLocaleString(Math.log1p(calc.num - 1)),
    });
    // console.log(`num - `+calc.num+`\nsign - `+calc.sign+`\nres - `+calc.res);
    const obj = {
      value: `ln ${calc.num}`,
      result: `${Math.log1p(calc.num - 1)}`
    }
    createHis(obj);
  };

  const eClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      num: toLocaleString(Number(removeSpaces(Math.E))),
      res: !calc.sign ? 0 : calc.res,
    });
    // const obj = {
    //   value: `e`,
    //   result: `${Math.E}`
    // }
    // createHis(obj);
  };

  const piClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      num: toLocaleString(Number(removeSpaces(Math.PI))),
      res: !calc.sign ? 0 : calc.res,
    });
    // const obj = {
    //   value: `𝜋`,
    //   result: `${Math.PI}`
    // }
    // createHis(obj);
  };

  const exClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      res: toLocaleString(Math.pow(Math.E, calc.num)),
      sign: "",
      num: 0,
    });
    const obj = {
      value: `e^${calc.num}`,
      result: `${Math.pow(Math.E, calc.num)}`
    }
    createHis(obj);
  };

  // ----------------------------------v1

  const comaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });

    num.push(calc.sign)
    console.log(num)
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "÷"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
      // console.log(calc.res)
      // console.log(calc.sign)
      // console.log(calc.num)
      // console.log(`math fn `+math(
      //   Number(removeSpaces(calc.res)),
      //   Number(removeSpaces(calc.num)),
      //   calc.sign
      // ))
    }

    const obj = {
      value: `${calc.res}${calc.sign}${calc.num}`,
      result: math(
        Number(removeSpaces(calc.res)),
        Number(removeSpaces(calc.num)),
        calc.sign
      )
    }

    if (obj.result !== null && obj.value !== '00'){
      createHis(obj);
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const sinClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      res: toLocaleString(Math.sin(calc.num)),
      sign: "",
      num: 0,
    });
    const obj = {
      value: `sin(${calc.num})`,
      result: `${Math.sin(calc.num)}`
    }
    createHis(obj);
  };

  const cosClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      res: toLocaleString(Math.cos(calc.num)),
      sign: "",
      num: 0,
    });
    const obj = {
      value: `cos(${calc.num})`,
      result: `${Math.cos(calc.num)}`
    }
    createHis(obj);
  };

  const tanClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      res: toLocaleString(Math.tan(calc.num)),
      sign: "",
      num: 0,
    });
    const obj = {
      value: `tan(${calc.num})`,
      result: `${Math.tan(calc.num)}`
    }
    createHis(obj);
  };

  const oneDivideXClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      res: toLocaleString(1 / calc.num),
      sign: "",
      num: 0,
    });
    const obj = {
      value: `1/${calc.num}`,
      result: `${1 / calc.num}`
    }
    createHis(obj);
  };

  const sqrtClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      res: toLocaleString(Math.sqrt(calc.num)),
      sign: "",
      num: 0,
    });
    const obj = {
      value: `√${calc.num}`,
      result: `${Math.sqrt(calc.num)}`
    }
    createHis(obj);
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const iconHistoryClickHandler = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8.983C18.0092 13.9417 13.9652 17.9965 9.00652 18C6.86485 18.0015 4.89763 17.255 3.3517 16.0073C2.94971 15.6828 2.91966 15.0804 3.28496 14.7151L3.69384 14.3062C4.00627 13.9938 4.50504 13.9596 4.85118 14.2342C5.99015 15.138 7.43156 15.6774 8.99999 15.6774C12.6909 15.6774 15.6774 12.6904 15.6774 9.00002C15.6774 5.3091 12.6903 2.32259 8.99999 2.32259C7.22852 2.32259 5.61959 3.01098 4.42495 4.13464L6.26683 5.97652C6.63263 6.34233 6.37356 6.96776 5.85627 6.96776H0.580645C0.259947 6.96776 0 6.70781 0 6.38711V1.11147C0 0.594183 0.625427 0.335105 0.991233 0.700876L2.78296 2.49261C4.39871 0.948486 6.58858 0 8.99999 0C13.9649 0 17.9908 4.02025 18 8.983ZM11.4346 11.8421L11.7911 11.3838C12.0864 11.004 12.018 10.4568 11.6383 10.1615L10.1613 9.01268V5.22582C10.1613 4.74479 9.77134 4.35485 9.29031 4.35485H8.70967C8.22864 4.35485 7.8387 4.74479 7.8387 5.22582V10.1486L10.2124 11.9949C10.5921 12.2902 11.1393 12.2218 11.4346 11.8421Z"
        fill="black"
      />
    </svg>
  );

  return (
    <div className="App">
      <Wrapper>
        <button
          style={{
            display: "flex",
            position: "absolute",
            top: "107px",
            left: "26px",
            backgroundColor: "unset",
            // zIndex: "99",
            padding: "5px",
          }}
          onClick={historyHandle}
        >
          {iconHistoryClickHandler}
        </button>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={
                  btn === "="
                    ? "equals"
                    : btn === "e"
                    ? "operator"
                    : btn === "𝜋"
                    ? "operator"
                    : btn === "log"
                    ? "operator"
                    : btn === "sin"
                    ? "operator"
                    : btn === "cos"
                    ? "operator"
                    : btn === "tan"
                    ? "operator"
                    : btn === "1/x"
                    ? "operator"
                    : btn === "√"
                    ? "operator"
                    : btn === "ln"
                    ? "operator"
                    : btn === "AC"
                    ? "ac"
                    : btn === "."
                    ? ""
                    : btn === 0
                    ? "zero"
                    : typeof btn === "string"
                    ? "symbol"
                    : btn === ex
                    ? "operator"
                    : ""
                }
                value={btn}
                onClick={
                  btn === "AC"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "÷" || btn === "×" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "log"
                    ? logClickHandler
                    : btn === "ln"
                    ? lnClickHandler
                    : btn === ex
                    ? exClickHandler
                    : btn === "e"
                    ? eClickHandler
                    : btn === "𝜋"
                    ? piClickHandler
                    : btn === "sin"
                    ? sinClickHandler
                    : btn === "cos"
                    ? cosClickHandler
                    : btn === "tan"
                    ? tanClickHandler
                    : btn === "1/x"
                    ? oneDivideXClickHandler
                    : btn === "√"
                    ? sqrtClickHandler
                    : btn === "."
                    ? comaClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
      {toggle ? (
        <div className="historyCon">
          <p className="title">Recent Historyasdasd</p>
              {getHistory.map((x, idx) => {
                return (
                  <div
                    key={idx}
                  >
                    <div className="valueBox">
                    <Textfit mode="single" forceSingleModeWidth={false}>{x[0]}</Textfit>
                    {/* <br></br> */}
                    <Textfit className="result" mode="single" forceSingleModeWidth={false}>{x[1]}</Textfit>
                    </div>
                  </div>
                );
              }).reverse()}
        </div>
      ) : null}
    </div>
  );
};

export default App;
