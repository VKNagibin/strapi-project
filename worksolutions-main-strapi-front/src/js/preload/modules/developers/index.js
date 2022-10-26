import axios from "axios";
import { STRAPI_PREFIX as prefix }  from "../../index";

const developersLists = document.querySelectorAll('.team-grid__images-block');
    function getElementStructure(image) {
        return `
         <div class="team-grid__image-wrapper">
            <div class="team-grid__image-wrapper">
                <picture>
                    <img class="team-grid__image ls-is-cached lazyloaded" src="${prefix + image}"/>
                </picture>  
            </div>
        </div>
        `
    }


export default function() {
    return axios.get(  prefix + '/api/frontend-developers?populate=*')
        .then(res => {
            developersLists[0].innerHTML = '';
            developersLists[1].innerHTML = '';
            res.data.data.forEach(item => {
                const photo = item.attributes.photo.data.attributes.url;
                developersLists[0].insertAdjacentHTML('beforeend', getElementStructure(photo));
            })
        })
        .then(() => {
            axios.get(  prefix + '/api/backend-developers?populate=*')
                .then(res => {
                    res.data.data.forEach(item => {
                        const photo = item.attributes.photo.data.attributes.url;
                        developersLists[1].insertAdjacentHTML('beforeend', getElementStructure(photo));
                    })
                })
        })

}


