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

                    // change active button filter
                    const lengthButtonFilter = buttonFilter.length;
                    for (let i = 0; i < lengthButtonFilter; i++) {
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
            if (getCookie[0] === "loginToken" && getCookie[1].length === 143) {
                const modal = document.getElementById('edit').appendChild(document.createElement("div"));
                document.getElementById('projectEdit').addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.setAttribute('class', 'modal');
                    modal.appendChild(document.createElement('div')).setAttribute('id', 'modalContent')
                    const modalContent = document.getElementById('modalContent');
                    modalContent.innerHTML =
                        `<div class="closeModal">
                        <i class="fa-solid fa-arrow-left-long" id="previousPage"></i>
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
                    </div>
                    <div class="addPicture">
                        <h3>Ajout photo</h3>
                        <form class="formDragDrop" name="formAddImg">
                            <div id="dropAddImg">
                                <div id="contentDropAddImg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                                    <input type="image" id="fileElem" multiple accept="image/*" value="+ Ajouter photo">
                                    <p>jpg, png : 4mo max</p>
                                </div>
                                <div id="showPicture"></div>
                            </div>
                            <label>Titre</label>
                            <input type='text' name="titleImg" class="dragImgInfo">
                            <label>Catégorie</label>
                            <select name="categoryOption" class="dragImgInfo">
                                <option></option>
                                <option value="1">Objets</option>
                                <option value="2">Appartements</option>
                                <option value="3">Hotels & restaurants</option>
                            </select
                            <hr>
                            <input type="button" value="Valider" id="submitPicture">
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
                        let buttonEdit = document.getElementById('edit');
                        buttonEdit.lastChild.replaceChildren();
                        buttonEdit.lastChild.classList.remove('modal');
                    });
                    // button delete gallery
                    const arrayDeleteImgButton = document.getElementsByClassName('deleteLogoModal');
                    const arrayDeleteImgButtonLength = arrayDeleteImgButton.length;
                    for (let i = 0; i < arrayDeleteImgButtonLength; i++) {
                        const deleteImgButton = arrayDeleteImgButton[i];
                        deleteImgButton.addEventListener('click', (e) => {
                            e.preventDefault();
                            // console.log(e);
                            // fetch(`http://localhost:5678/api/works/${id}`, { method: 'DELETE' })
                            //     .then(response => response.json())
                            //     .then(response => console.log(response))

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
                        document.getElementsByClassName('closeModal')[0].style.justifyContent = "space-between";
                    });
                    // button "<-" return previous page
                    previousPage.addEventListener('click', (e) => {
                        e.preventDefault;
                        document.getElementsByClassName('addPicture')[0].style.display = "none";
                        document.getElementsByClassName('galleryContent')[0].style.display = "initial";
                        previousPage.style.display = "none";
                        document.getElementsByClassName('closeModal')[0].style.justifyContent = "flex-end";
                    });

                    // drag and drop image
                    let dropAddImg = document.getElementById('dropAddImg');

                    // Prevent default drag behaviors
                    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                        dropAddImg.addEventListener(eventName, preventDefaults, false);
                        document.body.addEventListener(eventName, preventDefaults, false);
                    });
                    function preventDefaults(e) {
                        e.preventDefault()
                        e.stopPropagation()
                    }
                    let urlNewPicture = '';
                    // create an image with drop link
                    dropAddImg.addEventListener('drop', function handleDrop(e) {
                        urlNewPicture = e.dataTransfer.getData('URL');
                        document.getElementById('contentDropAddImg').style.display = 'none';
                        dropAddImg.style.border = 'none';
                        let newPicture = document.createElement('img');
                        newPicture.src = urlNewPicture;
                        newPicture.setAttribute('class', 'dropImgModal');
                        document.getElementById('showPicture').appendChild(newPicture);
                    }, false)

                    // create a style border when we arrive in the drag area
                    dropAddImg.addEventListener('dragenter', (e) => {
                        e.preventDefault();
                        dropAddImg.style.border = '5px dashed var(--green-color)';
                        document.getElementById('contentDropAddImg').style.display = 'none';
                    })

                    // delete style border when we release picture in drag area
                    dropAddImg.addEventListener('dragleave', (e) => {
                        e.preventDefault();
                        document.getElementById('contentDropAddImg').style.display = 'flex';
                    })

                    // submit data form and create picture in database
                    const submitButtonNewPicture = document.getElementById('submitPicture');
                    submitButtonNewPicture.addEventListener('click', (e) => {
                        e.preventDefault();

                        let addTitlePicture = document.formAddImg.titleImg.value
                        let addCategoryPicture = document.formAddImg.categoryOption.value;
                        // console.log("URL de l'image => " + urlNewPicture);
                        // console.log("Titre de l'image => " + addTitlePicture);
                        // console.log("Categorie de l'image => " + addCategoryPicture);
                        const url = `http://localhost:5678/api/works/`
                        const formData = new FormData()
                        formData.append('imageUrl', urlNewPicture);
                        formData.append('title', addTitlePicture);
                        formData.append('categoryId', addCategoryPicture);

                        // headers: {
                        //     'Content-Type': 'application/json;charset=utf-8'
                        // },
                        if (addTitlePicture != '' && addCategoryPicture != '' && urlNewPicture != '') {
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `bearer ${getCookie[1]}`
                                },
                                body: formData
                            })
                        }
                    })

                });
            }
        });
    const textDescription = document.getElementById('textEdit').children[0];
    let titleDescription = textDescription.innerHTML;
    // with the connection
    let getCookie = document.cookie.split('=');
    if (getCookie[0] === "loginToken" && getCookie[1].length === 143) { // retrieve with header
        const editComponent = document.getElementById('edit');
        editComponent.innerHTML =
            `<i class="fa-regular fa-pen-to-square"></i>
            <p class="buttonEdit">Mode édition</p>
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
        const arrayIdLength = arrayId.length;
        for (let i = 0; i <= arrayIdLength - 1; i++) {
            const id = ["profileImgEdit", "textDescriptionEdit", "projectEdit"]
            const editClass = document.getElementsByClassName('edit');
            arrayId[i].insertBefore(document.createElement('a'), arrayId[i].lastChild).setAttribute('class', 'edit')
            editClass[i].setAttribute('id', id[i]);
            editClass[i].style.cursor = 'pointer';
            editClass[i].innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';
        }
        // delete just 1 image
        const profileImgEdit = document.getElementById('profileImgEdit');
        profileImgEdit.addEventListener('click', (e) => {
            e.preventDefault();
            let newSrc = prompt("Nouvel url pour l'image");
            let newAlt = prompt("Définissez une description");
            let validImg = confirm('Voulez vous confirmer les changements');
            const imgProfile = document.getElementById('introduction').children[0].children[0];
            if (validImg === true && newSrc != '') {
                imgProfile.src = newSrc;
                imgProfile.alt = newAlt;
            }
        })

        // edit text and image profile
        const textDescriptionEdit = document.getElementById('textDescriptionEdit');
        textDescriptionEdit.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('introduction').children[1].children[0].innerHTML = `
            <div class="editTextDescription">
                <input type="button" id="newTitle" value="Changer le titre">
                <textarea id="textDescription" name="txtname" rows="4" cols="50" maxlength="600" placeholder="Écrivez votre texte"></textarea>
                <input type="button" id="validText" value="valider">
            </div>`
            let newTitle = titleDescription;
            document.getElementById('newTitle').addEventListener('click', (e) => {
                e.preventDefault();
                newTitle = prompt('Voulez vous éditer un nouveau titre ?', `${titleDescription}`);
            })

            // description modification
            document.getElementById('validText').addEventListener('click', (e) => {
                e.preventDefault();
                let textDescription = document.getElementById('textDescription').value;
                let validText = confirm('Êtes-vous sur de vouloir confirmer les modifications ?');
                if (newTitle != titleDescription && newTitle != '') {
                    titleDescription = newTitle;
                }
                let arrayText = textDescription.split("\n\n");
                if (validText === true) {
                    if (arrayText[1] === undefined) {
                        document.getElementById('textEdit').innerHTML = `
                        <h2>${titleDescription}</h2>
                        <p>${textDescription}</p>`
                    } else {
                        for (let i = 0; i < arrayText.length; i++) {
                            document.getElementById('textEdit').innerHTML = `
                            <h2>${titleDescription}</h2>
                            <p>${arrayText[0]}</p>
                            <p>${arrayText[1]}</p>
                            <p>${arrayText[2]}</p>`
                        }
                    }
                }
            });
        })
    }
});