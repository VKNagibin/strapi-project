const blogCategoriesEnum = require("../blogHelpers/blogCategoriesEnum");

const blogDescriptionMap = {
  [blogCategoriesEnum.DEFAULT]:
    "Блог компании Work Solutions о разработке веб-приложений, управлении проектами и машинном обучении",
  [blogCategoriesEnum.CAREER]:
    "Статьи с рекомендациями по построению карьеры для веб-разработчиков от экспертов компании Work Solutions",
  [blogCategoriesEnum.BUSINESS]: "Статьи о разработке для бизнеса от экспертов компании Work Solutions",
  [blogCategoriesEnum.DEVELOPERS]: "Статьи для веб-разработчиков от экспертов компании Work Solutions",
  [blogCategoriesEnum.MANAGERS]: "Статьи об управлении проектами от экспертов компании Work Solutions",
  [blogCategoriesEnum.CASES]: "Примеры работ компании Work Solutions",
  [blogCategoriesEnum.STANDARDS]: "Статьи об опыте работы над проектами от экспертов компании Work Solutions",
  [blogCategoriesEnum.MACHINE_LEARNING]: "Статьи о машинном обучении от экспертов компании Work Solutions",
  [blogCategoriesEnum.OFFTOPIC]: "Статьи на различные темы для веб-разработчиков от экспертов компании Work Solutions",
};

module.exports = blogDescriptionMap;
