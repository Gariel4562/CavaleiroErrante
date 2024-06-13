// Function to save the game state
function salvarJogo() {
    const gameState = {
        nivel: nivel,
        estadoAtual: estadoAtual,
        hpJogador: hpJogador,
        hpInimigo: hpInimigo,
        forcaJogador: forcaJogador,
        forcaInimigo: forcaInimigo,
        pontosAtaqueGanhos: pontosAtaqueGanhos,
        pontosVidaGanhos: pontosVidaGanhos,
        inimigosForcaIncremento: inimigosForcaIncremento
    };

    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Function to load the game state
function carregarJogo() {
    const savedState = localStorage.getItem('gameState');

    if (savedState) {
        const gameState = JSON.parse(savedState);
        nivel = gameState.nivel;
        estadoAtual = gameState.estadoAtual;
        hpJogador = gameState.hpJogador;
        hpInimigo = gameState.hpInimigo;
        forcaJogador = gameState.forcaJogador;
        forcaInimigo = gameState.forcaInimigo;
        pontosAtaqueGanhos = gameState.pontosAtaqueGanhos;
        pontosVidaGanhos = gameState.pontosVidaGanhos;
        inimigosForcaIncremento = gameState.inimigosForcaIncremento;

        // Show the correct page based on loaded state
        mostrarPagina(estadoAtual);
        atualizarStatus();
    } else {
        // Default behavior when no saved state is found
        mostrarPagina('inicio');
    }
}

// Add event listener to window to load saved game on page load
window.addEventListener('load', carregarJogo);

// Save game state automatically when transitioning between certain states
function transicaoEstado() {
    if (estadoAtual === 'batalha' || estadoAtual === 'casa') {
        salvarJogo();
    }
}

// Update the game to use `transicaoEstado` where needed (e.g., in `sairDeCasa`, `proximoAdversario`)

// Example:
function sairDeCasa() {
    estadoAtual = 'batalha';
    transicaoEstado(); // Automatically save when leaving home
    atualizarStatus();
    mostrarPagina('batalha');
}

// Ensure that other functions where game state changes occur also call `transicaoEstado` appropriately

// Function to reset game state (for debugging or other purposes)
function resetarJogo() {
    localStorage.removeItem('gameState');
    nivel = 1;
    estadoAtual = 'inicio';
    hpJogador = 100;
    hpInimigo = 0;
    forcaJogador = 0;
    forcaInimigo = 0;
    pontosAtaqueGanhos = 0;
    pontosVidaGanhos = 0;
    inimigosForcaIncremento = {};
    mostrarPagina('inicio');
    atualizarStatus();
}