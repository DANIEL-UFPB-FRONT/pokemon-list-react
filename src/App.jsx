import { useEffect, useId, useState } from 'react'
import './App.css'
import SpecieSelect from './components/SpecieSelect'

function App() {

  const API_URL = 'https://pokeapi.co/api/v2/type/'
  const [species, setSpecies] = useState([{url: "default", name: "Loading species..."}])
  const [selectedSpecieURL, setSelectedSpecieURL] = useState("default")
  useEffect( () => {
    console.log("chamou")
    const fetchData = async () => {
      const typesData = await fetch(API_URL)
      const types = await typesData.json()
      const species = [{url: "default", name: "Species..."}]
      types.results.forEach((item) => species.push(item))
      setSpecies(species)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>POKEMON DATA</h1>
      <h2>Choose a species</h2>
      <select onChange={(e) => setSelectedSpecieURL(e.target.value)} name="select" id="select-types">   
        {
              species.length === 0 ? 
              <option id='default-species' value="default">Loading species...</option>
              : species.map((item) => <option key={item.url} value={item.url}>{item.name}</option>)
        }    
      </select>
      <hr />
      {
        selectedSpecieURL !== "default" && <SpecieSelect url={selectedSpecieURL}/>
      }

    </>
  )
}

export default App
