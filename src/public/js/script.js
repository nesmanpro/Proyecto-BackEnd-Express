// Instancia de socket.io del lado del cliente
const socket = io();
const chatBox = document.getElementById('chatBox');
let user;


Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa un usuario para identificarte',
    inputValidator: (value) => {
        return !value && 'necesitas escribir un nombre para continuar'
    },
    allowOutsideClick: false,
}).then(res => {
    user = res.value;
    console.log(user)
})


chatBox.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            // Trim nos permite sacar espacios en blanco del principio y final
            // Si el mensaje tiene mas de 0 caracteres lo enviamos al servidor
            socket.emit('messages', { user: user, message: chatBox.value });
            chatBox.value = '';

        }
    }
})

// Listener de mensajes
socket.on('messages', (data) => {
    let log = document.getElementById('messageLogs');
    let messages = '';

    data.forEach(message => {
        messages = messages + `<strong>${message.user} dice:</strong> ${message.message}<br>`
    });

    log.innerHTML = messages;
})



// Recibimos los productos del servidor:

socket.on('products', (data) => {
    showProds(data);
})

// Funcion montar trabla de cards prods

const showProds = (products) => {
    const prodCont = document.getElementById('prodCont');
    prodCont.innerHTML = '';

    products.forEach(itm => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <h2>${itm.title}</h2>
        <img src="https://dspncdn.com/a1/media/originals/01/37/b6/0137b6c4bb21f01f395f0c975f03e651.jpg" alt="furniture">
        <p>ID: ${itm.id}</p>
        <p>Description:</p>
        <strong>${itm.description}</strong>
        <p>Price: <strong>${itm.price}</strong> $</p>
        <button> Delete Product </button>
        `;
        prodCont.appendChild(card);

        card.querySelector('button').addEventListener('click', () => {
            deleteProd(itm.id);
        });


    });
}

// Eliminar Prod
const deleteProd = (id) => {
    socket.emit('deleteProd', id)
}

// Agregar Prod
document.getElementById('btnSend').addEventListener('click', () => {
    addProd();
})

const addProd = () => {
    const prod = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        img: document.getElementById('img').value,
        code: document.getElementById('code').value,
        stock: parseInt(document.getElementById('stock').value, 10),
        category: document.getElementById('category').value,
        status: document.getElementById('status').value === 'true'
    };

    socket.emit('addProd', prod);
}