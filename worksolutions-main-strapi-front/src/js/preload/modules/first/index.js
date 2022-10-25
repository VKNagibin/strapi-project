import axios from "axios";
import getPartners from "./partners";

export default function () {
    function getSlogan() {
        let sloganTitle = document.querySelector(".slogan__title");
        let sloganSubtitle = document.querySelector(".slogan__subtitle");

        axios.get("http://localhost:1337/api/slogan")
            .then(res => {
                sloganTitle.innerText = res.data.data.attributes.sloganTitle;
                sloganSubtitle.innerText = res.data.data.attributes.sloganSubtitle;
            })
    }

    function getEmail() {
        let eMail = document.querySelector(".top-contacts__link");

        axios.get("http://localhost:1337/api/e-mail")
            .then(res => {
                eMail.innerText = res.data.data.attributes.eMailDisplay;
                eMail.href = res.data.data.attributes.eMailHref;
            })
    }

    function getLogo() {
    let logo = document.querySelector(".site-logo__image");

    axios.get("http://localhost:1337/api/upload/files/1")
        .then(res => {
            logo.src = `http://localhost:1337${res.data.url}`;
        })
    }

    return {
        getSlogan: getSlogan(),
        getEmail: getEmail(),
        getLogo: getLogo(),
        getPartners: getPartners()
    }
}