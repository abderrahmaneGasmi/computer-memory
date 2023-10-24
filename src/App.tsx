import React, { useState, useEffect } from "react";
import "./App.css";
import Bubble from "./assets/Bubble";
const numCases = 51;
const Alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function App() {
  const fillarray = (): number[] => {
    const arr = [];

    for (let i = 0; i < numCases; i++) {
      arr.push(i);
    }
    return arr;
  };
  const [cards, setCards] = useState([] as Card[]);
  const [cases, setCases] = useState([] as number[]);
  const [chosedcases, setChosedcases] = useState(fillarray);
  const selectword = (lettersnumber: number) => {
    let word = "";
    for (let i = 0; i < lettersnumber; i++) {
      word += Alphabets[Math.floor(Math.random() * Alphabets.length)];
    }
    return word;
  };
  const disk = React.useRef<HTMLDivElement>(null);
  const addvariable = () => {
    const randomid = Math.floor(Math.random() * 1000);
    setCards((old: Card[]) => [
      ...old,
      {
        value: Math.floor(Math.random() * 100).toString(),

        varname: selectword(Math.floor(Math.random() * 7 + 3)),
        id: randomid,
      },
    ]);
    // select random case and add it to cases
    const randomcase = Math.floor(Math.random() * chosedcases.length);
    setCases((old) => [...old, chosedcases[randomcase]]);
    // remove the case from chosedcases
    setChosedcases((old) => {
      const arr = [...old];
      arr.splice(randomcase, 1);
      return arr;
    });
  };
  const reset = () => {
    setCards([]);
    setCases([]);
    setChosedcases(fillarray);

    const lines = document.getElementsByClassName("upline");
    const lines2 = document.getElementsByClassName("downline");
    const points = document.getElementsByClassName("point");
    while (lines.length > 0) {
      lines[0].parentNode?.removeChild(lines[0]);
    }
    while (lines2.length > 0) {
      lines2[0].parentNode?.removeChild(lines2[0]);
    }
    while (points.length > 0) {
      points[0].parentNode?.removeChild(points[0]);
    }
  };

  // const drawline = (cardid: number, caseid: number) => {
  //   const card = document.getElementById(cardid.toString());
  //   const casee = document.getElementById(caseid.toString());
  //   console.log(card, casee);
  // };

  useEffect(() => {
    if (cases.length === 0) return;
    if (cards.length === 0) return;
    if (!disk.current) return;

    const diskcord = disk.current.getBoundingClientRect();
    // getting the last card and case coordinates
    const lastcardid = cards[cards.length - 1].id;
    const lastcaseid = cases[cases.length - 1];

    const card = document.getElementById(lastcardid.toString());
    const casee = document.getElementById(lastcaseid.toString());

    const casecord = casee?.getBoundingClientRect();
    const cardcord = card?.getBoundingClientRect();
    const firstline = document.createElement("div");
    let endoflineone = 0;
    // the up line or the first line of the drawing
    if (casecord && diskcord) {
      firstline.classList.add("upline");

      firstline.style.top = casecord?.top + 25 + "px";
      firstline.style.left = casecord?.left - 70 + "px";
      creatpoint(casecord?.top + 20, casecord?.left - 78);
      endoflineone = diskcord?.top + diskcord?.height - casecord?.top - 25;

      firstline.style.height = endoflineone + "px";
      document.getElementById("root")?.appendChild(firstline);
    }
    const secondline = document.createElement("div");
    // second line which the horizontal line
    let secondlineddirection: "left" | "right" = "left";
    if (casecord && diskcord && cardcord && endoflineone) {
      secondline.classList.add("downline");
      secondline.id = "secondline" + lastcardid;
      secondline.style.top = casecord?.top + 25 + endoflineone + "px";
      // secondline.style.left = casecord?.left - 50 + "px";

      if (cardcord?.left > casecord?.left) {
        secondline.style.left = casecord?.left - 67 + "px";
        secondline.style.width =
          Math.abs(cardcord?.left - casecord?.left) + 280 + "px";
      } else {
        secondline.style.left = cardcord?.left - 115 + "px";
        secondline.style.width =
          Math.abs(cardcord?.left - casecord?.left) + 50 + "px";
        secondlineddirection = "right";
      }

      document.getElementById("root")?.appendChild(secondline);
    }

    const thirdline = document.createElement("div");
    const seconditemcord = (
      document.getElementById("secondline" + lastcardid) as HTMLElement
    ).getBoundingClientRect();
    if (seconditemcord && cardcord) {
      thirdline.classList.add("upline");
      thirdline.style.top = seconditemcord.top + "px";
      if (secondlineddirection == "right") {
        thirdline.style.left = Math.abs(seconditemcord.left - 100) + "px";
      } else {
        thirdline.style.left =
          Math.abs(seconditemcord.left - 107) + seconditemcord.width + "px";
        thirdline.style.top = seconditemcord.top - 5 + "px";
      }
      console.log(Math.abs(seconditemcord.left - 100));
      thirdline.style.height = cardcord?.top - seconditemcord.left + "px";
      document.getElementById("root")?.appendChild(thirdline);
    }
  }, [cases, cards]);

  const creatpoint = (pointtop: number, pointleft: number) => {
    const point = document.createElement("div");
    point.classList.add("point");
    point.style.top = pointtop + "px";
    point.style.left = pointleft + "px";
    document.getElementById("root")?.appendChild(point);
  };
  return (
    <>
      <Bubble styleAdded={{ bottom: "12%", left: "5%" }} />
      <Bubble styleAdded={{ bottom: "12%", right: "5%" }} />
      <div className="title">
        <div className="title__text">Computer Memory</div>
        <div className="title__btns">
          <button
            className="btn"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
            }}
            onClick={addvariable}
          >
            Add a variable
          </button>
          <button className="btn" onClick={reset}>
            reset
          </button>
        </div>
      </div>
      <div className="disk" ref={disk}>
        {Array(numCases)
          .fill(0)
          .map((_, i) => (
            <Case
              key={i}
              id={i}
              setCards={setCards}
              setCases={setCases}
              cases={cases}
            />
          ))}
        <div
          className="void"
          style={{
            height: "2rem",
            width: "2rem",
            left: "-1rem",
            position: "absolute",
            top: "70%",
            backgroundColor: "#f1eafb",
            borderRadius: "50%",
          }}
        ></div>
        <div
          className="void"
          style={{
            height: "2rem",
            width: "2rem",
            left: "-1rem",
            position: "absolute",
            top: "60%",
            backgroundColor: "#f1eafb",
            borderRadius: "50%",
          }}
        ></div>
        <div
          className="void"
          style={{
            height: "2rem",
            width: "2rem",
            right: "-1rem",
            position: "absolute",
            top: "70%",
            backgroundColor: "#f1eafb",
            borderRadius: "50%",
          }}
        ></div>
        <div
          className="void"
          style={{
            height: "2rem",
            width: "2rem",
            right: "-1rem",
            position: "absolute",
            top: "60%",
            backgroundColor: "#f1eafb",
            borderRadius: "50%",
          }}
        ></div>
        <div className="covers" style={{ left: 0, paddingLeft: "2rem" }}>
          {Array(numCases + 20)
            .fill(0)
            .map((_, i) => (
              <div className="cover" key={i}></div>
            ))}
        </div>
        <div className="covers" style={{ right: 0, paddingRight: "2rem" }}>
          {Array(numCases - 8)
            .fill(0)
            .map((_, i) => (
              <div className="cover" key={i}></div>
            ))}
        </div>
      </div>
      <div className="cards">
        {cards.map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>
    </>
  );
}

