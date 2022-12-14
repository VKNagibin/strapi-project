import first from "./modules/first";
import aboutUs from "./modules/aboutUs";
import features from "./modules/features";
import technologies from "./modules/technologies";
import team from "@/js/preload/modules/team";
import developers from "@/js/preload/modules/developers";
import reviews from "@/js/preload/modules/reviews";

export const STRAPI_PREFIX = 'http://localhost:1337'

export default function() {
    first();
    aboutUs();
    features();
    technologies();
    team();
    developers();
    reviews();
}