// script.js

let language = 'pt-BR'; // Idioma inicial (Português)

const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('user-input');

function changeLanguage() {
    language = document.getElementById('language').value;
    resetChat();
}

function sendMessage() {
    const userText = userInput.value;
    if (userText.trim()) {
        displayMessage(language === 'pt-BR' ? 'Você: ' + userText : 'You: ' + userText);
        userInput.value = '';

        const botResponse = getBotResponse(userText);
        displayMessage(language === 'pt-BR' ? 'Namorada: ' + botResponse : 'Girlfriend: ' + botResponse);
        speakText(botResponse);
    }
}

function displayMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getBotResponse(userText) {
    const responses = {
        pt: {
            greetings: [
                "Oi! Como você está hoje?",
                "Oi, meu amor! O que você tem feito?",
                "Olá! Como foi o seu dia?",
            ],
            feelings: [
                "Eu estou bem, obrigada por perguntar. E você?",
                "Eu estou super feliz hoje! E você, como está?",
                "Estou ótima, sempre melhor quando falo com você.",
            ],
            random: [
                "O que você acha de nós sairmos para um café amanhã?",
                "Hoje está tão tranquilo, não é?",
                "Eu estava pensando em algo divertido para fazermos... que tal ver um filme?",
            ],
            support: [
                "Você está bem? Se precisar conversar, estou aqui.",
                "Se você precisar de algo, pode contar comigo.",
                "Sempre que você precisar de apoio, estarei aqui para você.",
            ],
            default: [
                "Hmmm... interessante. Me conta mais sobre isso!",
                "Não sei o que responder a isso... mas gostei de ouvir!",
                "Fiquei pensando no que você falou... interessante!",
            ]
        },
        en: {
            greetings: [
                "Hi! How are you today?",
                "Hey, my love! What have you been up to?",
                "Hello! How was your day?",
            ],
            feelings: [
                "I'm fine, thanks for asking. How about you?",
                "I'm super happy today! How are you doing?",
                "I'm great, always better when I talk to you.",
            ],
            random: [
                "What do you think about us going out for coffee tomorrow?",
                "It's so peaceful today, right?",
                "I was thinking of something fun we could do... how about watching a movie?",
            ],
            support: [
                "Are you okay? If you need to talk, I'm here.",
                "If you need anything, you can count on me.",
                "Whenever you need support, I'll be here for you.",
            ],
            default: [
                "Hmmm... interesting. Tell me more about that!",
                "I don't know how to respond to that... but I liked hearing it!",
                "I've been thinking about what you said... interesting!",
            ]
        }
    };

    // Detectar saudações
    if (/oi|olá|hi|hello/i.test(userText)) {
        return getRandomResponse(responses[language === 'pt-BR' ? 'pt' : 'en'].greetings);
    }

    // Detectar sentimentos
    if (/como você está|tudo bem|how are you/i.test(userText)) {
        return getRandomResponse(responses[language === 'pt-BR' ? 'pt' : 'en'].feelings);
    }

    // Mensagens aleatórias para manter a conversa fluindo
    if (/filme|saída|café|movie|coffee/i.test(userText)) {
        return getRandomResponse(responses[language === 'pt-BR' ? 'pt' : 'en'].random);
    }

    // Oferecer suporte se o usuário estiver desabafando
    if (/triste|problema|estou mal|ansioso|sad|problem|anxious/i.test(userText)) {
        return getRandomResponse(responses[language === 'pt-BR' ? 'pt' : 'en'].support);
    }

    // Caso a mensagem não seja reconhecida, retornar uma resposta padrão
    return getRandomResponse(responses[language === 'pt-BR' ? 'pt' : 'en'].default);
}

function getRandomResponse(responseArray) {
    const randomIndex = Math.floor(Math.random() * responseArray.length);
    return responseArray[randomIndex];
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // Ajusta o idioma para o valor atual

    const voices = speechSynthesis.getVoices();

    // Tentar encontrar uma voz feminina mais suave ou com características de voz de anime
    const voice = voices.find(v => v.name.includes('Google') && v.gender === 'female');
    utterance.voice = voice || voices.find(v => v.lang === language);

    // Ajustar o tom e a velocidade para algo mais agudo e animado
    utterance.pitch = 1.5;  // Aumentar o tom
    utterance.rate = 1.1;   // Acelerar ligeiramente a fala

    speechSynthesis.speak(utterance);
}

function resetChat() {
    messagesDiv.innerHTML = '';
}
