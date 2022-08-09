import { useState } from 'react';
import './App.css';

function App() {

  const [title, setTitle] = useState("this is the title")
  const [description, setDescription] = useState("your description")
  const [author,setAuthor] = useState("other")


  console.log(title)


  function formSubmit(e) {
    e.preventDefault();
    console.log("form submitted")
  }

  return (
    <div className='App'>
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>

        {/*  title */}
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
          />
        <h3>{title}</h3>

          {/*  this is a Description */}
        <label>Description</label>
        <textarea 
        value={description}
        onChange={(e)=>{setDescription(e.target.value) }} />
        <h3>{description}</h3>

        {/*  Author Name */}
        <label>Author</label>
        <select value={author}
        onChange={(e)=> {setAuthor(e.target.value)}}
        >
          <option value="" selected>ChooseOne</option>
          <option value="UUID">John Doe</option>
          <option value="#132324">Mason</option>
          <option value="other">Other</option>
        </select>
        <h3>{author}</h3>
        
        <button>Submit form</button>


      </form>
    </div>
  );
}

export default App;
