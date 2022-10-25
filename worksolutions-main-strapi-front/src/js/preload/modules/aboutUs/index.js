import axios from "axios";

export default function() {
    const aboutItemTitle = document.querySelectorAll(".about__item-title");

    axios.get("http://localhost:1337/api/statistic")
        .then(res => {
            aboutItemTitle[0].innerText = `${res.data.data.attributes.workingYears} лет`;
            aboutItemTitle[1].innerText = `${res.data.data.attributes.projectDuration} года`;
            aboutItemTitle[2].innerText = `${res.data.data.attributes.servicesCount}`;
        })
}