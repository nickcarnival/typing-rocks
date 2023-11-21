import { useState, useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import { theme } from "@data/store";
import { allThemes, type ThemeNames } from "@utils";

export const ThemeSelect = () => {
  const $theme = useStore(theme);

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: ThemeNames) => {
    theme.set(option);
    setIsOpen(false);
  };

  const handleClickAway = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, []);

  return (
    <div ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="transition-colors text-activeText cursor-pointer hover:text-accentText"
      >
        theme
      </button>

      <div
        className={`${isOpen ? "visible" : "invisible"}
        absolute
        border-2 border-accentBorder
        top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        mt-2 rounded-lg bg-containerBackground shadow-custom-shadow shadow-highlightBackground
        py-8 px-4 w-[40vw] 
        `}
      >
        <div className="grid items-center justify-items-center grid-cols-3 p-1 gap-2">
          {allThemes.sort().map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              data-theme={option}
              className={`${option} ${
                option === $theme ? `text-mainText` : `text-accentText`
              } border-2 text-center px-4 py-4 cursor-pointer
              whitespace-nowrap max-w-[220px]
              rounded-md bg-accentBackground text-accentText border-primaryBorder
              hover:text-highlightText hover:bg-mainBackground`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
