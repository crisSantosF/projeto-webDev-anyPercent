////////////////////***PRIMEIRA TELA*** ////////////////////////
/*
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

function espera_transicaoTelas()
{    
    segunda_tela.classList.remove('esconde-tela');
    primeira_tela.classList.add('esconde-tela');

    clearTimeout(trava_rotacaoPalavras);
    palavra_rotatoria.removeEventListener('animationend', gerente_trocaPalavra_ou_rotacaoPalavra);
}

function botaoTransicao_clicado()
{
    primeira_tela.classList.add('animacao-esconde-tela');

    primeira_tela.addEventListener('animationend', espera_transicaoTelas())
}


botao_transicao.addEventListener('click', botaoTransicao_clicado);

primeira_tela.removeEventListener('animationend', espera_transicaoTelas);
botao_transicao.removeEventListener('clicked', botaoTransicao_clicado);

*/

////////////////////***TELA TAREFAS*** ////////////////////////


//adição de tarefas
const botao_adicionaTarefa = document.getElementById('botao_adicionaTarefa');
const conteiner_tarefas = document.getElementById('tarefas');

function cria_novaTarefa(textoTarefa)
{
    const conteiner_tarefaEspecifica = document.createElement('div');
    conteiner_tarefaEspecifica.classList.add('tarefaEspecifica');

    const conteiner_informacaoTarefa = document.createElement('div');
    conteiner_informacaoTarefa.classList.add('informacaoTarefa');

    const checagemTarefa = document.createElement('span');
    checagemTarefa.classList.add('material-symbols-outlined', 'checkbox');
    checagemTarefa.textContent = 'radio_button_unchecked';

    const paragrafoTarefa = document.createElement('p');
    paragrafoTarefa.textContent = textoTarefa;

    conteiner_informacaoTarefa.appendChild(checagemTarefa);
    conteiner_informacaoTarefa.appendChild(paragrafoTarefa);

    conteiner_tarefaEspecifica.appendChild(conteiner_informacaoTarefa);

    conteiner_tarefas.appendChild(conteiner_tarefaEspecifica);
}

function botao_novaTarefa_clicado()
{
    const textoTarefa = prompt('o que vamos fazer?');

    if(textoTarefa && textoTarefa.trim() !== '')
        cria_novaTarefa(textoTarefa);
}

botao_adicionaTarefa.addEventListener('click', botao_novaTarefa_clicado);

//checagem de tarefas

function tarefaChecada(event)
{
    if(event.target.classList.contains('checkbox'))
    {
        const checkBox_clicado = event.target;
        const informacaoTarefa = checkBox_clicado.parentElement;
        const textoTarefa = informacaoTarefa.querySelector('p');

        //essa estrutura é meio nojenta, mas serve pra atribuir um booleano caso, nesse exemplo,
        //o texto do elemento checkbox_clicado for igual a 'radio_button_checked'
        const foiChecada = checkBox_clicado.textContent === 'radio_button_checked';

        if(foiChecada)
        {
            checkBox_clicado.textContent = 'radio_button_unchecked';
            checkBox_clicado.classList.remove('checked');
            textoTarefa.classList.remove('tarefaConcluida');
        }
        else
        {
            checkBox_clicado.textContent = 'radio_button_checked';
            checkBox_clicado.classList.add('checked');
            textoTarefa.classList.add('tarefaConcluida');
        }
    }
}


conteiner_tarefas.addEventListener('click', tarefaChecada);


//troca de escopo

const botao_trocaEscopo = document.getElementById('trocaEscopo');

function trocaEscopo(event)
{
    const dataAtual = new Date();
    const primeiroDia_semana = new Date(dataAtual);

    //getDate é o dia do mes (1-31) e getDay é o dia da semana (0-6)
    //portanto getDate - getDay = primeiro dia da semana e o + 1 é pois, por padrão,
    //o prieiro dia do objeto date é domingo

    //setDate lida com as possiveis complicações de, por exemplo , primeiroDia + 6 for maior
    // que o ultimo dia do mes do primeiro dia (28 de fevereiro + 6, por exemplo)
    // mas ele retorna um giga inteiro que conts milissegundos e ele altera os objetos aos quais
    //ele é aplicadp, então deve se criar cópias para não dar confusão
    primeiroDia_semana.setDate(dataAtual.getDate() - dataAtual.getDay() + 1);

    //nesse caso eu criei uma cópia do primeiro new Date() e depois criei uma outra cópia,
    //mas do primeiroDia para lidar com o setDate de acordo, filtrando as coplicações de 
    // ultimoDia > 31, por exemplo.
    const ultimoDia_semana = new Date(primeiroDia_semana);
    ultimoDia_semana.setDate(primeiroDia_semana.getDate() + 6);

    const primeiroDia_filtrado = primeiroDia_semana.getDate();
    const ultimoDia_filtrado = ultimoDia_semana.getDate();

    // getMonth() + 1 pois getMonth() é 0indexed, então setembro, 9, acaba sendo 8
    const mes_primeiroDia = primeiroDia_semana.getMonth() + 1;
    const mes_ultimoDia = ultimoDia_semana.getMonth() + 1;

    const escopo_de_escolha = event.target;

    if(escopo_de_escolha.textContent.trim().toLowerCase() === 'semanal')
    {
        const escopoAtual = document.getElementById('escopoAtual');

        const novoEscopo = document.createElement('div');
        novoEscopo.id = 'escopoAtual';
        novoEscopo.textContent = `${primeiroDia_filtrado}/${mes_primeiroDia} - ${ultimoDia_filtrado}/${mes_ultimoDia}`;
    
        escopoAtual.replaceWith(novoEscopo);
    }
    else if(escopo_de_escolha.textContent.trim().toLowerCase() === 'diário')
    {
        const escopoAtual = document.getElementById('escopoAtual');

        const novoEscopo = document.createElement('div');
        novoEscopo.id = 'escopoAtual';
        novoEscopo.textContent = `${primeiroDia_filtrado}/${mes_primeiroDia}`;
     
        escopoAtual.replaceWith(novoEscopo);
    }
}

botao_trocaEscopo.addEventListener('click', trocaEscopo);