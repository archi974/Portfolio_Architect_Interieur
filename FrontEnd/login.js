document.getElementById('buttonSubmit').addEventListener('click', async function (event) {
    event.preventDefault();
    const email = document.myForm.email.value;
    const password = document.myForm.password.value;
    const formData = {"email": email, "password": password}
    try {
        if (email && password) {
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
                    location.replace("http://127.0.0.1:5500/index.html");
                break;
                default:
                    document.getElementById("errorMessageLogin").innerHTML = "Votre E-mail ou votre mot de passe ne correspond pas.";
            }
        } else {
            document.getElementById("errorMessageLogin").innerHTML = "Veuillez remplir les champs Email et Mot de passe.";
        }
    } catch (error) {
        console.error(error);
    }
});