import Context2DCanvasController from "./canvas/Context2DCanvasController";
import { createCanvasController } from "./canvas/CanvasController";
import { EVENT_FINISH_DRAW_POST_CARD } from "./constants";
import { loadImage } from "./loadFiles/loadImage";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 912;

const TEMPLATE_IMAGE_SRC = "/i/neuroMarch/postcard-template.png";

const postcardTemplateOptions = {
  marginLeft: 0,
  marginTop: 0,
  endDrawLeft: CANVAS_WIDTH,
  endDrawRight: CANVAS_HEIGHT,
};

const textNameOptions = {
  marginLeft: 794,
  marginTop: 320,
  maxWidth: 400,
};

const textCongratulationOptions = {
  lineHeight: 45,
  marginLeft: 712,
  marginTop: 394,
  maxWidth: 504,
};

const postcardImageOptions = {
  marginLeft: 88,
  marginTop: 60,
  endDrawLeft: 530,
  endDrawRight: 530,
};

const textStyle = {
  fontSize: 48,
  fontFamily: "Caveat",
  color: "#1C18B6",
};

export function drawPostcard({ image: postCardImage, text: congratulation, name }) {
  const postcardElement = document.querySelector("[data-type-postcard]");

  const canvasController = createCanvasController();

  canvasController.setWidth(CANVAS_WIDTH);
  canvasController.setHeight(CANVAS_HEIGHT);

  const context2D = canvasController.get2DContext();
  const contextCanvasController = new Context2DCanvasController(context2D);

  loadImage(TEMPLATE_IMAGE_SRC)
    .then(img => {
      const setPostcardTemplateOptions = contextCanvasController.setImageFabric(img);
      setPostcardTemplateOptions(postcardTemplateOptions);

      contextCanvasController.setTextStyle(textStyle);

      contextCanvasController.fillText({ text: name, ...textNameOptions });

      const setCongratulationTextPosition = contextCanvasController.setTextFabric(congratulation);
      setCongratulationTextPosition(textCongratulationOptions);

      return loadImage(postCardImage);
    })
    .then(img => {
      const setPostcardImageOptions = contextCanvasController.setImageFabric(img);
      setPostcardImageOptions(postcardImageOptions);
    })
    .finally(() => {
      postcardElement.setAttribute("src", canvasController.toDataURL("image/jpeg"));
      dispatchEvent(new Event(EVENT_FINISH_DRAW_POST_CARD));
    });
}
