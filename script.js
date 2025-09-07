
//***PAGINA PRINCIPAL*** //

const palavra_rotatoria = document.getElementById('cycling_word');
const palavras_para_rotacionar = ['mensal', 'semanal', 'diário'];
const animacao_atual = ['aparece', 'desaparece'];
let index_palavras_para_rotacionar = 0;


function iniciar_rotacao() 
{
    palavra_rotatoria.classList.add('rotacao-desaparece');
}

function trocar_palavra_e_aparecer() 
{
  
    palavra_rotatoria.classList.remove('rotacao-desaparece');

    index_palavras_para_rotacionar = (index_palavras_para_rotacionar + 1) % palavras_para_rotacionar.length;
    palavra_rotatoria.textContent = palavras_para_rotacionar[index_palavras_para_rotacionar];

    palavra_rotatoria.classList.add('rotacao-aparece');
}

function agendar_proxRotacao() 
{
    // Remove a classe de animação atual
    palavra_rotatoria.classList.remove('rotacao-aparece');
    
    // Usa setTimeout para criar a pausa de 2 segundos antes de reiniciar o ciclo
    setTimeout(iniciar_rotacao, 2000);
}


palavra_rotatoria.addEventListener('animationend', (event) =>
{

    if (event.animationName === 'rotacao_desaparece') {
        trocar_palavra_e_aparecer();
    } else if (event.animationName === 'rotacao_aparece') {
        agendar_proxRotacao();
    }
});

// Inicia o primeiro ciclo de todos.
setTimeout(iniciar_rotacao, 2000);





