const socket = new WebSocket('ws://localhost:8080');

    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const usernameInput = document.getElementById('usernameInput');
    const colorOptions = document.querySelectorAll('.color-option');

    let selectedColor = '#333333';

    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedColor = option.getAttribute('data-color');
      });
    });

    socket.addEventListener('message', event => {
      const { username, color, message } = JSON.parse(event.data);
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `<strong style="color: ${color};">${username}:</strong> ${message}`;
      messagesDiv.appendChild(messageElement);
    });

    const sendMessage = () => {
      const message = messageInput.value;
      const username = usernameInput.value || 'Anonymous';
      if (message.trim() !== '') {
        socket.send(JSON.stringify({ username, color: selectedColor, message }));
        messageInput.value = '';
      }
    };

    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
