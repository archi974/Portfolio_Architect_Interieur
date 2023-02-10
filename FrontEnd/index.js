document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(response => {
            response.forEach(imageInfo => {
                var figure = document.createElement('figure');
                var gallery = document.getElementById('gallery');
                gallery.appendChild(figure);
                var img = document.createElement('img');
                var imgSrc = imageInfo.imageUrl;
                img.src = imgSrc;
                img.alt = "";
                var figcaption = document.createElement('figcaption');
                figcaption.innerHTML = imageInfo.title;
                figure.appendChild(img);
                figure.appendChild(figcaption);
            });
        });
});

function filterButton(value) {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(response => {
            response.forEach(imageInfo => {
                let CategoryId = imageInfo.category.id;
                displayImage = imageInfo.id - 1;
                switch (value) {
                    case "all":
                        document.querySelector('#gallery').children[displayImage].style.display = "initial";
                        break;
                    case "object":
                        if (CategoryId != 1) {
                            document.querySelector('#gallery').children[displayImage].style.display = "none";
                        } else {
                            document.querySelector('#gallery').children[displayImage].style.display = "initial";
                        }
                        break;
                    case "apartment":
                        if (CategoryId != 2) {
                            console.log(imageInfo.id);
                            document.querySelector('#gallery').children[displayImage].style.display = "none";
                        } else {
                            document.querySelector('#gallery').children[displayImage].style.display = "initial";
                        }
                        break;
                    case "hotel & restaurant":
                        if (CategoryId != 3) {
                            document.querySelector('#gallery').children[displayImage].style.display = "none";
                        } else {
                            document.querySelector('#gallery').children[displayImage].style.display = "initial";
                        }
                        break;
                    default:
                        break;
                }
            });
        })
}