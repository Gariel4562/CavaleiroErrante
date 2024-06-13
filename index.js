// save

let gameState = {
    playerPosition: { x: 5, y: 10 },
    score: 150,
    level: 2
};

function saveGame(state) {
    localStorage.setItem('savegame', JSON.stringify(state));
    console.log("Jogo salvo com sucesso!");
}

function loadGame() {
    let state = localStorage.getItem('savegame');
    if (state) {
        state = JSON.parse(state);
        console.log("Jogo carregado com sucesso!");
        return state;
    } else {
        console.log("Nenhum jogo salvo encontrado.");
        return null;
    }
}

function displayGameState(state) {
    document.getElementById('playerPosition').textContent = `Posição do jogador: (${state.playerPosition.x}, ${state.playerPosition.y})`;
    document.getElementById('score').textContent = `Pontos: ${state.score}`;
    document.getElementById('level').textContent = `Nível: ${state.level}`;
}

function updateGame() {
    // Função para atualizar o jogo, por exemplo, mover o jogador
    gameState.playerPosition.x += 1;  // Apenas um exemplo
    gameState.score += 10;            // Apenas um exemplo
    displayGameState(gameState);
}

window.onload = function() {
    let loadedGameState = loadGame();
    if (loadedGameState) {
        gameState = loadedGameState;
    }
    displayGameState(gameState);
};

window.onbeforeunload = function() {
    saveGame(gameState);
};

// Salva o jogo a cada 30 segundos
setInterval(function() {
    saveGame(gameState);
}, 30000);