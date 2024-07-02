import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css"; // Make sure to import Tailwind CSS

const AnimatedHeading = ({ text }) => {
  const [animatedText, setAnimatedText] = useState([]);

  useEffect(() => {
    const textArray = text.split("").map((char, i) => (
      <span
        key={i}
        className="opacity-0"
        style={{ animationDelay: `${(i + 1) * 0.2}s` }}
      >
        {char}
      </span>
    ));
    setAnimatedText(textArray);

    const animationDuration = text.length * 0.1 * 500 ; // Total duration of the animation
    const loopInterval = setInterval(() => {
      setAnimatedText(prevText =>
        prevText.map((char, i) =>
          React.cloneElement(char, { className: `opacity-0 animate-fadeIn`, style: { animationDelay: `${(i + 1) * 0.2}s` } })
        )
      );
    }, animationDuration);

    return () => clearInterval(loopInterval); // Cleanup the interval on component unmount
  }, [text]);

  return <h1 className="h1 max-w-[33rem]">{animatedText}</h1>;
};

export default AnimatedHeading;
