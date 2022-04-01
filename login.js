let user = document.getElementById('user')
let pass = document.getElementById('pass')


async function eventAsync() {
    const url = "http://168.194.207.98:8081/tp/login.php?user=" + document.getElementById('user').value + "&pass=" + document.getElementById('pass').value;

    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ a: 10, b: 'texto' })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.respuesta == "OK") {
            document.location.href="lista.html"
        } else {
            alert("Error, user "+ document.getElementById('user').value  +" invalido")
            alert("Error, contraseña "+ document.getElementById('pass').value +" Invalida")
        }
    })
    .catch(error => console.log(error));
}
eventAsync();
