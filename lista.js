let table = document.querySelector('data');
let searchUser = document.getElementById('searchUser');

const readUsers = async() =>  {
    const url = "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR"
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then((response) => response.json())
    .then((data) => {
        showUsers(data)
    })
    .catch(err => console.log(err));
}

async function searchUsers() {
    const url = await "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=" + document.getElementById('searchUser').value
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then((response) => response.json())
    .then((data) => {
        showUsers(data);
    })
    .catch(err => console.log(err));
}

const showUsers = async (data) =>  {
    let body = ''
    let backGroundColor = ''
    data.forEach(user => {
        if (user.bloqueado === 'N') {
            backGroundColor = '#cef8c6'
        } else {
            backGroundColor = '#fd9f8b'
        }
        body += `<tr style="background-color:${backGroundColor}"><td>${user.id}</td>  
             <td>${user.usuario}</td>
             <td>${user.bloqueado}</td>
             <td>${user.nombre}</td>
             <td>${user.apellido}</td>
             <td onclick="blockUser(${user.id});"><input type="button" id="bloquear" value="Bloquear"></td>
             <td onclick="unlockUser(${user.id});"><input type="button" id="desbloquear" value="Desbloquear"></td>
             </tr>`
    });
    if (body == '') {
        alert('No se encontraron coincidencias')
        body = "No se encontraron coincidencias"
        document.getElementById('data').innerHTML = body
    } else {
        document.getElementById('data').innerHTML = body
    }
}

const blockUser = async (userId) =>  {
    const url = "http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser="+ userId +"&estado=Y"
    fetch(url)
    .then(() => {
        readUsers();
    })
    .catch(err => console.log(err))
}

const unlockUser = async (userId) =>  {
    const url = "http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser="+ userId +"&estado=N"
    fetch(url)
    .then((data) => {
        readUsers();
    })
    .catch(err => console.log(err))
}

blockUser()
unlockUser()
readUsers();
searchUsers()