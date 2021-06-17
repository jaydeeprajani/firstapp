import React from 'react';

function Search({term,searchKeyword})
{
    function handleSearch(e)
    {
        searchKeyword(e.target.value);
    }

    return(
        <>
            <input 
                className="input-field" 
                type="text"
                value={term}
                placeholder="Enter a Book Name" 
                onChange={handleSearch} >
            </input>
        </>
    )
}

export default Search;