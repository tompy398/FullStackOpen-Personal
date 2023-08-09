/*
import {useState, useEffect} from 'react'
import axios from 'axios'

// This is really messy. I am going to refactor it all
const App = () => {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
  
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState('')
  const [listCountries, setListCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [displayOne, setDisplayOne] = useState(null)
  
  useEffect( () => { // Gets the list of Country Names at START
    axios
      .get(`${baseUrl}/all`)
      .then(response => {
        const newListCountries = response.data.map( place => place.name.common )
        console.log("Changing New List Countries")
        setListCountries(newListCountries)
        console.log("Changing Loading State")
        setLoading(false)
      })
  }, [])

  useEffect( () => { // Handles Country Changes
    if (country.trim().length === 0) {
      setSearchedCountries([])
    }
    else {
      const newSearchList = listCountries.filter(place => {
        return place.toLowerCase().includes(country.toLowerCase())
      })

      const newSearchList_Props = newSearchList.map( (place, index) => {
        return {
          "name": place,
          "id": index
        }
      })
      console.log("Changing Search List")
      setSearchedCountries(newSearchList_Props)
    }

  }, [country, listCountries]) // A state change of 'country' invokes a rerender and then 'searchedCountries' invokes another rerender so that's why there are two renders :0

  const handleSearchChange = (event) => {
    const newCountry = event.target.value
    console.log("Changing Country Entry")
    setCountry(newCountry)
  }

  const DisplayCountries = () => {
    if ( searchedCountries.length > 10 ){
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    else if ( searchedCountries.length === 1 ){ // Seems illogical and not great to keep this all in one component, it's best to split the logic somehow
      console.log("How many times?")
      axios
        .get(`${baseUrl}/name/${searchedCountries[0].name}`)
        .then(response => {
          console.log("Does it get here?")
        })
       
    }
    return (
      <div>
        {searchedCountries.map(place =>
          <IndividCountries key={place.id}name={place.name} />
        )}
      </div>
    )
  }

  const IndividCountries = ({ name }) => {
    return (
      <li>
        {name}
      </li>
    )
  }

  const ListStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    listStyle: 'none',
    padding: 0, 
    margin: 0
  }

  console.log("Rerendering...")

  if (!loading) {
    console.log("No longer loading...")
    return (
      <div>
        <form>
          find countries <input value={country} onChange={handleSearchChange} />
        </form>
        <ul style={ListStyles}>
          <DisplayCountries />
        </ul>
      </div>
    )
  }

  console.log("Loading stuff...")
  return (
    <div>
      Loading Data...
    </div>
  )

}
export default App;
*/

/*
const DisplayOneCountry = ({ singleCountryData }) => {

  
  return(
  <>
    <h1>{singleCountryData.name}</h1>
    <p>capital {singleCountryData.capital}</p>
    <p>area {singleCountryData.area}</p>
    <h3>languages</h3>
    <ul>
      {singleCountryData.languages.map( (language, index) => {
        return (
          <li key={index}>
            {language}
          </li>
        )
      })}
  </ul>
    <img src={singleCountryData.flag} alt="country flag" />
  </>
  )
}
*/
import {useState, useEffect} from 'react'
import countryServices from './services/CountryRendering.js'

const SearchBar = ({  newCountry, handleSearchChange }) => {
  const labelStyle = {
    fontSize: '18px'
  }

  return (
    <form style={labelStyle}>
      find countries <input value={newCountry} onChange={handleSearchChange} />
    </form>
  )
}

const Country = ({ country, toggleShow}) => {
  const countriesStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: 0,
    margin: 0
  }
  
  return (
    <>
      <p style={countriesStyle}>{country}</p><button onClick={ () => toggleShow(country.name)}>show</button>
    </>
  )
}

const DisplayCountries = ({ filteredCountries, toggleShow}) => {
  if ( filteredCountries.length >  10 ) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  return (
    <>
      {filteredCountries.map( (filteredCountry) => {
        return <Country country={filteredCountry} key={filteredCountry.id} toggleShow={toggleShow} />
      })}
    </>
  )
}
/* 
  My design philosophy will have to change. It needs to be such that the rendering of filteredCountries has to change to redisplay it.
  If the filteredCountries contain some sort of Json Object not just a string then things will be different.
  When the shower button is triggered, we will have to grab an array with the country name and then replace it with the all the content
  On a top level we are detecting whether the filteredCountries array has a JSON object contained in its index which will then allow for a full redisplay
  On a lower level, we are forcing a change in the filterdCountries to cause a complete rerender
  Each of these Display components need to have a show rendering
  */
const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  //const [loadingOne, setLoadingOne] = useState(false)
  const [startLoading, setStartLoading] = useState(true)

  useEffect( () => {
    countryServices
      .getCountryList()
      .then(response => {
        setStartLoading(false)
        setCountries(response)
      })
  }, [])

  useEffect( () => {
    if ( newCountry.trim().length === 0 ){
      return
    }
    else {
      const filtered = countries.filter( (country) => {
        return (country.name).toLowerCase().includes(newCountry.toLowerCase())
      })
      setFilteredCountries(filtered)
    }
  }, [newCountry])

  const handleSearchChange = (event) => {
    console.log('Country:', event.target.value)
    setNewCountry(event.target.value)
    /*
    const filtered = countries.filter( (country) => {
      return (country.name).toLowerCase().includes(changedCountry.toLowerCase())
    })
    
    if ( !singleCountry && filtered.length === 1 ) {
      console.log("[EFFECT HOOK] Filtered to 1")
      console.log("[EFFECT HOOK] Checking the Filtered Array:", filtered)
      console.log("[EFFECT HOOK] Checking the Country's Name:", filtered[0].name)

      setLoadingOne(true) // Ensures that the Display Component is Blank (mimics loading)
      countryServices
        .getCountry(filtered[0].name)
        .then( (response) => {
          setSingleCountry(response)
          console.log("Changed Country:", changedCountry)
        })
    }
    else if ( singleCountry && filtered.length !== 1 ) {
      setSingleCountry(null)
      setLoadingOne(false)
    }
    setNewCountry(changedCountry)
    setFilteredCountries(filtered)
    */
  }

  const toggleShow = ({ CountryName }) => {
    const CountryObj = filteredCountries.find( country => country.name === CountryName )
    const changedFiltered = { ...CountryObj, show: !CountryObj.show }

    setFilteredCountries(changedFiltered)
  }

  if ( startLoading ) { 
    return (
      <div>
        Loading Countries...
      </div>
    )
  }

  return (
    <div>
      <SearchBar newCountry={newCountry} handleSearchChange={handleSearchChange} />
      <DisplayCountries filteredCountries={filteredCountries} newCountry={newCountry} toggleShow={toggleShow} />
    </div>
  )

}

export default App