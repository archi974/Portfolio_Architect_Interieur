document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
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

                    // add class to filter button
                    for (let i = 0; i < buttonFilter.length; i++) {
                        if (buttonFilter[i].children[0].dataset.category === event.target.dataset.category) {
                            buttonFilter[i].children[0].classList.add('active');
                        } else {
                            buttonFilter[i].children[0].classList.remove('active');
                        }
                    }

                    // condition between filter and images 
                    [...projectsItem].forEach(item => {
                        const projectItemCategory = item.dataset.itemCategory;
                        if (filterButtonCategory == 0 || projectItemCategory === filterButtonCategory) {
                            item.style.display = "initial";
                        } else {
                            item.style.display = "none";
                        }
                    })
                });
            });

            // Modal create content
            const modal = document.getElementById('edit').appendChild(document.createElement("div"));
            document.getElementById('projectEdit').addEventListener('click', (e) => {
                e.preventDefault();
                modal.setAttribute('class', 'modal');
                modal.appendChild(document.createElement('div')).setAttribute('id', 'modal_content')
                document.getElementById('modal_content').innerHTML =
                    `<div class="closeModal">
                        <i class="fa-solid fa-xmark" id="closeModal"></i>
                    </div>
                    <div class="galleryContent">
                        <h2>Galerie photo</h2>
                        <div id="contentImgModal"></div>
                        <hr>
                        <div class="addAndRemoveImg">
                            <input type="button" value="Ajouter une photo" id="buttonAddPicture">
                            <a id="deleteAllImg">Supprimer la galerie</a>
                        </div>
                    </div>`

                // image modal loop with logo
                response.forEach(modalImageInfo => {
                    let imageUrl = modalImageInfo.imageUrl;
                    let title = modalImageInfo.title;
                    document.getElementById('contentImgModal').innerHTML +=
                        `<div class="editImgModal">
                            <div class="imgModal">
                                <img src=${imageUrl} alt="${title}">
                                <div class="logoModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="mooveLogoModal"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="deleteLogoModal"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                </div>
                            </div>
                            <p>éditer</p>
                        </div>`
                })
                document.getElementById('closeModal').addEventListener('click', (e) => {
                    e.preventDefault();
                    let buttonEdit = document.getElementById('edit');
                    buttonEdit.lastChild.replaceChildren();
                    buttonEdit.lastChild.classList.remove('modal');
                });
                let arrayDeleteImgButton = document.getElementsByClassName('deleteLogoModal');
                for (let i = 0; i < arrayDeleteImgButton.length; i++) {
                    const DeleteImgButton = arrayDeleteImgButton[i];
                    DeleteImgButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log(e);
                        // fetch(`http://localhost:5678/api/works/${id}`, {method: 'DELETE'})
                        //     .then(response => response.json())
                        //     .then(response => console.log(response))

                    });
                }
                let addPicture = document.getElementById('buttonAddPicture');
                addPicture.addEventListener('click', (e) => {
                    
                })
            });
        });

    // with the connection
    let getCookie = document.cookie.split('=');
    if (getCookie[0] === "loginToken" && getCookie[1].length === 143) { // retrieve with header
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

        // button "modifier"
        const arrayId = [
            document.getElementById('introduction').firstElementChild,
            document.getElementById('introduction').lastElementChild,
            document.getElementById('portfolio').firstElementChild
        ]
        for (let i = 0; i <= arrayId.length - 1; i++) {
            let id = ["profileImgEdit", "textDescriptionEdit", "projectEdit"]
            let editClass = document.getElementsByClassName('edit');
            arrayId[i].insertBefore(document.createElement('a'), arrayId[i].lastChild).setAttribute('class', 'edit')
            editClass[i].setAttribute('id', id[i]);
            editClass[i].style.cursor = 'pointer';
            editClass[i].innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';
        }
        // <i class="fa-solid fa-arrow-left-long"></i>
        // delete just 1 image

    }
});