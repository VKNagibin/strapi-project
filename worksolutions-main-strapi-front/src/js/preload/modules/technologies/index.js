import axios from "axios";
import { STRAPI_PREFIX as prefix }  from "../../index";

const titles = document.querySelectorAll('.technologies__item-title')
const subtitles = document.querySelectorAll('.technologies__item-subtitle');
const sublists = document.querySelectorAll('.technologies__inner-sublist');

export default function() {
    return axios.get(  prefix + '/api/technologies?populate=sub_technologies.icons')
        .then(res => {
            const technologies = [{}];
            res.data.data.map((item, index) => {
                technologies[index] = {
                    area: item.attributes.title,
                    items: [],
                }
                const technologyItem = item.attributes.sub_technologies.data;

                technologyItem.forEach(tech => {
                    technologies[index].items.push(
                        {
                            title: tech.attributes.title,
                            techs: tech.attributes.icons.data.map((icon) => {
                                return {icon: prefix + icon.attributes.url, techTitle: icon.attributes.name}
                            })
                        }
                    )
                })
            })
            return technologies
        })
        .then(res => {
            let count = 0
            res.forEach((item,index) => {
                titles[index].innerText = item.area;
                item.items.forEach((tech, ind) => {
                    sublists[count++].innerHTML = tech.techs.map((techs,dex) => {
                        return ( `<li class="technologies__inner-subitem">
                                    <img class="technologies__inner-subitem" src="${techs.icon}" alt="${techs.techTitle}">
                                </li>` )
                    }).join('');
                    if (tech.title) {
                        subtitles[ind].innerText = tech.title
                    }
            })

        })
    })
}
