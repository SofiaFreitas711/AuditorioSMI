let itens
let i

const supabaseUrl = 'https://lqrxowbeevibjdrukbhw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxcnhvd2JlZXZpYmpkcnVrYmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDM5NTIsImV4cCI6MjA1NTU3OTk1Mn0.UAnho9Ty6f3We0hXdAv_mPtQ_NLjmPU0fgcSWwSuguI'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

//dados para tabela
async function getData(){
    let { data, error } = await supabase
        .from('AuditorioSMI')
        .select('*')
        .order('id', { ascending: true });

    itens = data
    console.log(itens);
    let itensLen = itens.length
    for(let i=0; i<itensLen; i++){
             document.querySelector("#definicoesTable").innerHTML += `<tr><td>${itens[i].name}</td>
                                                                 <td>${itens[i].value}</td>
                                                                 <td><button id="remover" onclick="remover(${i})">Remover</button><button onclick="editar(${i})">Editar</button></td></tr>`
    }
}

getData()

// dados sobre o fecho
async function getFecho(){
    let { data, error } = await supabase
        .from('Fecho')
        .select('*')
        .order('id', { ascending: true });
    
    console.log(data.length);
    
    let len = data.length - 1
    let dia = data[len].dia
    let value = data[len].value
    document.querySelector("#fecho").innerHTML = `O último fecho foi no dia ${dia} e deu um total de ${value}€`
}

getFecho()

//eliminar produto
async function remover(a){
    let name = itens[a].name

    let {error} = await supabase
        .from('AuditorioSMI')
        .delete()
        .eq('name', `${name}`)

    setTimeout(()=>{
        location.reload()
    }, 1500)
}

let modalEditar = document.querySelector("#modalEditar")
function editar(item){
    modalEditar.style.display = "block"
    i = item
}

//mudar preço de produto
async function mudarPreco(){
    let item = itens[i]
    // let newValue = +prompt("Novo valor:")
    let newValue = +document.querySelector("#novoPreco").value
   

    let {error} = await supabase
        .from('AuditorioSMI')
        .update({name: `${item.name}`, value: `${newValue}`})
        .eq("id", item.id)

    setTimeout(()=>{
        location.reload()
    }, 500)
}

//adicionar novo produto
async function adicionarProduto(){
    let name = document.querySelector("#name").value
    let price = document.querySelector("#price").value

    let {data,error} = await supabase
        .from("AuditorioSMI")
        .insert({name: `${name}`, value: `${price}`})
        .select()

    setTimeout(()=>{
        location.reload()
    }, 500)
      
}

function fecharModalEditar(){
    modalEditar.style.display = "none"
}