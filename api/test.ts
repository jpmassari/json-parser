import { serialize } from '../main/serialize';
require('node-fetch')

const testApi = () => {
    const obj = {
        name: "joao",
        idade: 26,
        caracteristicas: {
            olho: "verde",
            nariz: "grande",
            cabelo: "castanho",
            biceps: 39
        },
        namorada: "Sophia",
        caracteristicasNamorada: {
            olho: "castanho",
            idade: 19,
            cabelo: "loiro"
        }    
    };
    
    const stringify = serialize(obj);
    
    console.log(stringify);
    
    // Sending a GET request
    fetch('http://localhost:3000')
      .then(response => "get response")
      .then(data => console.log(data))
      .catch(error => console.error(error));
    
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringify,
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
}

testApi()