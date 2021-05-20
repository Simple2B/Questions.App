// import { useState, useEffect } from "react";

// const initBeforeUnLoad = (showExitPrompt:boolean) => {
//   window.onbeforeunload = (event:Event) => {
//     if (showExitPrompt) {
//       const e = event || window.event;
//       e.preventDefault();
//       if (e) {
//         e.returnValue = "";
//       }
//       return "";
//     }
//   };
// };

// // Hook
// export default function useExitPrompt(bool:boolean) {
//   const [showExitPrompt, setShowExitPrompt] = useState(bool);

//   window.onload = function () {
//     initBeforeUnLoad(showExitPrompt);
//   };

//   useEffect(() => {
//     initBeforeUnLoad(showExitPrompt);
//   }, [showExitPrompt]);

//   return [showExitPrompt, setShowExitPrompt];
// }

import { useEffect, useRef } from "react";

type BeforeunloadHandler = (evt: BeforeUnloadEvent) => void;

export function useBeforeunload(handler: BeforeunloadHandler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleBeforeunload: BeforeunloadHandler = (evt) => {
      let returnValue;

      if (typeof handlerRef.current === "function") {
        returnValue = handlerRef.current(evt);
      }

      if (evt.defaultPrevented) {
        evt.returnValue = "";
      }

      if (typeof returnValue === "string") {
        evt.returnValue = returnValue;
        return returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeunload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
  }, []);
}
