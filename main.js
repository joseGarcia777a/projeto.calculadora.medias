const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji aprovado" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji reprovado" />';
const atividades=[];
const notas=[];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite valor da nota minima: "));

let linhas = '';

form.addEventListener('submit', function(e){
    e.preventDefault();

    adicionaLinha();
    atalizaTabela();
    atualizaMedia();
});

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} ja foi inserida`);
    }else{
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        // isso += e o mesmo que linha = linha + `<td>`  e concatenacao.
        // >=7 ? so deixa o valor ser mostrado se for maior ou igual a 7. 
        // os >=7?  : fazem parte do operador ternario.
        let linha = `<tr>`;
        linha +=`<td> ${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;

        linhas +=linha;
    };


    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
};

function atalizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
};

function atualizaMedia(){
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    let somaNotas = 0;

    for (let i =0; i < notas.length; i++){
        somaNotas += notas[i];
    }

    return somaNotas / notas.length;
}