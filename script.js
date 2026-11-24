
const saldo = document.querySelector('#saldo')
const saldovalor = document.querySelector('#saldo h1')

const entradas = document.querySelector('#entradas')
const entradasvalor = document.querySelector('#entradas h1')

const saidas = document.querySelector('#saidas')
const saldosaidas = document.querySelector('#saidas h1')

const modaltransacoes = document.querySelector('#modaltransacoes')
const modaladicionar = document.querySelector('#modaladicionar')

const valortransacao = document.querySelector('#valortransacao')
const valoradicionar = document.querySelector('#valoradicionar')
const categoriastra = document.querySelector('#categoriastransacoes')
const categoriadd = document.querySelector('#categoriasadicionar')

const listatransacoes = document.querySelector('#listatransacoes')
const listadespesas = document.querySelector('#listadespesas')

const valorentradas = []
const valorsaidas = []
const todastransacoes = []


function openmodaladicionar(){
    modaladicionar.showModal()
}


// FUNÇÃO PARA ADICIONAR ENTRADAS
function adicionar(){

    const adicionar = {
        valor: Number(valoradicionar.value),
        categoria: categoriadd.value,
        data: new Date(),
        tipo: 'entrada'
    }

    let num = Number(valoradicionar.value)

    if(!Number.isFinite(num) || num <= 0){
        window.alert("Por favor, digite um valor válido!")
        return
    }else{
        valorentradas.push(adicionar)
        todastransacoes.push(adicionar)
    }

    entradasvalor.innerText = formatarMoeda(calcularEntradas())

    saldovalor.innerText = formatarMoeda(calcularSaldo())

    mostrarTransacoes()

    modaladicionar.close()
}


// FUNÇÃO PARA ABRIR O MODAL
function openmodaltransacoes(){
    modaltransacoes.showModal()
}


// FUNÇÃO PARA REGISTRAR SAÍDAS
function transacoes(){

    const despesa = {
        valor: Number(valortransacao.value),
        categoria: categoriastra.value,
        data: new Date(),
        tipo: 'saida'
    }

    let num = Number(valortransacao.value)

    if(!Number.isFinite(num) || num <= 0){
        window.alert("Digite um valor válido")
        return
    }else{
        valorsaidas.push(despesa)
        todastransacoes.push(despesa)
    }

    saldosaidas.innerText = formatarMoeda(calcularSaidas())

    saldovalor.innerText = formatarMoeda(calcularSaldo())

    mostrarTransacoes()
    mostrarDespesas()

    modaltransacoes.close()
}


// FUNÇÃO PARA MOSTRAR AS TRANSAÇÕES
function mostrarTransacoes(){

    listatransacoes.innerHTML = ''

    for(let i = todastransacoes.length - 1; i >= 0; i--){

        const transacao = todastransacoes[i]

        const linha = document.createElement('tr')

        const categoria = document.createElement('td')
        const data = document.createElement('td')
        const valor = document.createElement('td')

        categoria.innerText = transacao.categoria

        data.innerText = transacao.data.toLocaleDateString('pt-BR')

        valor.innerText = formatarMoeda(transacao.valor)

        if(transacao.tipo === 'entrada'){
            valor.style.color = 'green'
            valor.innerText = '+ ' + valor.innerText
        }else{
            valor.style.color = 'red'
            valor.innerText = '- ' + valor.innerText
        }

        linha.appendChild(categoria)
        linha.appendChild(data)
        linha.appendChild(valor)

        listatransacoes.appendChild(linha)
    }
}

function mostrarDespesas() {
    listadespesas.innerHTML = ''

    let despesas = {}

    for (let i = 0; i < valorsaidas.length; i++) {
        let categoria = valorsaidas[i].categoria
        let valor = valorsaidas[i].valor

        if (despesas[categoria]) {
            despesas[categoria] += valor
        } else {
            despesas[categoria] = valor
        }
    }

    for (let categoria in despesas) {
        let linha = document.createElement('tr')

        let colunaCategoria = document.createElement('td')
        let colunaTotal = document.createElement('td')

        colunaCategoria.innerText = categoria
        colunaTotal.innerText = formatarMoeda(despesas[categoria])

        linha.appendChild(colunaCategoria)
        linha.appendChild(colunaTotal)

        listadespesas.appendChild(linha)
    }
}

// FUNÇÃO PARA CALCULAR ENTRADAS
function calcularEntradas(){

    let totalentradas = 0

    for(let i = 0; i < valorentradas.length; i++){
        totalentradas += valorentradas[i].valor
    }

    return totalentradas
}


// FUNÇÃO PARA CALCULAR SAÍDAS
function calcularSaidas(){

    let totalsaidas = 0

    for(let i = 0; i < valorsaidas.length; i++){
        totalsaidas += valorsaidas[i].valor
    }

    return totalsaidas
}


// FUNÇÃO PARA CALCULAR SALDO
function calcularSaldo(){

    return calcularEntradas() - calcularSaidas()
}


// FUNÇÃO PARA FORMATAR MOEDA
function formatarMoeda(valor){

    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
