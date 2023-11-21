import { useDataGenerator } from "@data/data-generator";
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { useStore } from "@nanostores/react";
import { count } from "@data/store";
import type { StringCount } from "@utils";

type Word = {
  name: string;
  color: string;
};

const TypingTest = () => {
  const { generateWordList } = useDataGenerator();

  const wordCountOptions: StringCount[] = ["10", "25", "50", "100", "200"];

  const $count = useStore(count);

  const [input, setInput] = useState<string>("");
  const [wordList, setWordList] = useState<Word[]>(generateWordList());
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [typedWords, setTypedWords] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) setStartTime(new Date());

    const value = e.target.value;
    setInput(value);

    if (value.endsWith(" ")) {
      setTypedWords([...typedWords, value.split(" ")[0]]);

      setCurrentWordIndex(currentWordIndex + 1);

      setInput("");

      if (currentWordIndex === wordList.length - 1) {
        handleFinish();
      }
    }
  };

  const handleFinish = () => {
    const endTime = new Date();
    if (!startTime) return;

    const timeInMinutes = (endTime.getTime() - startTime.getTime()) / 1000 / 60;

    // adds spaces back as tracked typed characters
    // feels good to have a higher WPM lol
    const typedChars = wordList.map(({ name }) => name).join(" ");

    const wordsPerMinute = Math.floor(typedChars.length / 5 / timeInMinutes);

    setStartTime(null);
    setWpm(wordsPerMinute);
  };

  const handleRestart = useCallback(
    (newCount: StringCount) => {
      setInput("");
      setCurrentWordIndex(0);
      setStartTime(null);
      inputRef.current?.focus();
      setTypedWords([]);
      setWordList(generateWordList(newCount));
      setWpm(0);
    },
    [generateWordList]
  );

  useEffect(() => {
    const getWordColor = (index: number) => {
      if (index === currentWordIndex) {
        // if is currently correct...
        return "text-activeText";
      }
      if (index < currentWordIndex) {
        if (typedWords[index] === wordList[index].name) {
          return "text-successText";
        }
        return "text-errorText";
      }

      return "text-mainText";
    };

    setWordList((prev) => {
      return prev.map(({ name }, index) => {
        return {
          name,
          color: getWordColor(index),
        };
      });
    });
  }, [typedWords, currentWordIndex, setWordList, wordList]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Suspense fallback={<div className="text-errorText text-xl">bad</div>}>
      <article className="flex flex-col mx-10 gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {wordCountOptions.map((option) => {
              return (
                <button
                  key={`word-count-${option}`}
                  className={`transition-colors hover:text-highlightText ${
                    $count === option
                      ? "underline text-highlightText"
                      : "text-accentText"
                  }`}
                  onClick={() => {
                    count.set(option);
                    handleRestart(option);
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <span className="text-accentText">WPM: {wpm}</span>
        </div>

        {/* Modal */}
        <div
          className={`rounded-xl min-w-[260px] md:w-[600px] sm:w-[90vw] min-h-[100px]
          h-full flex bg-containerBackground flex-col p-2 items-center justify-between
          drop-shadow-md drop-shadow-white border-primaryBorder border-2
          shadow-custom-shadow shadow-accentBorder
        `}
        >
          {/* Word list */}
          <div className="p-2 border-2 border-primaryBorder bg-accentBackground rounded-md h-full w-full">
            {wordList.map((word, index) => {
              return (
                <span key={`${word.name}-${index}`} className={word.color}>
                  {word.name}{" "}
                </span>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 w-full mt-2">
            <input
              value={input}
              ref={inputRef}
              autoFocus
              onInput={handleInputChange}
              className="transition-colors focus:border-highlightBorder hover:border-highlightBorder w-full outline-none bg-accentBackground text-accentText p-2 border-2 rounded-md border-primaryBorder"
            />
            <button
              className="focus:border-accentBorder hover:border-accentBorder hover:bg-highlightBackground outline-none transition-colors w-40 bg-accentBackground rounded-md p-2 text-center border-2 border-highlightBorder text-accentText hover:text-highlightText"
              onClick={() => handleRestart($count)}
            >
              Again
            </button>
          </div>
        </div>
      </article>
    </Suspense>
  );
};

export default TypingTest;
