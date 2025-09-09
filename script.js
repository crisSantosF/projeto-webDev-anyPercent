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
    else
    {
        const escopoAtual = document.getElementById('escopoAtual');

        const novoEscopo = `<div id="escopoAtual">
                                <select id="escolha_mes" class="mb" name="mes_de_escolha">
                                    <option class="titulo">Janeiro</option>
                                    <option class="titulo">Fevereiro</option>
                                    <option class="titulo">Março</option>
                                    <option class="titulo">Abril</option>
                                    <option class="titulo">Maio</option>
                                    <option class="titulo">Junho</option>
                                    <option class="titulo">Julho</option>
                                    <option class="titulo">Agosto</option>
                                    <option class="titulo">Setembro</option>
                                    <option class="titulo">Outubro</option>
                                    <option class="titulo">Novembro</option>
                                    <option class="titulo">Dezembro</option>
                                </select>
                            </div>`
                            

        escopoAtual.outerHTML = novoEscopo;

        const seletorMes = document.getElementById('escolha_mes');
        seletorMes.selectedIndex = mes_primeiroDia - 1;
    }
}

botao_trocaEscopo.addEventListener('click', trocaEscopo);



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

    const conteiner_botao_deletarTarefa = document.createElement('div');

    const botao_deletarTarefa = document.createElement('span');
    botao_deletarTarefa.classList.add('material-symbols-outlined', 'botao_deletaTarefa');
    botao_deletarTarefa.textContent = 'delete';

    conteiner_informacaoTarefa.appendChild(checagemTarefa);
    conteiner_informacaoTarefa.appendChild(paragrafoTarefa);

    conteiner_tarefaEspecifica.appendChild(conteiner_informacaoTarefa);
    
    conteiner_botao_deletarTarefa.appendChild(botao_deletarTarefa);
    conteiner_tarefaEspecifica.appendChild(conteiner_botao_deletarTarefa);

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
    const icone_clicado = event.target;
    const informacaoTarefa = icone_clicado.parentElement;

    if(event.target.classList.contains('checkbox'))
    {
        const textoTarefa = informacaoTarefa.querySelector('p');

        //essa estrutura é meio nojenta, mas serve pra atribuir um booleano caso, nesse exemplo,
        //o texto do elemento icone_clicado for igual a 'radio_button_checked'
        const foiChecada = icone_clicado.textContent === 'radio_button_checked';

        if(foiChecada)
        {
            icone_clicado.textContent = 'radio_button_unchecked';
            icone_clicado.classList.remove('checked');
            textoTarefa.classList.remove('tarefaConcluida');
        }
        else
        {
            icone_clicado.textContent = 'radio_button_checked';
            icone_clicado.classList.add('checked');
            textoTarefa.classList.add('tarefaConcluida');
        }
    }

    else if(icone_clicado.classList.contains('botao_deletaTarefa'))
    {
        const confirma_deleta = confirm('tem certeza?');

        if(confirma_deleta)
        {
            //tarefa para remover vai procurar o elemento mais próximo que tiver a STRING  oassada como parametro
            //portanto não basta só passar o nome da classe ou id, tem que botar o indicador de acordo ('.' no caso de classe
            // e '#' no caso de id) pois ele é um seletor de CSS
            const tarefa_para_remover = icone_clicado.closest('.tarefaEspecifica');

            if(tarefa_para_remover)
            {
                tarefa_para_remover.remove();
            }
            
        }
    }

}


conteiner_tarefas.addEventListener('click', tarefaChecada);