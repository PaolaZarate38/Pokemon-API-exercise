const pokemonSelector = document.querySelector('#pokemon-type');
const pokemonContainer = document.querySelector('.pokemon-container');

const url = "https://pokeapi.co/api/v2/type";


async function jsonContent(url) { 
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.status);
  return response.json();
}


async function loadTypes() { 
  try {
    
    const data = await jsonContent(url);
    console.log(data.results);

    const types = data.results;

    for (const type of types) { 
      const option = document.createElement('option');
      option.value = type.name;
      option.textContent = type.name.toUpperCase();
      pokemonSelector.appendChild(option); 
    }

    console.log('Tipos cargados:', types.map(type => type.name));
  } catch (error) {
    console.log('No se pudieron cargar los tipos',error.message);
  }
}


loadTypes();

async function changeType(event) { 
  const type = event.target.value;       
  try {
    
    const response = await fetch( url + '/' + `${type}`); //fallaba si no le ponia / y ya no pude reutilizar el metodo jsonContent
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    const urls = data.pokemon.map(p => p.pokemon.url); 
    const promises = urls.map(u => jsonContent(u)); 
    const contents = await Promise.all(promises); 
    createCards(contents); 
    
    console.log(data);
    
    const list = data.pokemon.map(p => p.pokemon.name);
    console.log(`Total del tipo: "${type}":`, list.length);
    console.log( list.slice(0, 20));  

  } catch (error) {
    console.log(error.message);
  }
}


pokemonSelector.addEventListener('change', changeType); 


function createCards(pokemonArray) { 
  const fragment = document.createDocumentFragment();
  for (const p of pokemonArray) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
      <img src="${p.sprites?.front_default || ''}">
      <h3>#${p.id} ${p.name}</h3>
      <p>${p.types.map(t => t.type.name)}</p>
    `;
    fragment.appendChild(card);
  }
  pokemonContainer.innerHTML = '';
  pokemonContainer.appendChild(fragment);
}


                   


