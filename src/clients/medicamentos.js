document.addEventListener('DOMContentLoaded', function () {
    // função que carrega a lista de medicamentos ao entrar na página
    loadMedicamentosList();

    // Adiciona um listener do formulário para adicionar medicamentos
    document.getElementById('formAdicionarMedicamento').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarMedicamento();
    });
});

function adicionarMedicamento() {
    const id = document.getElementById('idMedicamento').value;
    const nome = document.getElementById('nomeMedicamento').value;
    const fabricante = document.getElementById('fabricanteMedicamento').value;
    const preco = document.getElementById('precoMedicamento').value;
    const quantidade = document.getElementById('quantidadeMedicamento').value;

    fetch('http://localhost:3000/apiFarmacia/medicamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            fabricante: fabricante,
            preco: preco,
            quantidade: quantidade
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadMedicamentosList();
        })
        .catch(error => console.error("Erro:", error));
}

function loadMedicamentosList() {
    fetch('http://localhost:3000/apiFarmacia/medicamentos')
        .then(response => response.json())
        .then(data => displayMedicamentosList(data))
        .catch(error => console.error("Erro:", error));
}

function displayMedicamentosList(data) {
    const listaMedicamentos = document.getElementById('listaMedicamentos');
    listaMedicamentos.innerHTML = '';

    data.forEach(medicamento => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${medicamento.id} - Nome: ${medicamento.nome} - Fabricante: ${medicamento.fabricante} - Preço: ${medicamento.preco} - Quantidade: ${medicamento.quantidade}`;
        listaMedicamentos.appendChild(listItem);
    });
}
