import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
//import Compos from './compos/compos';

function App() {
  const [bookList, setBookList] = useState<any>([]);
  const [shelf, setShelf] = useState<any>([]);

  useEffect(() => {
    axios.get("https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1").then((res) => {
      const newArr: object = res.data.docs;
      setBookList(newArr);
    })
  }, []);

  if (bookList.length == 0) {
    return (
      <div>
        <h1>Loading Please wait...</h1>
      </div>
    )
  }

  return (
    <div>
      <Compos />
    </div>
  );

  //creating a wrapper component for all the so calle books
  function Compos() {
    return (
      <div style={{ alignContent: "center" }}>
        <div>
          <h1>Book List</h1>
        </div>
        <div style={{ padding: 20, display: 'flex', gap: '20px', flexWrap: 'wrap' }}>{bookList.map((book: any) => ((
          <div style={{
            borderRadius: '10px',
            border: '1px solid #ddd',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '200px',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}>
            <h2>{book.title}</h2>
            <h3>{book.type}</h3>
            <button onClick={() => {
              shelfAdder(book.key) //pass comps here ;
            }}>Add to your shelf!</button>
          </div>
        )
        ))}
          <br />
        </div>
      </div>)
  }

  function shelfAdder(key: any) {
    //add thee book here
    //if opnce the book is added, that book should not be added again.
    let array: any = localStorage.getItem('myArray');
      if (array) {
        array = JSON.parse(array);
      } else {
        array = [];
      }

    //rough logic here.
    let bookId = key;
    let checker = false;
    for (let i = 0; i < bookList.length; ++i) {
      if (bookId === array[i].key) {
        checker = true;
        break;
      }
    }
    if (checker === true) {
      return (
        alert("the book is already in the shelf")
      )
    }
    else if (checker === false) {
      let newBook: any;
      //search and get the name of the book based on its id.
      for (let i = 0; i < bookList.length; ++i) {
        if (bookId === bookList[i].key) {
          newBook = bookList[i];
        }
      }
      array.push(newBook);
      setShelf(array);
      localStorage.setItem('myArray', JSON.stringify(array));

    }
  }


}

export default App;
