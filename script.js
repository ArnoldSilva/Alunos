const alunos = [];
const mediasIndividuais = [];
const limiteAlunos = 5;

function calcularMedia() {
    const nome = document.querySelector('.info input:nth-child(1)').value;
    const turma = document.querySelector('.info input:nth-child(2)').value;

    if (alunos.length >= limiteAlunos) {
        alert('Limite de alunos atingido. Não é possível adicionar mais alunos.');
        return;
    }


    const notaInputs = document.querySelectorAll('.notas input[type="number"]');
    const notas = Array.from(notaInputs).map(input => parseFloat(input.value));




    const media = calcularMediaTotal(notas);
    let situacao = media >= 70 ? "Aprovado" : (media >= 50 ? "Recuperação" : "Reprovado");

    const resultTable = document.querySelector('.table-container table');
    if (resultTable.rows.length) {
        const newRow = resultTable.insertRow();
        const nomeTurmaCell = newRow.insertCell();
        nomeTurmaCell.textContent = `${nome} Turma: ${turma}`;
        notas.forEach(nota => newRow.insertCell().textContent = nota);
        newRow.insertCell().textContent = formatarMedia(media);
        const situacaoCell = newRow.insertCell();
        situacaoCell.textContent = situacao;
        definirEstiloSituacao(situacaoCell, media);
        
        // Armazene o nome e a média do aluno no array 'alunos'
        alunos.push({ nome, media });
        mediasIndividuais.push(media); // Adicione a média individual
    }

    const mediaGeralSpan = document.getElementById('media-geral');

    // Calcula a média geral a partir das médias individuais de todos os alunos
    const mediaGeral = calcularMediaGeral();

    mediaGeralSpan.textContent = formatarMedia(mediaGeral);

    mostrarConteudo('content2');

    // Chame a função para exibir alunos abaixo da média após calcular a média
    exibirAlunosAbaixoDaMediaGeral();

    
}

function calcularMediaTotal(notas) {
    let total = 0;
    for (let i = 0; i < notas.length; i++) {
        total += notas[i];
    }
    return total / notas.length;
}

function formatarMedia(media) {
    return media.toFixed(2);
}

function definirEstiloSituacao(cell, media) {
    if (media >= 70) {
        cell.classList.add('linha-verde');
    } else if (media >= 50) {
        cell.classList.add('linha-amarela');
    } else {
        cell.classList.add('linha-vermelha');
    }
}

function calcularMediaGeral() {
    let total = 0;
    for (let i = 0; i < mediasIndividuais.length; i++) {
        total += mediasIndividuais[i];
    }
    return total / mediasIndividuais.length;
}

function mostrarConteudo(contentId) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        if (content.id === contentId) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
}

function exibirAlunosAbaixoDaMediaGeral() {
    const mediaGeralSpan = document.getElementById('media-geral');
    const mediaGeral = parseFloat(mediaGeralSpan.textContent);

    const alunosAbaixoDaMedia = alunos.filter(aluno => aluno.media < mediaGeral);
    const alunosAbaixoMediaSpan = document.getElementById('alunos-abaixo-media');

    if (alunosAbaixoDaMedia.length > 0) {
        let mensagem = 'ALUNOS ABAIXO DA MÉDIA GERAL DA TURMA:\n';
        for (let i = 0; i < alunosAbaixoDaMedia.length; i++) {
            mensagem += alunosAbaixoDaMedia[i].nome + '\n';
        }
        alunosAbaixoMediaSpan.textContent = mensagem;
    } else {
        alunosAbaixoMediaSpan.textContent = 'TODOS OS ALUNOS ESTÃO ACIMA OU IGUAL À MÉDIA GERAL DA TURMA.';
    }
}

function reentrarInformacoes() {
    const inputs = document.querySelectorAll('.notas input[type="number"]');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
    document.querySelector('.info input:nth-child(1)').value = '';
    document.querySelector('.info input:nth-child(2)').value = '';
    mostrarConteudo('content1');
}
