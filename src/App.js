
import React,{useState,useEffect} from "react"
import './App.css';
import Search from './Search';

function App() {

  const [data,setData] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,serError] = useState("");
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);

  useEffect(()=>{
    setLoading(true);
    fetch("http://openlibrary.org/search.json?author=tolkien")
    .then((response)=> response.json())
    .then((data)=>setData(data))
    .then(()=> setLoading())
    .catch(serError);
  },[]);


  if(loading)
  {
    return <h1 style={{textAlign:"center"}}>Loading...</h1>
  }

  if(error)
  {
    return <pre>{JSON.stringify(error,null,2)}</pre>
  }
  
  // if(data)
  // {
  //   //return <div className="App">  {data.docs[0].title} </div>
  //   return (
  //     <div className="container">  

  //     </div>
  //   );
  // }

  if(!data){
    return null;
  }

  let array = data.docs;

  const SearchHandler = (search) =>{
    setSearch(search);
    if(search!=="")
    {
      const newwBookList = array.filter((book)=>{
        return Object.values(book)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
      });
      setSearchResult(newwBookList);
    }
    else
    {
      setSearchResult(array);
    }
  }

  console.log(searchResult);

  return (
    <div className="container">  
    <Search term={search} searchKeyword={SearchHandler} />
      {search.length < 1 ?
        <ul className="list">
          {array.map((item,i)=>{
            return(
              <li key={i} className="list-item">
                  <i className="fa fa-book"></i>
                  &nbsp;
                  {item.title}
              </li>
            ); 
          })}    
        </ul> 
      :
        <ul className="list">
        {searchResult.map((item,i)=>{
          return(
            <li key={i} className="list-item">
                <i className="fa fa-book"></i>
                &nbsp;
                {item.title}
            </li>
          ); 
        })}    
        </ul> 
      }
    </div>
  );
}

export default App;
