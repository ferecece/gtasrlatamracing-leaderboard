import { useEffect, useState } from "react";

const ColoredText = ({ text }) => {
  const [defaultColor, setDefaultColor] = useState("");

  useEffect(() => {
    const rootStyles = getComputedStyle(document.body);
    const color = rootStyles.getPropertyValue("color").trim();
    setDefaultColor(color);
  }, []);

  const parseText = (text) => {
    const regex = /(?:#(?:[0-9a-fA-F]{3}){1,2})(?:\[.*?\])?[^#]*(?=#|$)/g;
    let matches;
    const segments = [];
    let lastIndex = 0;

    while ((matches = regex.exec(text)) !== null) {
      const segment = matches[0];
      const colorMatch = segment.match(/#(?:[0-9a-fA-F]{3}){1,2}/);
      const color = colorMatch ? colorMatch[0] : defaultColor;
      const tagMatch = segment.match(/\[.*?\]/);
      const tag = tagMatch ? tagMatch[0] : "";
      const content = segment.replace(color, "").replace(tag, "");

      segments.push({ color, tag, content });

      lastIndex = matches.index + segment.length;
    }

    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      segments.push({ color: defaultColor, tag: "", content: remainingText });
    }

    return segments;
  };

  const segments = parseText(text);

  return (
    <span>
      {segments.map((segment, index) => (
        <span key={index} style={{ color: segment.color }}>
          {segment.tag}
          {segment.content}
        </span>
      ))}
    </span>
  );
};

export default ColoredText;