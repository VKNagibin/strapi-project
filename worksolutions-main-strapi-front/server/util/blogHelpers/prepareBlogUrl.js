const blogPath = "/blog/";
const startBlogCode = "section-";

function prepareBlogUrl(selectedCategories) {
  if (selectedCategories.length === 0) return blogPath;

  return `${blogPath}${startBlogCode}${selectedCategories}`;
}

module.exports = { prepareBlogUrl, blogPath };
