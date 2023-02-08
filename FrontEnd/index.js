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