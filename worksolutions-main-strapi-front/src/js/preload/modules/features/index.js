import axios from "axios";

export default function() {
    const featuresItems = document.querySelectorAll(".features__item");

    axios.get('http://localhost:1337/api/working-with-uses?populate=image')
        .then(res => {
           return res.data.data.map(item => {
               return {
                   title: item.attributes.title,
                   description: item.attributes.description,
                   icon:
                       "http://localhost:1337" + item.attributes.image.data.attributes.url,
               }
           })
        })
        .then(res => {
            res.forEach((item, index) => {
                featuresItems[index].children[0].style.backgroundImage = `url('${item.icon}')`;
                featuresItems[index].children[1].style.backgroundImage = item.title;
                featuresItems[index].children[2].style.backgroundImage = item.description;
            })
        })
}