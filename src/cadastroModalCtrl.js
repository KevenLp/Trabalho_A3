
function ativarEdicao() {
    const tabela = document.getElementById("tabela-uc");
    if (!tabela) {
        console.error("Tabela não encontrada!");
        return;
    }

    const linhas = tabela.querySelectorAll("tbody tr");
    console.log("Linhas selecionadas para edição:", linhas.length);

    linhas.forEach((linha, index) => {

        // Evita reentrar em linhas já editadas
        if (linha.querySelector("input")) return;

        // Adiciona botão excluir se não existir
        const celulas = linha.querySelectorAll("td");
        const ultimaCelula = celulas[celulas.length - 1];
        const botaoExcluirExiste = ultimaCelula && ultimaCelula.querySelector("button.btn-danger");

        if (!botaoExcluirExiste) {
            const celulaExcluir = linha.insertCell();
            celulaExcluir.innerHTML = `<button class="btn btn-danger btn-sm" onclick="excluirLinha(this)">Excluir</button>`;
        }

        // Atualiza as células após inserir o botão excluir
        const todasCelulas = linha.querySelectorAll("td");

        for (let i = 0; i < todasCelulas.length - 1; i++) {        
            const texto = todasCelulas[i].textContent.trim();
            todasCelulas[i].innerHTML = `<input type="text" class="form-control" value="${texto}">`;
        }
    });

    document.getElementById('criar').disabled = true;
}



function inserirLinha() {
    const tabela = document.getElementById("tabela-uc").querySelector("tbody");
    const novaLinha = tabela.insertRow();

    for (let i = 0; i < 3; i++) {
        const novaCelula = novaLinha.insertCell();
        novaCelula.innerHTML = `<input type="text" class="form-control" placeholder="Digite...">`;
    }
    // Última célula com botão de excluir
    const celulaExcluir = novaLinha.insertCell();
    celulaExcluir.innerHTML = `
    <button class="btn btn-danger btn-sm" onclick="excluirLinha(this)">Excluir</button>
  `;
    // Desabilita o botão de editar enquanto insere
    document.getElementById('editar').disabled = true;

}

function salvarTabela() {
    const tabela = document.getElementById("tabela-uc").querySelector("tbody");
    const linhas = tabela.querySelectorAll("tr");

    const dados = [];

    linhas.forEach((linha) => {
        const celulas = linha.querySelectorAll("td");
        const valores = [];

        // Pega os valores dos primeiros 3 campos (Curso, Carga, Conclusão)
        for (let i = 0; i < 3; i++) {
            const input = celulas[i].querySelector("input");
            const valor = input ? input.value.trim() : celulas[i].textContent.trim();
            valores.push(valor);
            celulas[i].innerText = valor; // transforma input em texto
        }

        // Se tiver a 4ª célula (botão de exclusão), remova
        if (celulas.length > 3) {
            linha.deleteCell(3);
        }

        dados.push({
            curso: valores[0],
            carga: valores[1],
            conclusao: valores[2],
        });
    });

    // Reativa os botões
    document.getElementById('editar').disabled = false;
    document.getElementById('criar').disabled = false;
    document.getElementById('salvar').disabled = false;


    console.log("Dados salvos:", dados);
    alert("Dados salvos com sucesso!");
}



function excluirLinha(botao) {
    const linha = botao.closest("tr");
    const tabela = document.getElementById("tabela-uc").querySelector("tbody");
    const linhas = Array.from(tabela.rows);

    const index = linhas.indexOf(linha);

    if (index === 1) {
        alert("Você não pode excluir a primeira linha da tabela.");
        return;
    }

    if (confirm("Tem certeza que deseja excluir esta linha?")) {
        linha.remove();
    }
}

// Ativa drag and drop com SortableJS
document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#tabela-uc tbody");

    if (tbody && typeof Sortable !== "undefined") {

        new Sortable(tbody, {
            animation: 150,
            ghostClass: "linha-sombra",
            fallbackOnBody: true,
            swapThreshold: 0.65,
        });
    } else {
        console.warn("SortableJS não encontrado ou tbody ausente.");
    }
});

