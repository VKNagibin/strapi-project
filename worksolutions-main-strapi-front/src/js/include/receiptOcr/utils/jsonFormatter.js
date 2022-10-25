const jsonFormatterFunction = (jsonString, keys) => {
  let result = "";
  const replaceWords = keys.map(key => `"${key}":`);

  const words = jsonString.split(" ");
  for (const word of words) {
    if (replaceWords.includes(word)) {
      result += `<span style="color: #56B8FF;">${word}</span>  `;
    } else if (word.startsWith("[") || word.startsWith("]") || word.startsWith("{") || word.startsWith("}")) {
      result += word;
    } else {
      result += `<span style="color: #252525;">${word}</span> `;
    }
  }

  const index = result.lastIndexOf("}");
  if (index !== -1) {
    result = result.slice(0, index);
  }
  result += `<span style="color: #bdc9db;">}</span>`;

  return result; /*.replaceAll(",", `<span style="color: #bdc9db;">,</span>`);*/
};

export default jsonFormatterFunction;
