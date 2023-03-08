document.getElementById('buttonSubmit').addEventListener('click', async function (event) {
    event.preventDefault();
    let formData = {"email": document.myForm.email.value, "password": document.myForm.password.value}
    try {
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData),
    
        });
        let result = await response.json();
        let alertMessage = document.querySelector('form').appendChild(document.createElement('div'), document.querySelector('form').lastChild);
        alertMessage.setAttribute('class', 'alertMessageForm')
        if (response.status === 200) {
            document.cookie = `loginToken=${result.token}`;
            location.replace("http://127.0.0.1:5500/FrontEnd/");
        } else if(response.status === 404) {
            alertMessage.innerHTML = "Votre E-mail ne correspond pas.";
        } else if(response.status === 401){
            alertMessage.innerHTML = "Votre mot de passe ne correspond pas.";
        } else {
            alertMessage.innerHTML = "Veuillez renseigner les champs E-mail et mot de passe";
        }
    } catch (error) {
        console.error(error);
    }
});