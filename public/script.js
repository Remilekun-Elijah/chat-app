const form = document.querySelector('form');
const socket = io();
const tag = tag => document.querySelector(tag);

form.addEventListener('submit', (e) => {
    const message = form.message.value;
    e.preventDefault();
    console.log('form submitted');
    // socket.on('chat', message);
    socket.on("chat", data => {
        tag('.typing').innerText = ``;
        tag('.chat-window').innerHTML += `
<br>
${data.user}: ${message}`;
        // tag('.chat-window').innerText = "user is typing";
    });
    form.message.value = '';
});

form.message.addEventListener('keydown', (e) => {

    socket.emit('typing', form.message.value);

});


// const user = (data, user) => {user = 'Remilekun';
socket.on("typing", (data, user) => {
        tag('.typing').innerText = `Someone is typing...`;
        // tag('.chat-window').innerText = "user is typing";
    })
    // chat window