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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                                    <input type="image" id="fileElem" multiple accept="image/*" onchange="handleFiles(this)" value="+ Ajouter photo">
                                    <p>jpg, png : 4mo max</p>
                                </div>
                                <div id="showPicture"></div>
                            </div>
                            <label>Titre</label>
                            <input type='text' name="titleImg" class="dragImgInfo">
                            <label>Catégorie</label>
                            <select name="categoryOption" class="dragImgInfo" id="dog-names">
                                <option></option>
                                <option value="Objets">Objets</option>
                                <option value="Appartements">Appartements</option>
                                <option value="Hotels & restaurants">Hotels & restaurants</option>
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

                // Handle dropped files
                dropAddImg.addEventListener('drop', handleDrop, false)
                function preventDefaults(e) {
                    e.preventDefault()
                    e.stopPropagation()
                }

                function handleDrop(e) {
                    let files = [...e.dataTransfer.files];
                    files.forEach(function previewFile(file) {
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = function () {
                            // console.log(reader);
                            let img = document.createElement('img');
                            img.src = reader.result;
                            img.setAttribute('class', 'dropImgModal');
                            document.getElementById('showPicture').appendChild(img);
                            document.getElementById('contentDropAddImg').style.display = 'none';
                        }
                    })

                }
                const submitButtonNewPicture = document.getElementById('submitPicture');
                // console.log(handleDrop());
                // console.log(document.formAddImg.titleImg.value);
                // document.formAddImg.categoryOption.value != '' && 
                // document.formAddImg.titleImg.value != ''
                // if (submitPicture.submit()) {
                // console.log("CACATOES");
                submitButtonNewPicture.addEventListener('click', (e) => {
                    // console.log(e);
                    // console.log("TEST");
                    console.log(dropAddImg);
                    // if () {

                    // }
                })
                // files.forEach(function uploadFile(file) {
                //     let url = `http://localhost:5678/api/works/${}`
                //     let xhr = new XMLHttpRequest()
                //     let formData = new FormData()
                //     console.log(formData);
                //     xhr.open('POST', url, true)
                //     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

                //     formData.append('upload_preset', 'ujpu6gyk')
                //     formData.append('file', file)
                //     xhr.send(formData)
                // })
                // }

            });
        });
    const textDescription = document.getElementById('introduction').children[1].children[0];
    let titleDescription = "Designer d'espace";
    let text1 = `Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.`;
    let text2 = `Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.`;
    let text3 = `En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)`;
    textDescription.innerHTML = 
        `<h2>${titleDescription}</h2>
    <p>${text1}</p>
    <p>${text2}</p>
    <p>${text3}</p>`
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
            let newAlt = prompt("définissez une description");
            let validImg = confirm('Voulez vous confirmer les changements');
            const imgProfile = document.getElementById('introduction').children[0].children[0];
            if (validImg === true) {
                imgProfile.src = newSrc;
                imgProfile.alt = newAlt;
            }
        })

        const textDescriptionEdit = document.getElementById('textDescriptionEdit');
        textDescriptionEdit.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('introduction').children[1].children[0].innerHTML = `
            <div class="editTextDescription">
                <input type="button" id="newTitle" value="Changer le titre">
                <textarea id="textDescription" name="txtname" rows="4" cols="50" maxlength="500">Écrivez votre texte</textarea>
                <input type="button" id="validText" value="valider">
            </div>`
            document.getElementById('newTitle').addEventListener('click', (e) => {
                e.preventDefault();
                let newTitle = prompt('Voulez vous éditer un nouveau titre ?', `${titleDescription}`);
                return newTitle;
            })

            document.getElementById('validText').addEventListener('click', (e) => {
                e.preventDefault();
                let textDescription = document.getElementById('textDescription').value;
                let validText = confirm('Êtes-vous sur de vouloir confirmer les modifications ?');
                if (newTitle != titleDescription) {
                    titleDescription = newTitle;
                }
                if (validText === true) {
                    document.getElementById('introduction').children[1].children[0].innerHTML = `
                    <h2>${titleDescription}</h2>
                    <p>${textDescription}</p>`
                }
            });
        })
    }
});