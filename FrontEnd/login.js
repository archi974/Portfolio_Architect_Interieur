document.getElementById('buttonSubmit').addEventListener('click', async function (event) {
    event.preventDefault();
    let formData = {"email": document.myForm.email.value, "password": document.myForm.password.value}
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData),
    });

    let result = await response.json();
    console.log(result);
});