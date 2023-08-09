import {useState, useEffect} from 'react'
import countryServices from './services/CountryRendering.js'

const SearchBar = ({ newCountry, handleSearchChange }) => {
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
    display: 'inline',
    fontSize: '18px',
    fontWeight: 'bold',
  }

  return (
    <li>
      <p style={countriesStyle}>{country}</p> <button onClick={toggleShow}>show</button>
    </li>
  )
}

const CountryFullView = ({ country }) => {
    return(
        <>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
            {country.languages.map( (language, index) => {
                return (
                <li key={index}>
                    {language}
                </li>
                )
            })}
            </ul>
            <img src={country.flag} alt="country flag" />
            <h2>Weather in {country.capital}</h2>
            <p>temperature {country.temp} Celcius</p>
            <img src={country.icon} alt="country capital weather icon" />
            <p>Wind {country.wind} m/s</p>
        </>
    )
}

const DisplayCountryList = ({ filteredCountries, toggleShow}) => {
    // DisplayCountryList may not check if filteredCountries is precisely length one due to it being an asynchronous action.
    // Therefore, a rerender needs to be done on displayOne
    const listStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0
    }

    if ( filteredCountries.length > 10) {
        return (
            <>
                Too many matches, specify another filter
            </>
        )
    }
    return (
        <ul style={listStyle}>
            {filteredCountries.map( (filteredCountry) => {
                if ( filteredCountry.show === true ) {
                    return <CountryFullView country={filteredCountry} key={filteredCountry.id} />
                }
                return <Country country={filteredCountry.name} toggleShow={ () => toggleShow(filteredCountry.name)} key={filteredCountry.id}  />
            })}
        </ul>
    )
}

const Display = ({ filteredCountries, initialLoading, handleSearchChange, toggleShow}) => { // Main Display Component -- Gets intentionally rerenderd on filteredCountries Array
    if ( initialLoading === true ) {
        return (
            <div>
                Loading Data...
            </div>
        )
    }

    return (
        <div>
            <SearchBar handleSearchChange={handleSearchChange} />
            <DisplayCountryList filteredCountries={filteredCountries} toggleShow={toggleShow} />
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [newCountry, setNewCountry] = useState('')
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect( () => {
        countryServices
            .getCountryList()
            .then( (response) => {
                setInitialLoading(false)
                setCountries(response)
            })
    }, [])

    useEffect( () => {
         if ( newCountry.trim().length > 0 ) {
            const filtered = countries.filter( (country) => {
                return (country.name).toLowerCase().includes(newCountry.toLowerCase())
            })
            if ( filtered.length === 1 && filtered[0].show === false) {
                toggleShow(filtered[0].name, filtered)
                return
            }
            console.log("Filtered Countries [newCountry Length > 0]:", filtered)
            setFilteredCountries(filtered)
         }
         else if ( filteredCountries.length > 0 ) { // It's a given that the newCountry input is ZERO or NEG
            // Addresses the issue where the country input is nothing visible and there are still elements in the filteredArray
            console.log("newCountry EMPTY")
            setFilteredCountries([])
         }
    }, [newCountry, countries]) // The initial change in the countries array should not cause any sort of change/rerender

    const handleSearchChange = (event) => {
        console.log('Country:', event.target.value)
        setNewCountry(event.target.value)
    }

    const toggleShow = ( CountryName, alreadyFiltered=filteredCountries ) => {
        /*
        // Attempted break down solution to manipulating the JSON properties
        console.log("Show", CountryName)

        const CountryObj = filteredCountries.find( country => country.name === CountryName )
        console.log("Singlular Object", CountryObj)

        const filtered = {...CountryObj, show: !CountryObj.show}
        console.log("JSON Array", filtered)

        const changedFiltered = filteredCountries.map( (country) => {
            if ( country.name === filtered.name ) {
                return filtered
            }
            return country
        })
        
        console.log("Changed filteredCountries Array", changedFiltered)
        */

        countryServices
            .getCountryInfo( CountryName )
            .then( (CountryObj) => {
                const changedFiltered = alreadyFiltered.map( (country) => {
                    if ( country.name === CountryName ) {
                        const filtered = {...country, 
                            show: !country.show,
                            "capital": CountryObj.capital,
                            "area": CountryObj.area,
                            "languages": CountryObj.languages,
                            "flag": CountryObj.flag,
                            "temp": CountryObj.temp,
                            "wind": CountryObj.wind,
                            "icon": CountryObj.icon
                        }
                        return filtered
                    }
                    return country
                })
                setFilteredCountries(changedFiltered)
            })

        /*
        const CountryObj = filteredCountries.find( country => country.name == CountryName )
        const changedFiltered = { ...CountryObj, show: !CountryObj.show }
        
        countryServices
            .getCountry(CountryName)
        setFilteredCountries(changedFiltered)
        */
    }

    return (
        <div>
            <Display filteredCountries={filteredCountries} initialLoading={initialLoading} handleSearchChange={handleSearchChange} toggleShow={toggleShow} />
        </div>
    )
}

export default App