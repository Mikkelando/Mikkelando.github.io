let mediaRecorder;
let audioChunks = [];

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message !== '') {
        displayMessage('You: ' + message);
        handleResponse(message);
        messageInput.value = '';
    }
}

function displayMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleResponse(message) {
    const keywords = ['hello', 'hi', 'how are you', 'good', 'привет', 'ку', 'yo'];
    const responses = ['Привет :)', 'хелло!','Hello!', 'Hi there!', 'I am doing well, thank you!', 'Good to hear!'];

    for (let i = 0; i < keywords.length; i++) {
        if (message.toLowerCase().includes(keywords[i])) {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            setTimeout(function() {
                displayMessage('Bot: ' + randomResponse);
            }, 1000); 
            return;
        }
    }
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = function(event) {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = function() {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audioElement = new Audio(audioUrl);
                displayMessage('You: Voice Message (click to listen)');
                const chatMessages = document.getElementById('chat-messages');
                chatMessages.lastChild.onclick = function() {
                    audioElement.play();
                };
            };
            mediaRecorder.start();
        })
        .catch(function(error) {
            console.error('Error accessing microphone:', error);
        });
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
}



window.onload = function() {
    const toggleChatButton = document.getElementById('toggle-chat');
    const chatContainer = document.getElementById('chat-container');
    const sendButton = document.getElementById('send-button');
    const recordButton = document.getElementById('record-button');
    

    toggleChatButton.addEventListener('click', function() {
        if (chatContainer.style.display === 'none') {
            chatContainer.style.display = 'block';
        } else {
            chatContainer.style.display = 'none';
        }
    });

    let isRecording = false;

    recordButton.addEventListener('click', function() {
        if (!isRecording) {
            startRecording();
            isRecording = true;
            recordButton.classList.add('recording');
        } else {
            stopRecording();
            isRecording = false;
            recordButton.classList.remove('recording');
        }
    });


    sendButton.addEventListener('click', sendMessage);
    

    
};



var logo = document.querySelector('.intro_img');
    var rotationAngle = 0;
    setInterval(function() {
        rotationAngle -= .1;
        logo.style.transform = 'rotate(' + rotationAngle + 'deg)';
    }, 10);

var map = L.map('map').setView([55.803474, 37.409846], 13);




var marker = L.marker([55.803474, 37.409846]).addTo(map);
marker.bindPopup("<b>МИЭМ</b><br>Мы учимся туть").openPopup();