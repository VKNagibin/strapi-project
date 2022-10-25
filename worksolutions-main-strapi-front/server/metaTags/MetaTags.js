class MetaTags {

  constructor() {
    this.value = {};
  }

  setKeyWords(keywords) {
    this.value.keywords = keywords;
    return this;
  }

  setTitle(title) {
    this.value.title = title;
    return this;
  }

  setDescription(description) {
    this.value.description = description;
    return this;
  }
}

module.exports = MetaTags;
