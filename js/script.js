const numbersContainer = document.getElementById('numbers');
const resultElement = document.getElementById('result');
const playButton = document.getElementById('playButton');
const resetButton = document.getElementById('resetButton');
let selectedNumbers = new Set();

// Criar os números de 1 a 60
for (let i = 1; i <= 60; i++) {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = i;
    numberElement.addEventListener('click', () => toggleNumber(i, numberElement));
    numbersContainer.appendChild(numberElement);
}

function toggleNumber(number, element) {
    if (selectedNumbers.has(number)) {
        selectedNumbers.delete(number);
        element.classList.remove('selected');
    } else if (selectedNumbers.size < 6) {
        selectedNumbers.add(number);
        element.classList.add('selected');
    }
}

function playGame() {
    if (selectedNumbers.size !== 6) {
        alert('Por favor, escolha exatamente 6 números!');
        return;
    }

    const computerNumbers = new Set();
    while (computerNumbers.size < 6) {
        computerNumbers.add(Math.floor(Math.random() * 60) + 1);
    }

    const matches = [...selectedNumbers].filter(num => computerNumbers.has(num));

    let resultMessage = `
        Seus números: ${[...selectedNumbers].join(', ')}<br>
        Números sorteados: ${[...computerNumbers].join(', ')}<br>
        Você acertou ${matches.length} número(s)!
    `;

    let highlightMessage = '';
    switch (matches.length) {
        case 4:
            highlightMessage = 'Você fez a quadra!';
            break;
        case 5:
            highlightMessage = 'Bateu na trave, você fez a quina!!';
            break;
        case 6:
            highlightMessage = 'PARABÉNS!!! Você conseguiu a SENA, o prêmio máximo!!!';
            break;
    }

    if (highlightMessage) {
        resultMessage += `<div class="highlight">${highlightMessage}</div>`;
    }

    resultElement.innerHTML = resultMessage;

    // Mostra o botão de reiniciar e esconde o botão de jogar
    resetButton.style.display = 'inline-block';
    playButton.style.display = 'none';

    // Desabilita a seleção de números
    disableNumberSelection();
}

function resetGame() {
    // Limpa o resultado
    resultElement.innerHTML = '';

    // Limpa a seleção de números
    selectedNumbers.clear();
    document.querySelectorAll('.number').forEach(el => el.classList.remove('selected'));

    // Esconde o botão de reiniciar e mostra o botão de jogar
    resetButton.style.display = 'none';
    playButton.style.display = 'inline-block';

    // Habilita a seleção de números
    enableNumberSelection();
}

function disableNumberSelection() {
    document.querySelectorAll('.number').forEach(el => el.style.pointerEvents = 'none');
}

function enableNumberSelection() {
    document.querySelectorAll('.number').forEach(el => el.style.pointerEvents = 'auto');
}