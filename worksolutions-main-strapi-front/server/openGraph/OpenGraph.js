class OpenGraph {
  static get ogUrl() {
    return process.env.OG_URL;
  }

  static locales = {
    ru: "ru_RU",
  };

  constructor() {
    this.value = {
      siteName: "Work Solutions",
    };
  }

  setLocale(locale) {
    this.value.locale = locale;
    return this;
  }

  setImage(relativeImagePath) {
    this.value.image = `${OpenGraph.ogUrl}${relativeImagePath}`;
    return this;
  }

  setUrl(path) {
    this.value.url = `${OpenGraph.ogUrl}${path}`;
    return this;
  }

  setType(type) {
    this.value.type = type;
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

module.exports = OpenGraph;
