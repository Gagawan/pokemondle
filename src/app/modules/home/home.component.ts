import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  names: String[] = [];
  poke: any[] = [];

  async ngOnInit() {
    try {
      this.poke = await this.getRandomPoke();
      this.names = await this.getAllName();
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, such as displaying an error message to the user.
    }
  }

  async getRandomPoke() {
    try {
      const random: number = Math.floor(Math.random() * 151) + 1;
      const poke: any[] = await this.fetchPoke(random);
      console.log(poke);
      return poke;
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, such as displaying an error message to the user.
      return []; // Return an empty array or some default value when an error occurs.
    }
  }

  async fetchPoke(idOrName: any): Promise<any> {
    try {
      const response = await fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/` + idOrName);
      if (!response.ok) {
        throw new Error(`Error fetching data for ${idOrName}`);
      }
  
      const data = await response.json();
      const poke: any[] = [];
  
      poke.push(data.generation); //generation
      poke.push(data.category); //category
      poke.push(data.types[0].name); //type1
      if (data.types.length > 1) { //type2 if it exist else null
        poke.push(data.types[1].name);
      } else {
        poke.push("null");
      }
      poke.push(data.talents[0].name); //talent
      if(data.evolution != null){
        if (data.evolution.pre != null) { //pre evolution if it exist else null
          poke.push("pre");
        } else {
          poke.push("no pre");
        }
        if (data.evolution.next != null) { //next evolution if it exist else null
          poke.push("next");
        } else {
          poke.push("no next");
        }
        if (data.evolution.mega != null) { //mega evolution if it exist else null
          poke.push("mega");
        } else {
          poke.push("no mega");
        }
      } else { poke.push("no pre"); poke.push("no next"); poke.push("no mega"); }
      poke.push(data.name["fr"]); //name
      poke.push(data.sprites["regular"]) //sprite
  
      return poke;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  getAllName() {
    let poke: any[] = [];
    let namePoke: String[] = [];
  
    fetch(`https://api-pokemon-fr.vercel.app/api/v1/gen/1`)
      .then((response) => response.json())
      .then((data) => {
        poke = data;
        poke.forEach((element) => {
          const nameWithoutAccents = this.removeAccents(element.name["fr"]);
          namePoke.push(nameWithoutAccents);
        });
      });
  
    return namePoke;
  }
  

  async guess() {
    try {
      let guess: string = (<HTMLInputElement>document.getElementById("input")).value;
      console.log(guess);
      (<HTMLInputElement>document.getElementById("input")).value = "";
  
      let guessPoke: any[] = await this.fetchPoke(guess);
      console.log(guessPoke);
      let result: any[] = [];
  
      for (let i = 0; i < guessPoke.length-1; i++) {
        if (guessPoke[i] == this.poke[i]) {
          result.push(true);
        } else {
          result.push(false);
        }
      }
      console.log(result);
      this.updateScreen(result, guessPoke);

    } catch (error) {
      console.error(error);
      // Handle the error appropriately, such as displaying an error message to the user.
    }
  }  
  
  updateScreen(tab: any[], poke: any[]){
    this.updateP("Gen", tab[0], poke[0]);
    this.updateP("type1", tab[2], poke[2]);
    this.updateP("type2", tab[3], poke[3]);
    this.updateP("Talent", tab[4], poke[4]);
    this.updateP("Pre", tab[5], poke[5]);
    this.updateP("Next", tab[6], poke[6]);
    this.updateP("Mega", tab[7], poke[7]);
    this.updateImg("Sprite", poke[9]);
  }

  updateP(id: string, value: boolean, pokeValue?: any) {
    // DOM elements declaration
    let element = document.getElementById(id);
    let div = document.createElement("div");
    let p = document.createElement("p");
    // Style
    p.textContent = pokeValue;
    if (value == true) {
      div.style.backgroundColor = "#141E46";
    } else {
      div.style.backgroundColor = "#C70039";
    }

    div.style.width = "4.5rem"; div.style.height = "4.5rem"; div.style.marginBottom = "1.5rem";
    div.style.boxShadow = "0 0 0.2rem black"; div.style.borderRadius = "0.2rem"; div.style.fontSize = "0.7rem";
    div.style.textAlign = "center"; div.style.wordWrap = "break-word"; div.style.color = "white";
    div.appendChild(p);
    if (element) {
      element.insertBefore(div, element.firstChild);
    }
  }

  updateImg(id: string, pokeValue?: any) {
    let sprites = document.getElementById(id);
    let img = document.createElement("img") as HTMLImageElement;
    img.src = pokeValue;
    img.style.height = "4.5rem";
    img.style.width = "4.5rem";
    img.style.marginBottom = "1.5rem";
  
    if (sprites) {
      sprites.insertBefore(img, sprites.firstChild);
    }
  }

   removeAccents(str: String) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
