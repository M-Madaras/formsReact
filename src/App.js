import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [formSubmmited, setFormSubmitted] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("your description")
  const [author, setAuthor] = useState("text")


  useEffect(() => {
    // fetching stuff
    if (title.length > 3 && description.length > 10) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [title, description, author])


  // console.log(title)
  //const formSubmit = async (e) => {

  async function formSubmit(e) {
    e.preventDefault();


    if (!validForm) {
      setErrorMessage("Not valid form")
      return
    }


    try {
      // console.log("form submitted")
      //  const comment = {
      //    title: title,
      //    description: description,
      //    author: author,
      //  }
      const comment = {
        title,
        description,
        author,
      }

      console.log("form submitted with", comment)

      // really submit it to an API
      const results = await fetch("https://sql.bocacode.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      })
      console.log(results)
      const data = await results.json()
      console.log(data)


      setFormSubmitted(true)
      setErrorMessage("")
      setValidForm(true)
      alert("Submitted!!")

    } catch (error) {
      console.error(error)
      setErrorMessage("there was an error submitting you comment" + error.toString())
    }

  }

  return (
    <div className='App'>
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>

        {/*  title */}
        <label>Title</label>
        <input
          type="text"
          // required
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
        <h3>{title}</h3>

        {/*  this is a Description */}
        <label>Description</label>
        <textarea
          value={description}
          required
          onChange={(e) => { setDescription(e.target.value) }} />
        <h3>{description}</h3>

        {/*  Author Name */}
        <label>Author</label>
        <select value={author}
          onChange={(e) => { setAuthor(e.target.value) }}
        >
          <option value="" selected>ChooseOne</option>
          <option value="UUID">John Doe</option>
          <option value="#132324">Mason</option>
          <option value="other">Other</option>
        </select>
        <h3>{author}</h3>

        {!formSubmmited &&
          <button>Submit form</button>
        }

        {errorMessage &&
          <h1>There was and Error: <br />
            {errorMessage}</h1>
        }
      </form>
    </div>
  );
}

export default App;
