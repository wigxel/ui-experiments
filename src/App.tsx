import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "~/routeTree.gen";
import { QueryProvider } from "./contexts/react-query";
import React from "react";

export function App() {
  const [state, setState] = React.useState(false);

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
          <NavSection />
        </div>
        <div className="section relative h-[10vh] overflow-hidden">
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
          #6
        </div>
        <div className="section flex-1">$7</div>
      </div>
    </div>
  );
}

const router = createRouter({
  routeTree,
  globalNotFound: () => <div>Page not found</div>,
  defaultPreload: "intent",
});

function NavSection() {
  return (
    <ul className="nav-section flex flex-1 flex-col justify-around">
      {["Markets", "Products", "About", "Partners", "Stories"].map(
        (e, index) => {
          return (
            <li key={e} className="flex gap-2 text-[10vh]">
              <span className="serial-no text-[0.2em]">0{index + 1}</span>
              <span className="reveal overflow-hidden text-[1em] leading-[0.9] tracking-tighter ">
                <span className="relative">{e}</span>
              </span>
            </li>
          );
        }
      )}
    </ul>
  );
}
