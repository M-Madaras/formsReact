import { useState, useEffect } from "react"

export default function Form() {
    const [formSubmmited, setFormSubmitted] = useState(false)
    const [validForm, setValidForm] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [form, setForm] = useState({})
  
    useEffect(() => {
      if (form?.title?.length > 3 && form?.description?.length > 10) {
        setValidForm(true);
      } else {
        setValidForm(false);
      }
    }, [form])
  
  
    async function formSubmit(e) {
      e.preventDefault();
  
  
      if (!validForm) {
        setErrorMessage("Not valid form")
        return
      }
  
      try {
        const results = await fetch("https://sql.bocacode.com/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          // body: JSON.stringify(comment)
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
  
    console.log('this is form', form)
  
    const updateForm = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value })
    }
  
    return (
      <div className='App'>
        <form onSubmit={formSubmit}>
          <h1>Comments</h1>
          <label>Title</label>
          <input
            type='text'
            name='title'
            // required
            value={form.title}
            onChange={updateForm}
          />
          <h3>{form.title}</h3>
  
          {/*  this is a Description */}
          <label>Description</label>
          <textarea
            value={form.description}
            name='description'
            onChange={updateForm} />
             <h3>{form.description}</h3>
  
  
          {/*  Author Name */}
          <label>Author</label>
          <select value={form.author}
            onChange={updateForm}
          > 
            <option value="" selected>ChooseOne</option>
            <option value="UUID">John Doe</option>
            <option value="#132324">Mason</option>
            <option value="other">Other</option>
          </select>
  
  
          {!formSubmmited &&
            <button className="boxbutton">Submit form</button>
          }
  
          {errorMessage &&
            <h1>There was and Error: <br />
              {errorMessage}</h1>
          }
        </form>
      </div>
    );
  }