document.addEventListener('DOMContentLoaded', function () {

    const gallery = document.getElementById('gallery');
    const cookieToken = document.cookie.split('='); // getCookie from name
    const editBalise = document.getElementById('edit');
    const closeAndChangeModal = document.getElementsByClassName('closeAndChangeModal')
    // create picture loop with description on load page
    // request ajax
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

            // filter button
            const buttonFilter = document.querySelectorAll('#container_filter li');
            const projectsItem = document.querySelectorAll('.project_item');
            buttonFilter.forEach(listButton => {
                listButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    const filterButtonCategory = event.target.dataset.category;

                    // change active button filter
                    const buttonFilterLength = buttonFilter.length;
                    for (let i = 0; i < buttonFilterLength; i++) {
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
            if (cookieToken[0] === "loginToken") {
                const modal = editBalise.appendChild(document.createElement("div"));
                document.getElementById('projectEdit').addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.setAttribute('class', 'modal');
                    modal.appendChild(document.createElement('div')).setAttribute('id', 'modalContent')
                    const modalContent = document.getElementById('modalContent');
                    modalContent.innerHTML =
                        `<div class="closeAndChangeModal">
                            <i class="fa-solid fa-arrow-left-long" id="previousPage"></i>
                            <i class="fa-solid fa-xmark" id="closeModal"></i>
                        </div>
                        <div class="galleryContent">
                            <h2>Galerie photo</h2>
                            <div id="contentImgModal"></div>
                            <hr>
                            <div class="addAndRemoveImg">
                                <input type="button" value="Ajouter une photo" id="buttonAddPicture">
                                <a href="#" id="deleteAllImg">Supprimer la galerie</a>
                            </div>
                        </div>
                        <div class="addPicture">
                            <h3>Ajout photo</h3>
                            <form class="formDragDrop" name="formAddImg" enctype="multipart/form-data">
                                <div id="dropAddImg">
                                    <div id="contentDropAddImg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                                        <div class="fileElem">
                                            <input type="file" id="dataFileElem" accept="image/*" name="test">
                                            <label for="test">+ Ajouter photo</label>
                                        </div>
                                        <p>jpg, png : 4mo max</p>
                                    </div>
                                    <div id="showPicture">
                                        <img src="#" class="dropImgModal" alt>
                                    </div>
                                </div>
                                <label class="dataForm">Titre</label>
                                <input class="dragImgInfo" type='text' name="titleImg">
                                <label class="dataForm">Catégorie</label>
                                <select class="dragImgInfo" name="categoryOption">
                                    <option></option>
                                    <option value="1">Objets</option>
                                    <option value="2">Appartements</option>
                                    <option value="3">Hotels & restaurants</option>
                                </select
                                <hr>
                                <input type="button" value="Valider" id="submitPicture">
                                <p id="errorMessageModal"></p>
                            </form>
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
                    });

                    // Button 'X' for close modal
                    document.getElementById('closeModal').addEventListener('click', (e) => {
                        e.preventDefault();
                        editBalise.lastChild.replaceChildren();
                        editBalise.lastChild.classList.remove('modal');
                    });

                    // button delete gallery
                    const arrayDeleteImgButton = document.querySelectorAll('.deleteLogoModal'); // querySelectorAll
                    const objectImgLength = response.length;
                    for (let i = 0; i < objectImgLength; i++) {
                        let deleteImgButton = arrayDeleteImgButton[i];
                        let pictureId = response[i].id;
                        deleteImgButton.addEventListener('click', async (e) => {
                            e.preventDefault();
                            try {
                                const responseDelete = await fetch(`http://localhost:5678/api/works/${pictureId}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Authorization': `Bearer ${cookieToken[1]}`,
                                        'accept': 'application/json'
                                    }
                                });
                                if (!responseDelete.ok) {
                                    throw new Error('Network response was not ok');
                                } else {
                                    console.log('Image deleted successfully.');
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        });
                    }

                    // button add picture
                    const addPicture = document.getElementById('buttonAddPicture');
                    const previousPage = document.getElementById('previousPage');
                    addPicture.addEventListener('click', (e) => {
                        e.preventDefault;
                        document.getElementsByClassName('addPicture')[0].style.display = "initial";
                        document.getElementsByClassName('galleryContent')[0].style.display = "none";
                        previousPage.style.display = "initial";
                        closeAndChangeModal[0].style.justifyContent = "space-between";
                    });
                    // button "<-" return previous page
                    previousPage.addEventListener('click', (e) => {
                        e.preventDefault;
                        document.getElementsByClassName('addPicture')[0].style.display = "none";
                        document.getElementsByClassName('galleryContent')[0].style.display = "initial";
                        previousPage.style.display = "none";
                        closeAndChangeModal[0].style.justifyContent = "flex-end";
                    });

                    // drag and drop image
                    const dropAddImg = document.getElementById('dropAddImg');
                    const contentDropAddImg = document.getElementById('contentDropAddImg');

                    // create a style border when we arrive in the drag area
                    dropAddImg.addEventListener('dragenter', (e) => {
                        e.preventDefault();

                        dropAddImg.style.border = '5px dashed var(--green-color)';
                        contentDropAddImg.style.display = 'none';
                    })
                    // Prevent default browser behavior that creates an error
                    dropAddImg.addEventListener('dragover', (e) => {
                        e.preventDefault();

                        dropAddImg.style.border = '5px dashed var(--green-color)';
                        contentDropAddImg.style.display = 'none';
                    })

                    // delete style border when we release picture in drag area
                    dropAddImg.addEventListener('dragleave', (e) => {
                        e.preventDefault();
                        dropAddImg.style.border = 'none';
                        contentDropAddImg.style.display = 'flex';
                    })

                    const newPicture = document.getElementById('showPicture').children[0];
                    let urlNewPicture = '';
                    let resultData = {};
                    let imgExist = false;
                    // create an image with drop link
                    dropAddImg.addEventListener('drop', (e) => {
                        e.preventDefault();

                        let urlImg = e.dataTransfer.getData('URL');
                        const fileImg = e.dataTransfer.files[0];
                        const fileExt = fileImg?.name.split('.').pop();

                        // computer file
                        if (fileImg && ['jpg', 'jpeg', 'png', 'gif', 'bmp'].indexOf(fileExt.toLowerCase()) !== -1) {
                            let reader = new FileReader()
                            reader.onload = function (e) {
                                urlNewPicture = e.target.result;
                                contentDropAddImg.style.display = 'none';
                                dropAddImg.style.border = 'none';
                                newPicture.src = urlNewPicture;
                            };
                            reader.readAsDataURL(fileImg);
                            resultData = fileImg;
                            imgExist = true;
                            // navigateur url file
                        } else if (urlImg) {
                            urlNewPicture = urlImg;
                            contentDropAddImg.style.display = 'none';
                            dropAddImg.style.border = 'none';
                            newPicture.src = urlNewPicture;
                            fetch(urlNewPicture)
                                .then(response => response.blob())
                                .then(response => {
                                    resultData = response;
                                })
                            imgExist = true;
                        }
                        if (imgExist) {
                            dropAddImg.style.border = 'none';
                            contentDropAddImg.style.display = 'none';
                        } else {
                            dropAddImg.style.border = 'none';
                            contentDropAddImg.style.display = 'flex';
                        }

                    })


                    // create an image with windows file
                    const dataFileElem = document.getElementById('dataFileElem');
                    dataFileElem.addEventListener('change', (e) => {
                        e.preventDefault();

                        let fileImg = e.target.files[0];
                        let reader = new FileReader()
                        reader.onload = function (e) {
                            urlNewPicture = e.target.result;
                            contentDropAddImg.style.display = 'none';
                            dropAddImg.style.border = 'none';
                            newPicture.src = urlNewPicture;
                        };
                        reader.readAsDataURL(fileImg);
                    })

                    // submit data form and create picture in database
                    const submitButtonNewPicture = document.getElementById('submitPicture');
                    submitButtonNewPicture.addEventListener('click', (e) => {
                        e.preventDefault();

                        let addTitlePicture = document.formAddImg.titleImg.value
                        let addCategoryPicture = document.formAddImg.categoryOption.value;

                        const formData = new FormData()
                        if (resultData.constructor === Object) {
                            resultData = document.getElementById('dataFileElem').files[0];
                        }

                        if (addTitlePicture && addCategoryPicture && resultData) {
                            document.getElementById('errorMessageModal').innerHTML = ''
                            formData.append('image', resultData);
                            formData.append('title', addTitlePicture);
                            formData.append('category', addCategoryPicture);

                            fetch(`http://localhost:5678/api/works/`, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${cookieToken[1]}`,
                                    'accept': 'application/json'
                                },
                                body: formData
                            })
                                .then(response => response.json())
                                .catch(error => console.error(error))
                        } else {
                            document.getElementById('errorMessageModal').innerHTML = 'Veuillez ajouter une image et remplir les champs Titre et Catégorie.';
                        }

                    })

                });
            }
        });

    // with the connection
    if (cookieToken[0] === "loginToken") { // retrieve with header
        const containerFilter = document.getElementById('container_filter');
        editBalise.innerHTML =
            `<i class="fa-regular fa-pen-to-square"></i>
            <p class="editText">Mode édition</p>
            <button id="publishChanges">publier les changements</button>`
        editBalise.style.display = 'flex';
        document.querySelector('nav li:nth-child(3)').innerHTML = `<a href="./" id="disconnect">Logout</a>`;
        document.getElementById('disconnect').addEventListener('click', function (event) {
            event.preventDefault();
            document.cookie = `${cookieToken[0]}=;path=/FrontEnd;domain=127.0.0.1;Max-age=0;`;
            location.reload();
        });

        // three button "modifier"
        const arrayId = [
            document.getElementById('introduction').firstElementChild,
            document.getElementById('introduction').lastElementChild,
            document.getElementById('portfolio').firstElementChild
        ]
        const arrayIdLength = arrayId.length;
        for (let i = 0; i <= arrayIdLength - 1; i++) {
            const editButtonIds = ["profileImgEdit", "textDescriptionEdit", "projectEdit"]
            const editClass = document.getElementsByClassName('edit');
            arrayId[i].insertBefore(document.createElement('a'), arrayId[i].lastChild).setAttribute('class', 'edit')
            editClass[i].setAttribute('id', editButtonIds[i]);
            editClass[i].style.cursor = 'pointer';
            editClass[i].innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';
        }
        // edit image profile
        const profileImgEdit = document.getElementById('profileImgEdit');
        profileImgEdit.addEventListener('click', (e) => {
            e.preventDefault();
            let newSrc = prompt("Nouvel url pour l'image");
            let newAlt = prompt("Définissez une description");
            let validImg = confirm('Voulez vous confirmer les changements');
            const imgProfile = document.getElementById('introduction').children[0].children[0];
            if (validImg && newSrc) {
                imgProfile.src = newSrc;
                imgProfile.alt = newAlt;
            }
        })

        // hide filter bar
        containerFilter.style.visibility = 'hidden';
    }
});