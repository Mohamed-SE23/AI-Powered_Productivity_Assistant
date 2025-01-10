import React, { useEffect, useState } from "react";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;
    const words = text.split(" ");
    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => {
          // If prev is empty, set the word directly, else append space and new word
          return prev ? `${prev} ${words[index]}` : words[index];
        });
        index++;
      } else {
        clearInterval(interval); // Stop the interval when all words are displayed
      }
    }, 100); // Adjust speed of typing (in ms)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [text]);

    // Remove "undefined" from the end of the displayedText if it occurs
    const cleanedText = displayedText.endsWith("undefined")
    ? displayedText.slice(0, -9) // Remove "undefined" word
    : displayedText;

  return (
    <div className="typewriter">
      <span>{cleanedText}</span>
    </div>
  );
};

export default Typewriter;
