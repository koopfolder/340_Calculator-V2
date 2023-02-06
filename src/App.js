import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const ex = <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.77273 24.3636C7.09091 24.3636 5.64015 23.9924 4.42045 23.25C3.20833 22.5 2.27273 21.4545 1.61364 20.1136C0.962121 18.7652 0.636364 17.197 0.636364 15.4091C0.636364 13.6212 0.962121 12.0455 1.61364 10.6818C2.27273 9.31061 3.18939 8.24242 4.36364 7.47727C5.54545 6.70455 6.92424 6.31818 8.5 6.31818C9.40909 6.31818 10.3068 6.4697 11.1932 6.77273C12.0795 7.07576 12.8864 7.56818 13.6136 8.25C14.3409 8.92424 14.9205 9.81818 15.3523 10.9318C15.7841 12.0455 16 13.4167 16 15.0455V16.1818H2.54545V13.8636H13.2727C13.2727 12.8788 13.0758 12 12.6818 11.2273C12.2955 10.4545 11.7424 9.8447 11.0227 9.39773C10.3106 8.95076 9.4697 8.72727 8.5 8.72727C7.43182 8.72727 6.50758 8.99242 5.72727 9.52273C4.95455 10.0455 4.35985 10.7273 3.94318 11.5682C3.52652 12.4091 3.31818 13.3106 3.31818 14.2727V15.8182C3.31818 17.1364 3.54545 18.2538 4 19.1705C4.46212 20.0795 5.10227 20.7727 5.92045 21.25C6.73864 21.7197 7.68939 21.9545 8.77273 21.9545C9.47727 21.9545 10.1136 21.8561 10.6818 21.6591C11.2576 21.4545 11.7538 21.1515 12.1705 20.75C12.5871 20.3409 12.9091 19.8333 13.1364 19.2273L15.7273 19.9545C15.4545 20.8333 14.9962 21.6061 14.3523 22.2727C13.7083 22.9318 12.9129 23.447 11.9659 23.8182C11.0189 24.1818 9.95455 24.3636 8.77273 24.3636ZM21.0341 0.727272L23.5341 5.13636L25.9886 0.727272H28.5341L25.0795 6.5L28.6705 12.3636H26.1705L23.5341 7.90909L20.8977 12.3636H18.3523L21.9432 6.5L18.5341 0.727272H21.0341Z" fill="black" />
</svg>

const btnValues = [
  ["log", "AC", "+-", "%", "÷"],
  ["ln", 7, 8, 9, "×"],
  [ex, 4, 5, 6, "-"],
  ["e", 1, 2, 3, "+"],
  ["𝜋", 0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "×" ? a * b : a / b;

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });


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
  };

  // ----------------------------------v1

  const eClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      num:
        toLocaleString(Number(removeSpaces(Math.E)))
      ,
      res: !calc.sign ? 0 : calc.res,
    });
  };

  const piClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      num:
        toLocaleString(Number(removeSpaces(Math.PI)))
      ,
      res: !calc.sign ? 0 : calc.res,
    });
  };

  const exClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      num:
        toLocaleString(Number(removeSpaces(Math.E)))
      ,
      res: !calc.sign ? 0 : calc.res,
    });
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 11.9773C24.0122 18.589 18.6203 23.9954 12.0087 24C9.15314 24.002 6.53017 23.0066 4.46893 21.343C3.93295 20.9104 3.89288 20.1072 4.37995 19.6201L4.92512 19.0749C5.34169 18.6583 6.00672 18.6128 6.46824 18.9789C7.98686 20.184 9.90875 20.9033 12 20.9033C16.9212 20.9033 20.9032 16.9205 20.9032 12C20.9032 7.0788 16.9204 3.09678 12 3.09678C9.63802 3.09678 7.49278 4.01464 5.89993 5.51285L8.35577 7.96869C8.84351 8.45644 8.49807 9.29034 7.80836 9.29034H0.774193C0.346596 9.29034 0 8.94374 0 8.51614V1.48195C0 0.792243 0.833902 0.446807 1.32164 0.934502L3.71061 3.32347C5.86495 1.26465 8.78477 0 12 0C18.6198 0 23.9877 5.36033 24 11.9773ZM15.2462 15.7895L15.7215 15.1783C16.1153 14.6721 16.024 13.9424 15.5178 13.5487L13.5484 12.0169V6.96776C13.5484 6.32638 13.0285 5.80646 12.3871 5.80646H11.6129C10.9715 5.80646 10.4516 6.32638 10.4516 6.96776V13.5315L13.6166 15.9932C14.1228 16.3869 14.8524 16.2957 15.2462 15.7895Z"
        fill="black"
      />
    </svg>
  );

  return (
    <Wrapper>
      <button style={{position:'absolute', top:'80px', left:'30px', backgroundColor:'unset'}}>{iconHistoryClickHandler}</button>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : btn === "e" ? "operator" : btn === "𝜋" ? "operator" : btn === "log" ? "operator" : btn === "ln" ? "operator" : btn === "AC" ? "ac" : btn === "." ? "" : btn === 0 ? "zero" : typeof btn === "string" ? "symbol" : btn === ex ? "operator" : ""}
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
                          : btn === "𝜋"
                            ? piClickHandler
                            : btn === "e"
                              ? eClickHandler
                              : btn === ex
                              ? exClickHandler
                              : btn === "."
                                ? comaClickHandler
                                : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
