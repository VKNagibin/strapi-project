import axios from "axios";
import { STRAPI_PREFIX as prefix }  from "../../index";

const reviewsContainer = document.querySelector('.main-reviews-cards')

function getElementStructure(review) {
    return (
    `
     <div class="reviews-card-container" style="width: 30%">
            <div class="reviews-main__card reviews-card js-reviewsCarousel-card">
                <div class="reviews-main__top">
                    <picture>
                        <img class="reviews-main__avatar ls-is-cached lazyloaded" style="border-radius: 50%" src="${prefix + review.photo}"/>
                    </picture>
                    <div class="reviews-main__reviewer-info">
                        <div class="reviews-main__fullname">
                            ${review.name}
                        </div>
                        <div class="wrapp-specialty">
                            <div class="reviews-main__specialty">
                                ${review.position},
                                <div class="reviews-main__specialty">
                                    ${review.company}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reviews-main__content">
                       <div class="reviews-main__text">
                           ${review.text}
                       </div>
                </div>
            </div>
        </div>
    `
    )
}


export default function() {
    return axios.get(  prefix + '/api/reviews?populate=*')
        .then(res => {
            reviewsContainer.innerHTML = '';
            res.data.data.forEach(item => {
               const attribute = item.attributes;
                const review = {
                    name: attribute.name,
                    company: attribute.company,
                    position: attribute.position,
                    text: attribute.text,
                    photo: attribute.photo.data.attributes.url,
                };
                reviewsContainer.insertAdjacentHTML(
                    'beforeend',
                    getElementStructure(review)
                )
            })
        })

}
