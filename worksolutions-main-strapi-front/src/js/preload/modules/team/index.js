import axios from "axios";
import { STRAPI_PREFIX as prefix }  from "../../index";

const carousel = document.querySelector('.teamCarousel__line')

function getElementStructure(cardData) {
    return (
    `
        <div class="teamCard js-teamCarousel-card">
            <div class="teamCard__view">
                <picture>
                    <img src="${cardData.photo}" class="teamCard__image ls-is-cached lazyloaded">
                </picture>
            </div>
            <div class="teamCard__info">
                <div class="personalCard">
                    <div class="js-personalCard-animate">
                        <div class="personalCard__name">
                            ${cardData.name}
                        </div>
                        <div class="personalCard__employment">
                            ${cardData.position}
                        </div>
                    </div>
                    ${cardData.experience ?
                       ` <div class="personalCard__experience js-personalCard-animate">
                            <p>
                                <strong>Опыт:</strong>
                                <span>${cardData.experience}</span>
                            </p>
                            ${cardData.skills ? 
                                `
                                <p>
                                    <strong class="stack">
                                        ${cardData.skills}
                                    </strong> 
                                </p>
                                ` : ''
                             }    
                        </div>` : ''
                     }
                     ${cardData.text ?
                        `
                            <div class="personalCard__comment js-personalCard-animate">
                                   ${cardData.text}
                            </div> 
                        ` : ''}
                </div>
            </div>
            
        </div>
    `
    )
}

function getStack(skills) {
    if (skills.length <= 0) return ''
    return skills.map(skill => {
        return skill.attributes.title
    }).join(', ')
}

function getStackItem() {
    let count = 0;
    return function(stack) {
        if (!(stack.length - 1 >= count)) return
        return stack[count++]
    }
}

export default function() {
   return axios.get( prefix + '/api/specialists?populate=*')
       .then(res => {
           carousel.innerHTML = '';
          res.data.data.forEach((item) => {
             const attribute = item.attributes;
             const cardObject = {
                 photo: prefix + attribute.photo.data.attributes.url,
                 name: attribute.name,
                 position: attribute.position,
                 experience: attribute.experience + ' лет',
                 text: attribute.description,
                 skills: getStack(attribute.skills.data)
             }
              carousel.insertAdjacentHTML(
                  'beforeend' ,
                  getElementStructure(cardObject)
              )
          })
       })
}
