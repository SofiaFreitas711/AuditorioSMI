// let itens = [{name: "Café", value:0.70},{name: "Descafeinado", value: 0.80}, {name: "Pingo", value: 0.90},
//     {name: "1/2 de Leite", value:1.20},{name: "Chá", value: 0.80}, {name: "Chá de Limão", value: 0.80},
//     {name: "Água s/gás 0.5L", value:0.70}, {name: "Água s/gás 1.5L", value:1.50}, {name: "Água c/gás", value:1.00},
//     {name:"Bebida de Lata", value:1.00}, {name: "Cerveja mini", value:1.00},{name:"Leite c/chocolate", value:1.00},
//     {name:"Whisky 1/2", value:2.50}, {name:"Whisky 1", value:4.00},{name:"Porto",value:3.00},{name:"Chicletes", value:0.10},
//     {name:"Chupas Chupas", value: 0.40},{name: "Tosta Mista", value:1.50}, {name: "Croissant", value: 1.50}, {name: "Pasteis Variados", value: 1.00},
//     {name: "Torrada", value: 1.20}, {name:"Miniaturas", value:0.50},{name: "Pasteis de Carne", value: 1.50},{name: "Batatas Fritas", value: 1.00}]
let itens
let req = new XMLHttpRequest();
let i

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
    }
  };

  async function getData(){
    let response = await fetch("https://api.jsonbin.io/v3/b/67abc5dead19ca34f8ffced8",{
        headers:{ "X-Master-Key":"$2a$10$r35EQ33BznIOroKFpWsCRej8Kov97hjUcBuscwwuYkeGJNaOigiiC"}
    })
    let data = await response.json()
    itens = data.record.itens
    console.log(itens);

    let itensLen = itens.length
    for(let i=0; i<itensLen; i++){
        document.querySelector("#definicoesTable").innerHTML += `<tr><td>${itens[i].name}</td>
                                                            <td>${itens[i].value}</td>
                                                            <td><button id="remover" onclick="remover(${i})">Remover</button><button onclick="editar(${i})">Editar</button></td></tr>`
    }
    
}

getData()

function mudarBD(item){
    let novo = item
    console.log(novo);
    
    req.open("PUT", "https://api.jsonbin.io/v3/b/67abc5dead19ca34f8ffced8", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2a$10$r35EQ33BznIOroKFpWsCRej8Kov97hjUcBuscwwuYkeGJNaOigiiC");
    req.send(`{"itens": ${novo}}`);
    setTimeout(()=>{
        location.reload()
    }, 1500)
    
    
    
}

function remover(item){
    // alert(itens[item].name)
    for(let i = 0;i < itens.length; i++){
        if(itens[i].name == itens[item].name){
            alert("aqui " + itens[item].name)
            itens.splice(i,1)
            console.log(itens);
            mudarBD(JSON.stringify(itens))

        }
    }
}

let modalEditar = document.querySelector("#modalEditar")
function editar(item){
    modalEditar.style.display = "block"
    i = item
    // modalEditar.style.display = "block"
    // for(let i=0; i<itens.length;i++){
    //     if(itens[i].name == itens[item].name){
    //         let novoPreco = +prompt("Novo preço:")
            
    //         itens.splice(i,0,{"name": itens[item].name, "value": +novoPreco.toFixed(2)})
    //         itens.splice(i+1,1)
    //         console.log(itens);
            
    //         mudarBD(JSON.stringify(itens))
    //         break
    //     }
    // }
}

function confirmar(){
    let item = i
    
    for(let i=0; i<itens.length;i++){
        if(itens[i].name == itens[item].name){
            // let novoPreco = +prompt("Novo preço:")
            let novoPreco = document.querySelector("#novoPreco").value
            itens.splice(i,0,{"name": itens[item].name, "value": +novoPreco})
            itens.splice(i+1,1)
            console.log(itens);
            
            mudarBD(JSON.stringify(itens))
            console.log(itens);
            
            
            break
        }
    }
}
// let itensLen = itens.length


function add(){
    let name = document.querySelector("#name").value
    let price = document.querySelector("#price").value

    // console.log(name, price);
    let newItem = {"name": name, "value": +price}
    // console.log(newItem);
    itens.push(newItem)
    console.log(itens);
    
    // console.log(itens);
    mudarBD(JSON.stringify(itens))
    
    
}

// let modalEditar = document.querySelector("#modalEditar")
// function editar(item){
//     modalEditar.style.display = "block"
//     i = item
//     // modalEditar.style.display = "block"
//     // for(let i=0; i<itens.length;i++){
//     //     if(itens[i].name == itens[item].name){
//     //         let novoPreco = +prompt("Novo preço:")
            
//     //         itens.splice(i,0,{"name": itens[item].name, "value": +novoPreco.toFixed(2)})
//     //         itens.splice(i+1,1)
//     //         console.log(itens);
            
//     //         mudarBD(JSON.stringify(itens))
//     //         break
//     //     }
//     // }
// }

function fecharModalEditar(){
    modalEditar.style.display = "none"
}

// function remover(item){
//     // alert(itens[item].name)
//     for(let i = 0;i < itens.length; i++){
//         if(itens[i].name == itens[item].name){
//             alert("aqui " + itens[item].name)
//             itens.splice(i,1)
//             console.log(itens);
//             // mudarBD(JSON.stringify(itens))

//         }
//     }
// }
