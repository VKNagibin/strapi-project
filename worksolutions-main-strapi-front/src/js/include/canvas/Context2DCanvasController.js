import { addSpaceToEnd, interrupt, splitStringBySpace, stringConcat } from "../utils";

export default class Context2DCanvasController {
  constructor(context2D) {
    this._context = context2D;
  }

  fillText({ text, marginLeft, marginTop, maxWidth }) {
    if (!maxWidth) {
      this._context.fillText(text, marginLeft, marginTop);
      return;
    }

    let line = "";
    interrupt(text, letter => {
      const testLine = stringConcat([line, letter]);
      const testWidth = this.getWidthLine(testLine);
      if (testWidth > maxWidth) return true;
      line = testLine;
      return false;
    });

    this._context.fillText(line, marginLeft, marginTop);
  }

  getWidthLine(lineText) {
    return this._context.measureText(lineText).width;
  }

  wrapText({ text, marginLeft, marginTop, maxWidth, lineHeight = 14 }) {
    const words = splitStringBySpace(text);
    let line = "";

    words.forEach(word => {
      word = addSpaceToEnd(word);
      const testLine = stringConcat([line, word]);
      const testWidth = this.getWidthLine(testLine);
      if (testWidth < maxWidth) {
        line = testLine;
        return;
      }
      this.fillText({ text: line, marginLeft, marginTop });
      line = word;
      marginTop += lineHeight;
    });

    this.fillText({ text: line, marginLeft, marginTop });
  }

  setTextStyle({ fontSize, fontFamily, color }) {
    this._context.font = `${fontSize}px ${fontFamily}`;
    this._context.fillStyle = color;
  }

  setTextFabric(text) {
    return ({ marginLeft, marginTop, maxWidth, lineHeight }) => {
      this.wrapText({ text, marginLeft, marginTop, maxWidth, lineHeight });
    };
  }

  setImageFabric(image) {
    return ({ marginLeft, marginTop, endDrawLeft, endDrawRight }) => {
      this._context.drawImage(image, marginLeft, marginTop, endDrawLeft, endDrawRight);
    };
  }
}
