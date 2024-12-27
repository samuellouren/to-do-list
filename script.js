const localStorageKey = 'to-do-list-SL'
values.push({
    name: input.value,
    concluida: false // Tarefa começa como não concluída
});


function validateExistsNewTask()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask()
{
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    //validation
    if(!input.value)
    {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir na lista')

    }
    else if(validateExistsNewTask())
    {
        alert('ja existe uma task com essa descrição')
    }
    else
    {
    //increment to localstorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showvalues()
    }
    input.value = ''
}
function showvalues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `
        <li class="task ${values[i].concluida ? 'done' : ''}">
            <button id='btn-trash' onclick='removeItem("${values[i].name}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
            </button>
            <p>${values[i].name}</p>
            <button id='btn-ok' onclick='Itemconcluido("${values[i].name}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>
            </button>
        </li>`;
    }
}
function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showvalues()
}
function Itemconcluido(nome) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === nome);

    if (index !== -1) {
        // Marca como concluída
        values[index].concluida = true;
        localStorage.setItem(localStorageKey, JSON.stringify(values));

        // Adiciona efeito visual e remove após 1 segundo
        const listItems = document.querySelectorAll("#to-do-list li");
        listItems[index].classList.add("done");

        setTimeout(() => {
            removeItem(nome);
        }, 1000);
    }
}


showvalues()