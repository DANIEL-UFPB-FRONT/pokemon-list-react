import { useEffect, useState } from "react"

function SpecieSelect({url}) {
    const [pokemons, setPokemons] = useState([{url: "default", name: "Loading pokemons..."}])
    const [pokemon, setPokemon] = useState(null)
    const [selectedPokemonURL, setSelectedPokemonURL] = useState("default")

    useEffect( () => {
        const fetchData = async () => {
          const pokemonData = await fetch(url)
          const pokemonsParsed = await pokemonData.json()
          const newPokemons = [{url: "default", name: "Pokemons..."}]
          pokemonsParsed.pokemon.forEach((item) => newPokemons.push({url: item.pokemon.url, name: item.pokemon.name}))
          setPokemons(newPokemons)
          setSelectedPokemonURL("default")
        }
        fetchData()
      }, [url])


      useEffect( () => {
        const fetchData = async () => {
            const pokemonDataRaw = await fetch(selectedPokemonURL)
            const pokemonData = await pokemonDataRaw.json()
            console.log(pokemonData)
            setPokemon(pokemonData)
        }

        if(selectedPokemonURL !== "default")
            fetchData()
        else 
            setPokemon(null)
        return () => {
    
        }
      }, [selectedPokemonURL])

    return (
        <>
            <select onChange={(e) => setSelectedPokemonURL(e.target.value)} name="select" id="select-types">   
                {
                    pokemons.length === 0 ? 
                    <option id='default-species' value="default">Loading pokemons...</option>
                    : pokemons.map((item) => <option key={item.url} value={item.url}>{item.name}</option>)
                }    
            </select>

            <hr />
            {
                pokemon && <p>({pokemon.base_experience}) {pokemon.name}</p>
            }
        </>
    )
}

export default SpecieSelect