function Case({
  id,
  setCards,
  setCases,
  cases,
}: {
  id: number;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  setCases: React.Dispatch<React.SetStateAction<number[]>>;
  cases: number[];
}) {
  const addcard = () => {
    if (cases.includes(id)) return;

    setCards((old) => [
      ...old,
      {
        value: Math.floor(Math.random() * 100).toString(),

        varname: selectword(Math.floor(Math.random() * 7 + 3)),
        id: Math.floor(Math.random() * 1000),
      },
    ]);
    setCases((old) => [...old, id]);
  };
  const selectword = (lettersnumber: number) => {
    let word = "";
    for (let i = 0; i < lettersnumber; i++) {
      word += Alphabets[Math.floor(Math.random() * Alphabets.length)];
    }
    return word;
  };
  return (
    <div
      className="case"
      onClick={addcard}
      id={id.toString()}
      style={{
        backgroundColor: cases.includes(id) ? "#f1eafb" : "#fff",
      }}
    ></div>
  );
}
function Card({ value, varname, id }: Card) {
  return (
    <div className="card" id={id.toString()}>
      <div className="cardcontent">
        <div className="cardcontent__title">Variable</div>
        <div className="cardcontent__value">
          const {varname} = {value};
          <span className="commentaire">// {varname} is a variable</span>
        </div>
      </div>
    </div>
  );
}
export default App;

interface Card {
  id: number;
  value: string;
  varname: string;
}
