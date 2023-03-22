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
        switch (response.status) {
            case 200:
                document.cookie = `loginToken=${result.token}`;
                location.replace("http://127.0.0.1:5500/FrontEnd/");
            break;
            case 404:
                document.getElementById("errorEmail").innerHTML = "Votre E-mail ne correspond pas.";
            break;
            case 401:
                document.getElementById("errorPassword").innerHTML = "Votre mot de passe ne correspond pas.";
            break;
        }
    } catch (error) {
        console.error(error);
    }
});