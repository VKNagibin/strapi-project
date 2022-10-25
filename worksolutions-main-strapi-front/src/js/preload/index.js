import first from "./modules/first";
import aboutUs from "./modules/aboutUs";
import features from "./modules/features";
import technologies from "./modules/technologies";

export const STRAPI_PREFIX = 'http://localhost:1337'

export default function() {
    first();
    aboutUs();
    features();
    technologies();
}