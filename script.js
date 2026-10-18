
const saldo = document.querySelector('#saldo')
const saldovalor = document.querySelector('#saldo h1')

const entradas = document.querySelector('#entradas')
const entradasvalor = document.querySelector('#entradas h1')
// Seleciona o h1 do card Entradas, onde o total será exibido.

const saidas = document.querySelector('#saidas')
const saldosaidas = document.querySelector('#saidas h1')
// Seleciona o h1 do card Saídas, onde o total gasto será exibido.

const modal = document.querySelector("dialog")
const valortransacao = document.querySelector('#valortransacao')
const categorias = document.querySelector('#categorias')
// Seleciona os elementos do modal de transações.
// A variável categorias ainda pode ser utilizada para registrar a categoria da despesa.


// Arrays que armazenam os valores registrados pelo usuário.
const valorentradas = []
const valorsaidas = []


// FUNÇÃO PARA ADICIONAR VALORES AO CARD ENTRADAS
function adicionar(){
    // Solicita ao usuário o valor que deseja guardar.
    let num = Number(window.prompt('Digite o valor que deseja guardar'))

    // Verifica se o valor é inválido, zero ou negativo.
    if(!Number.isFinite(num) || num == 0 || num < 0){
        window.alert("Por favor, digite um valor válido!")

        // Encerra a função se o valor for inválido.
        // Assim, o código abaixo não será executado.
        return
    }else{
        // Adiciona o valor informado ao array de entradas.
        valorentradas.push(num)
    }

    // Chama a função que soma todas as entradas.
    // O resultado retornado é formatado como moeda brasileira.
    // innerText exibe o resultado dentro do h1 do card.
    entradasvalor.innerText = formatarMoeda(calcularEntradas())

    // Recalcula e atualiza o saldo depois de adicionar uma entrada.
    // O saldo é calculado usando o total de entradas menos o de saídas.
    saldovalor.innerText = formatarMoeda(calcularSaldo())
}


// FUNÇÃO PARA ABRIR O MODAL
function openmodal(){
    // showModal() abre a janela de diálogo.
    modal.showModal()
}


// FUNÇÃO PARA REGISTRAR UMA SAÍDA
function transacoes(){
    // Pega o valor digitado no campo e converte para número.
    let num = Number(valortransacao.value)

    // Impede o registro de valores inválidos, zero ou negativos.
    if(!Number.isFinite(num) || num == 0 || num < 0){
        window.alert("Digite um valor válido")

        // Encerra a função se o valor não for válido.
        return
    }else{
        // Adiciona a despesa ao array de saídas.
        valorsaidas.push(num)
    }

    // Calcula o total de todas as saídas registradas
    // e atualiza o valor exibido no card Saídas.
    saldosaidas.innerText = formatarMoeda(calcularSaidas())

    // Recalcula o saldo depois de registrar uma despesa.
    saldovalor.innerText = formatarMoeda(calcularSaldo())

    // Fecha o modal depois de registrar a saída.
    modal.close()
}


// FUNÇÃO PARA CALCULAR O TOTAL DE ENTRADAS
function calcularEntradas(){
    // Começa o total em zero.
    let totalentradas = 0

    // Percorre todas as posições do array de entradas.
    for(let i = 0; i < valorentradas.length; i++){

        // Soma o valor da posição atual ao total acumulado.
        totalentradas += valorentradas[i]

        // i representa a posição atual do array.
        // valorentradas[i] acessa o valor guardado nessa posição.
    }

    // Devolve a soma para que outras partes do código possam usá-la.
    return totalentradas
}


// FUNÇÃO PARA CALCULAR O TOTAL DE SAÍDAS
function calcularSaidas(){
    // Começa o total de saídas em zero.
    let totalsaidas = 0

    // Percorre todas as posições do array de saídas.
    for(let i = 0; i < valorsaidas.length; i++){

        // Soma cada despesa ao total acumulado.
        totalsaidas += valorsaidas[i]
    }

    // Devolve a soma das despesas para outras partes do código.
    return totalsaidas
}


// FUNÇÃO PARA CALCULAR O SALDO ATUAL
function calcularSaldo(){

    // Chama as funções que calculam as entradas e as saídas.
    // Subtrai o total gasto do total recebido/guardado.
    // O return devolve o resultado dessa conta.
    return calcularEntradas() - calcularSaidas()
}

function formatarMoeda(valor){
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}