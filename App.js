import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {

  var listOG = getOGpoke(1);
  var listC = [];

  return (
    //npx create-react-app pokemondle
    <div className="App">

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>

      <div class="container-fluid d-flex row justify-content-center">
        <h1>One pokemon a day, try to guess it !</h1>
        <div>
          <input type="text" id="input" />
          <button onClick={getPoke}>guess</button>
        </div>
        <div>
          
        </div>
      </div>






    </div>
  );
}

function getPoke() { //return les infos du pokemon
  var id = document.getElementById("input").value;
  var listC = [];
  fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    .then(response => response.json())
    .then(data => {
      listC.push(data.name);
      listC.push(data.types[0].type.name);
      listC.push(data.types[1].type.name);
    });
    return listC;
}

function getOGpoke(id) {
  var listOG = [];
  fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    .then(response => response.json())
    .then(data => {
      listOG.push(data.name);
      listOG.push(data.types[0].type.name);
      listOG.push(data.types[1].type.name);
    });
  return listOG;
}

class poke extends React.Component {
}

export default App;


