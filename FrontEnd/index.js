document.addEventListener('DOMContentLoaded', function () {
    let gallery = document.getElementById('gallery');
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(response => {
            response.forEach(imageInfo => {
                let title = imageInfo.title;
                let imageUrl = imageInfo.imageUrl;
                let categoryId = imageInfo.categoryId;
                gallery.innerHTML += `
            <figure class="project_item" data-item-category="${categoryId}">
            <img src="${imageUrl}" alt="${title}">
            <figcaption>${title}</figcation>
            </figure>`;
            });
            const buttonFilter = document.querySelectorAll('.container_filter li');
            const projectsItem = document.querySelectorAll('.project_item');
            buttonFilter.forEach(listButton => {
                listButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    const filterButtonCategory = event.target.dataset.category;
                    [...projectsItem].forEach(item => {
                        const projectItemCategory = item.dataset.itemCategory;
                        console.log(filterButtonCategory == 0);
                        if (filterButtonCategory == 0 || projectItemCategory === filterButtonCategory) {
                            item.style.display = "initial";
                        } else {
                            item.style.display = "none";
                        }
                    })
                });
            });
        });
    let getCookie = document.cookie.split('=');
    if (getCookie[0] === "loginToken" && getCookie[1].length === 143) {
        let editComponent = document.getElementById('edit');
        editComponent.innerHTML =
            `<i class="fa-regular fa-pen-to-square"></i>
        <p>Mode édition</p>
        <button type="">publier les changements</button>`
        editComponent.style.display = 'flex';
        document.querySelector('nav li:nth-child(3)').innerHTML = `<a href="./" id="disconnect">Logout</a>`;
        document.getElementById('disconnect').addEventListener('click', function (event) {
            event.preventDefault();
            document.cookie = 'loginToken=;Max-age=0;';
            location.reload();
        });
        document.querySelector('figure').innerHTML = `<img src="./assets/images/sophie-bluel.png" alt=""><div class="edit"><i class="fa-regular fa-pen-to-square"></i><p>modifier</p></div>`
    }
});