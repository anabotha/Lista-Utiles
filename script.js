function deleteList(){ //borra la lista.
let list=document.getElementById("idLista");
list.innerHTML="";
localStorage.removeItem('list');
}

function addItem(text){ //agrega items a la lista y llama para crear el boton de eliminar item y lo agrega al mismo nodo.
    console.log(text);
    let item=document.createElement("li");
    item.innerHTML=text;
    console.log(item.textContent);
    let btn=createBtn();
    item.setAttribute('class', 'list-item')
    item.setAttribute('id', item.textContent)
    item.appendChild(btn);
    console.log(item.textContent+"flag");
    document.getElementById("idLista").appendChild(item);
}

function createBtn(){ // crea el boton de eliminar item. y agrega el comportamiento de este.
    let btn = document.createElement('button');
    btn.innerHTML = 'Eliminar item';
    btn.setAttribute('class', 'deleteBtn')
    btn.addEventListener('click', function(event){ //lo borra al item de la lista en pantalla.
        event.target.parentNode.remove();
        const items = document.querySelectorAll('.list-item');
        const newItems =[];
        for(let item of items){
            //newItems.push(item.innerHTML);
            newItems.push(item.textContent.replace('Eliminar item', '').trim());
            
        }
        localStorage.setItem('list', JSON.stringify(newItems));//le pasa la nueva lista al storage con todos elementos sin incuir los borrados. 
        
    
    })
    return btn;
}

function logIn(usuario){// le pide al usuario que se logee para continuar
    const visita= localStorage.getItem(usuario) || 0;
    const nuevaVisita= parseInt(visita)+1;
    localStorage.setItem(usuario,nuevaVisita);
    document.getElementById("idFormIngreso").style.display="none";
    document.getElementById("btn").removeAttribute('disabled'); //les quita el att disabled a los botones porq el usuario ya se logeo.
    document.getElementById("btnEliminar").removeAttribute('disabled');
    
    showVisit(usuario,nuevaVisita);
    return nuevaVisita;
    
}

function showVisit(user,visit){ //muestra la cantidad e vecces que el usuario accedio a la pagina.
let parrafo=document.createElement("p");
parrafo.innerHTML="Bienvenida " + user + "<br>" + "Esta es tu visita n° "+ visit;  
console.log(parrafo.textContent);
document.getElementById("idGreeting").appendChild(parrafo);
}

function getSavedList(){ //hace el get de la sita guarada en el almacdenamiento. y la muestra.
    const listContainer=document.getElementById('idLista');
    const lista=localStorage.getItem('list') || '[]';
    console.log(lista);
    const nuevaLista=JSON.parse(lista);
    console.log(nuevaLista, typeof nuevaLista);
    
    for (let  item of nuevaLista){
        addItem(item);
    }
}

function saveList(){ //guarda la lista en el almacenamiento.
    const list=document.getElementById('idLista');
    const items = document.querySelectorAll('.list-item')
    console.log('items', items)
    const parsedItems = [];
    for(let item of items){
        parsedItems.push(item.textContent.replace('Eliminar item',"").trim());
    }
    localStorage.setItem('list', JSON.stringify(parsedItems));

}


function main(){
    document.getElementById("btn").setAttribute('disabled','disabled');
    document.getElementById("btnEliminar").setAttribute('disabled','disabled');
    document.getElementById("idFormIngreso").addEventListener("submit",function(event){
        event.preventDefault();
        const usuario=event.target.nombreUser.value;
        logIn(usuario);
        getSavedList();
    });
    document.getElementById("btnEliminar").addEventListener("click",deleteList);
    document.getElementById("idForm").addEventListener("submit",function(event){
    event.preventDefault();
    const text=event.target.inputText.value;
    addItem(text);
    saveList();
    event.target.inputText.value="";
});
}

main();
