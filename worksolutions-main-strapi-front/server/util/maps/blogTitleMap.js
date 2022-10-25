const blogCategoriesEnum = require("../blogHelpers/blogCategoriesEnum");

const blogTitleMap = {
  [blogCategoriesEnum.DEFAULT]:
    "Блог компании Work Solutions о разработке веб-приложений, управлении проектами и машинном обучении",
  [blogCategoriesEnum.CAREER]: "Статьи по построению карьеры для веб-разработчиков | Work Solutions",
  [blogCategoriesEnum.BUSINESS]: "Статьи о разработке для бизнеса | Work Solutions",
  [blogCategoriesEnum.DEVELOPERS]: "Статьи для веб-разработчиков | Work Solutions",
  [blogCategoriesEnum.MANAGERS]: "Статьи об управлении проектами | Work Solutions",
  [blogCategoriesEnum.CASES]: "Кейсы (примеры работ) компании Work Solutions",
  [blogCategoriesEnum.STANDARDS]: "Статьи об опыте работы над проектами | Work Solutions",
  [blogCategoriesEnum.MACHINE_LEARNING]: "Статьи о машинном обучении | Work Solutions",
  [blogCategoriesEnum.OFFTOPIC]: "Статьи для веб-разработчиков на различные темы | Work Solutions",
};

module.exports = blogTitleMap;
