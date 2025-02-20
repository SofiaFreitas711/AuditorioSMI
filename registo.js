let itens
let dia = 0
let sum = 0
let count = 0
let registo = []
let total = document.querySelector("#total")
let pago = false

const supabaseUrl = 'https://lqrxowbeevibjdrukbhw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxcnhvd2JlZXZpYmpkcnVrYmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDM5NTIsImV4cCI6MjA1NTU3OTk1Mn0.UAnho9Ty6f3We0hXdAv_mPtQ_NLjmPU0fgcSWwSuguI'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)


async function getData(){
    let { data, error } = await supabase
        .from('AuditorioSMI')
        .select('*')
        .order('id', { ascending: true });

    itens = data
    console.log(itens);
    let itensLen = itens.length
    for(let i = 0; i < itensLen; i++){
        document.querySelector("#botoes").innerHTML += `<button class="itens" onclick="adicionarConta(${i})"> ${itens[i].name} </button>`
    }
}

getData()

function adicionarConta(a) {
    // console.log(a);
    let item = itens[a]

    sum += item.value

    registo.push({ id: count, name: item.name, value: item.value })
    
    document.querySelector("#registo").innerHTML += `<p id="item${registo[count].id}">${registo[count].name} \n ${registo[count].value}€ <button onclick="limparItem(${registo[count].id})">-</button></p>`
    
    total.innerHTML = `Total:\n ${sum.toFixed(2)}€`
    count++
}

//tirar item da conta
function limparItem(id) {
    // console.log(id);

    let itemParaRemover = document.querySelector(`#item${id}`);
    if (itemParaRemover) {
        itemParaRemover.remove();
    }

    let item = registo.find(item => item.id === id)
    // console.log(item);
    
    if (item) {
        sum -= item.value
        // console.log("Retirado: " + item.value);                
        registo = registo.filter(item => item.id !== id)
    }

    count--

    total.innerHTML = `Total:\n ${sum.toFixed(2)}€`
    // console.log(registo);
}

//limpar a conta
function limpar(){
    sum = 0
    // console.log("Estou aqui"); 
    registo = []
    count = 0
    document.querySelector("#registo").innerHTML = ""
    total.innerHTML = `Total:\n 0.00€`
    // console.log(registo);
    
}

//soma da conta e troco
function resultado(){
    let valor = document.querySelector("#valor").value
    let p = document.querySelector("#pTroco")
    let troco = valor - sum
        
    if(troco < 0){
        p.innerHTML = `Faltam ${-troco.toFixed(2)}€ para o valor a pagar`
    }else {
        pago = true
        p.innerHTML = `Tem de dar ${troco.toFixed(2)}€`
        dia += sum
        sum = 0
        
    }
}

//passar valor do fecho para BD
async function fecho(){
    let date = new Date().toISOString().split('T')[0]
    let value = dia
    console.log(date);
    

    let {data,error} = await supabase
        .from("Fecho")
        .insert({dia: `${date}`, value: `${value}`})
        .select()

    setTimeout(()=>{
        location.reload()
    }, 500)
}

function fecharModalTroco(){
    let valor = document.querySelector("#valor").value
    let p = document.querySelector("#pTroco")
    modalTroco.style.display = "none"
    if(pago == true){

        registo = []
        count = 0
        document.querySelector("#registo").innerHTML = ""
        total.innerHTML = `Total:\n 0.00€`
        pago = false
    }
    setTimeout(()=>{
        valor.value = 0
        p.innerHTML = ""
    },2000)
}

let modalTroco = document.querySelector("#modalTroco")
function troco(){
    modalTroco.style.display = "block"
    
}

//se a pass estiver certa muda para as definições
function mudarPag(){
    let pass = +prompt("Insira a password")
    if(pass == "1866"){
        window.location.href = 'definicoes.html'
    }
}