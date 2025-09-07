
////////////////////***PRIMEIRA TELA*** ////////////////////////

const palavra_rotatoria = document.getElementById('cycling_word');
const palavras_para_rotacionar = ['mensal', 'semanal', 'diário'];
const animacao_atual = ['aparece', 'desaparece'];

let index_palavras_para_rotacionar = 0;
let trava_rotacaoPalavras = 0;


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
    trava_rotacaoPalavras = setTimeout(iniciar_rotacao, 2000);
}

function gerente_trocaPalavra_ou_rotacaoPalavra(event)
{
    if (event.animationName === 'rotacao_desaparece') {
        trocar_palavra_e_aparecer();
    } else if (event.animationName === 'rotacao_aparece') {
        agendar_proxRotacao();
    }
};

palavra_rotatoria.addEventListener('animationend', gerente_trocaPalavra_ou_rotacaoPalavra);

// Inicia o primeiro ciclo de todos.
trava_rotacaoPalavras = setTimeout(iniciar_rotacao, 2000);


////////////////////***SEGUNDA TELA*** ////////////////////////


const botao_transicao = document.getElementById('botao-transicao-primeiraTela-segundaTela');
const primeira_tela = document.getElementById('conteiner-telaPrincipal');
const segunda_tela = document.getElementById('segunda-tela_aux');

botao_transicao.addEventListener('click', () =>
{
    primeira_tela.classList.add('animacao-esconde-tela');

    primeira_tela.addEventListener('animationend', () =>
    {
        segunda_tela.classList.remove('esconde-tela');
        primeira_tela.classList.add('esconde-tela');

        clearTimeout(trava_rotacaoPalavras);
        palavra_rotatoria.removeEventListener('animationend', gerente_trocaPalavra_ou_rotacaoPalavra);

    }, {once:true})
}, {once:true})



