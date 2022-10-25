import axios from "axios";

export default function getPartners() {
    const partnersList = document.querySelector('.partners__list');

    axios.get("http://localhost:1337/api/partners-collectons?populate=partnerLogo")
        .then(res => res.data.data.map(item => {
            return {
                src: `http://localhost:1337${item.attributes.partnerLogo.data.attributes.url}`,
                name: item.attributes.partnerName,
            }
        }))
        .then(res => {
            partnersList.innerHTML =
                res.map(item => {
                    return `
                <div class="partners__item">
                    <div class="partnerCard inList">
                        <img src="${item.src}" alt="${item.name}" class="partnerCard__logo" rel="preload"/>
                    </div>
                </div>
                            `
                }).join('');
        })
        .catch(console.log)
}