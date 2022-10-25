import { stringConcat } from "../utils";

export class UrlManager extends URL {
  static get slash() {
    return "/";
  }

  static createInstance() {
    return new UrlManager(window.location.href);
  }

  constructor(url) {
    super(url);
    this.paths = this.getPathNames();
  }

  splitPathname() {
    return this.pathname.split(UrlManager.slash);
  }

  setPathByIndex(path, index) {
    this.replacePathsByIndex(index, path);
    this.setWindowLocation(stringConcat([this.origin, UrlManager.slash, this.joinPath()]));
  }

  findPath(soughtPath) {
    const regexpPath = new RegExp(soughtPath);
    return this.paths.findIndex(path => regexpPath.test(path));
  }

  replacePathsByIndex(index, path) {
    this.paths[index] = path;
  }

  joinPath() {
    return this.paths.join(UrlManager.slash);
  }

  setWindowLocation(path) {
    window.location = path;
  }

  getPathNames() {
    return this.splitPathname().filter(Boolean);
  }
}
