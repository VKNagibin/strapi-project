export default function assocProcessingStatus(status) {
  switch (status) {
    case "COMPLETED":
      return "Завершено";
    case "TEXT_RECOGNITION":
      return "Распознавание текста";
    case "IMAGE_PROCESSING":
      return "Распознавание изображения";
    case "PENDING":
      return "Ожидание ответа";
    case "SKEW_CORRECTION":
      return "Коррекция изображения";
  }

  return "Загрузка изображения";
}
