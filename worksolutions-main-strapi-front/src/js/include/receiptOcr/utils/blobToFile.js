const blobToFile = (blob, fileName) => {
  return new File([blob], fileName + "." + (blob.type ? blob.type.split("/")[1] : "jpg"), {
    type: blob.type || "jpeg",
  });
};

export default blobToFile;
