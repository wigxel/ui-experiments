import { createRouter, RouterProvider } from "@tanstack/react-router";
import { throttle } from "lodash";
import { routeTree } from "~/routeTree.gen";
import { QueryProvider } from "./contexts/react-query";
import React, { useState } from "react";
import { cn } from "./@/lib/utils";

export function App() {
  const [state, setState] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(3);

  React.useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector(".parent");
      if (!el) return;
      el.style.setProperty("--to", "200%");
    }, 2000);
  }, []);

  return (
    <div
      className="parent flex h-screen w-screen overflow-hidden bg-black text-white"
      style={{ "--to": "0%" }}
    >
      <div className=" flex flex-1 flex-col">
        <div className="section relative h-[10vh]">
          <a>REFIRE</a>
          <div className="horizontal-line bottom-0 left-0" />
        </div>
        <div className="section flex flex-1 flex-col">
          <NavSection setActiveItem={setActiveItem} activeItem={activeItem} />
        </div>
        <div className="section relative h-[10vh] overflow-hidden">
          <p>CREATING A SUSTAINABLE FUTURE</p>
          <div className="horizontal-line left-0 top-0" />
        </div>
      </div>
      <div className="relative flex basis-[35%] flex-col">
        <div
          className="vertical-line left-0 top-0"
          style={{
            "--duration": "1.5s",
            "--delay": "0.5s",
          }}
        />
        <div className="relative flex h-[10vh] justify-end overflow-hidden">
          <button className="relative aspect-[1/1] h-[100%]">
            <div
              className="vertical-line left-0 top-0"
              style={{
                "--duration": "0.8s",
                "--delay": "1.2s",
              }}
            />
            #5
          </button>
        </div>
        <div className="section relative h-[20vh]">
          <div className="horizontal-line bottom-0 left-0" />
          <CursorMovement />
        </div>
        <div className="section flex flex-1 flex-col">
          <ContactUs currentIndex={activeItem + 1} />
        </div>
      </div>
    </div>
  );
}

const router = createRouter({
  routeTree,
  globalNotFound: () => <div>Page not found</div>,
  defaultPreload: "intent",
});

function NavSection({ setActiveItem, activeItem }) {
  return (
    <ul
      className="active nav-section flex flex-1 flex-col items-start justify-around"
      onMouseLeave={() => setActiveItem(null)}
    >
      {["Markets", "Products", "About", "Partners", "Stories"].map(
        (e, index) => {
          return (
            <li
              key={e}
              className={cn("nav-item relative flex gap-2 text-[10vh]", {
                inactive: activeItem !== null ? index !== activeItem : false,
              })}
              onMouseEnter={() => {
                setActiveItem(index);
              }}
            >
              <span className="serial-no text-[0.2em]">0{index + 1}</span>
              <span className="reveal text-content overflow-hidden text-[1em] leading-[0.9] tracking-tighter ">
                <span className="relative">{e}</span>
              </span>
              <div className="blur-layer" />
            </li>
          );
        }
      )}
    </ul>
  );
}

function ContactUs({ currentIndex = 0 }) {
  const [first, second] = ("0" + currentIndex).split("");

  return (
    <div className="flex flex-1 flex-col items-end justify-between">
      <div className="text-xs tracking-widest underline opacity-80">
        CONTACT US
      </div>

      <div className="flex flex-col gap-6">
        <span className="flex -space-x-8 text-right text-[132px] leading-[1]">
          <Counter value={first} />
          <Counter value={second} />
        </span>
        <ul className="flex justify-end gap-8 *:text-xs *:font-semibold *:tracking-widest *:underline">
          <li>LINKEDIN</li>
          <li>WECHAT</li>
        </ul>
      </div>
    </div>
  );
}

function Counter(props) {
  const count = Number(props.value);

  return (
    <div className="aspect-square h-[120px] overflow-hidden">
      <span
        className="inline-flex transform flex-col"
        style={{
          "--count": count,
          transform: `translateY(calc(var(--count, 0) * -120px))`,
          transition: "transform .3s ease-in",
        }}
      >
        {Array(10)
          .fill(0)
          .map((_, index) => {
            return (
              <span key={index} className="relative h-[120px]">
                {index}
              </span>
            );
          })}
      </span>
    </div>
  );
}

function CursorMovement() {
  React.useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      console.log(event);
      setCursorMovement({ x: event.clientX, y: event.clientY });
    });
  }, []);

  const [getter, setCursorMovement] = React.useState({ x: 0, y: 0 });

  return (
    <>
      <h2>x:{getter.x}</h2>
      <h2>y:{getter.y}</h2>
    </>
  );
}
