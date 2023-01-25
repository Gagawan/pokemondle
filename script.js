function getOriginalPoke(pokeNumber) {
    pokeNumber = Math.floor(Math.random() * 905); 
    const apiPoke = fetch('https://pokeapi.co/api/v2/pokemon/'+pokeNumber)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('idOriginalPoke').innerHTML = data.id; 
        document.getElementById('nameOriginalPoke').innerHTML = data.name; 
        document.getElementById('type1OriginalPoke').innerHTML = data.types[0].type.name; 
        document.getElementById('type2OriginalPoke').innerHTML = data.types[1].type.name; 
        document.getElementById('spriteOriginalPoke').innerHTML = data.types[1].type.name; 
    });
    const api = fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokeNumber)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('eggGroupeOriginalPoke').innerHTML = data.egg_groups[0].name;
        document.getElementById('colorOriginalPoke').innerHTML = data.color.name;  
    });
}

function getPoke(pokeNumber) {
    pokeNumber = document.getElementById("in").value;  
    fetch('https://pokeapi.co/api/v2/pokemon/'+pokeNumber)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('spriteCurrentPoke').innerHTML += 
        '<div class="card d-flex justify-content-center align-items-center" style="width: 7rem; height: 7rem; margin-top: 3%;"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokeNumber+'.png" class="img-fluid p-3" alt=""></div>';
        choix('idOriginalPoke', 'idCurrentPoke', data.name)
        choix('nameOriginalPoke', 'nameCurrentPoke', data.name)
        choix('type1OriginalPoke', 'type1CurrentPoke', data.types[0].type.name)
        choix('type2OriginalPoke', 'type2CurrentPoke', data.types[1].type.name)
    });
    fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokeNumber)
    .then((response) => response.json())
    .then((data) => {
        choix('eggGroupeOriginalPoke', 'eggGroupeCurrentPoke', data.egg_groups[0].name)
        choix('colorOriginalPoke', 'colorCurrentPoke', data.color.name)
    });
    
}

function choix(nomIdO, nomIdC, data){
    if(document.getElementById(nomIdO) == document.getElementById(nomIdC)){
        document.getElementById(nomIdC).innerHTML += 
        '<div class="card d-flex justify-content-center align-items-center" style="width: 7rem; height: 7rem; background-color: green; margin-top: 3%;"><p>'+data+'</p></div>'; 
    } else {
        document.getElementById(nomIdC).innerHTML += 
        '<div class="card d-flex justify-content-center align-items-center" style="width: 7rem; height: 7rem; background-color: red; margin-top: 3%;"><p>'+data+'</p></div>';
    }
}