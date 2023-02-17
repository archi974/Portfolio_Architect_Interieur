document.addEventListener('DOMContentLoaded', function () {
    let gallery = document.getElementById('gallery');
    let buttonFilter = document.querySelectorAll('.container_filter li');
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(response => {
            buttonFilter.forEach(listButton => {
                let valueFilter = listButton.querySelector('input').dataset.category;
                listButton.addEventListener('click', () => {
                    switch (valueFilter) {
                        case "0":
                            gallery.innerHTML = "";
                            response.forEach(imageInfo => {
                                let title = imageInfo.title;
                                let imageUrl = imageInfo.imageUrl;
                                let categoryId = imageInfo.categoryId;
                                gallery.innerHTML += `
                                    <figure data-item-category="${categoryId}">
                                        <img src="${imageUrl}" alt="${title}">
                                        <figcaption>${title}</figcation>
                                    </figure>`;
                            });
                            break;
                        case "1":
                            gallery.innerHTML = "";
                            response.forEach(imageInfo => {
                                let title = imageInfo.title;
                                let imageUrl = imageInfo.imageUrl;
                                let categoryId = imageInfo.categoryId;
                                if (categoryId === 1) {
                                    gallery.innerHTML += `
                                        <figure data-item-category="${categoryId}">
                                            <img src="${imageUrl}" alt="${title}">
                                            <figcaption>${title}</figcation>
                                        </figure>`;
                                }
                            });
                            break;
                        case "2":
                            gallery.innerHTML = "";
                            response.forEach(imageInfo => {
                                let title = imageInfo.title;
                                let imageUrl = imageInfo.imageUrl;
                                let categoryId = imageInfo.categoryId;
                                if (categoryId === 2) {
                                    gallery.innerHTML += `
                                        <figure data-item-category="${categoryId}">
                                            <img src="${imageUrl}" alt="${title}">
                                            <figcaption>${title}</figcation>
                                        </figure>`;
                                }
                            });
                            break;
                        case "3":
                            gallery.innerHTML = "";
                            response.forEach(imageInfo => {
                                let title = imageInfo.title;
                                let imageUrl = imageInfo.imageUrl;
                                let categoryId = imageInfo.categoryId;
                                if (categoryId === 3) {
                                    gallery.innerHTML += `
                                        <figure data-item-category="${categoryId}">
                                            <img src="${imageUrl}" alt="${title}">
                                            <figcaption>${title}</figcation>
                                        </figure>`;
                                }
                            });
                            break;
                        default:
                            break;
                    }
                });
            });

        });
});