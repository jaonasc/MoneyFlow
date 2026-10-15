const saldo = document.querySelector('#saldo')
const entradas = document.querySelector('#entradas')
const entradasvalor = document.querySelector('#entradas h1')//Variavel utilizada para adicionar valor no h1 do id entradas
const saidas = document.querySelector('#saidas')

const valorentradas = []
//FUNÇÃO DE ADICIONAR VALORES AO CARD SALDO E ADICIONADO 
function adicionar(){
    let num = Number(window.prompt('Digite o valor que deseja guardar'))
    if(!Number.isFinite(num) || num == 0 || num < 0){
        window.alert("Por favor, digite um valor válido!")
        return
    }else{
        valorentradas.push(num)
    }
    let sum = 0
    for(let i = 0; i < valorentradas.length; i++){
        sum += valorentradas[i]
    }

    entradasvalor.innerText = sum.toLocaleString('pt-BR',{
        style: 'currency',
        currency:'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
