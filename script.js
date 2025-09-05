const palavra_rotatoria = document.getElementById('cycling_word');

const palavras_para_rotacionar = ['mensal', 'semanal', 'diário'];

let index_atual = 0;

/*o loop será feito de forma 'recursiva', chamando a função sempre após tempo_permanecimento vezes*/
function rotacionar_palavras()
{
    setInterval( ()=>
    {
        // adiciona a animação de desaparcimento o elemento html
        palavra_rotatoria.classList.add('rotacao-desaparece');

        palavra_rotatoria.addEventListener('animationend', () =>
        {
            index_atual = (index_atual + 1) % palavras_para_rotacionar.length;

            /*muda o texto do elemento html */
            palavra_rotatoria.textContent = palavras_para_rotacionar[index_atual];

            // retira a animação de desaparcimento o elemento html
            palavra_rotatoria.classList.remove('rotacao-desaparece');
        }, {once:true})
    
    },2000)

}


rotacionar_palavras();
























