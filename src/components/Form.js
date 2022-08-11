import { useState, useEffect } from 'react'

function Form({ setShow, setStateFromChild }) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({})

  useEffect(() => {
    if (
      form?.title?.length > 5 &&
      form?.description?.length > 10 &&
      form.author
    ) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [form])

  // const forSubmit = async (e) => {
  async function formSubmit(e) {
    e.preventDefault()

    if (!validForm) {
      setErrorMessage('Not a valid form')
      return
    } else {
      setErrorMessage('')
    }
    try {
      //really submit it to an api
      const results = await fetch('https://sql.bocacode.com/comments', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      console.log(results)
      const data = await results.json()

      console.log(data)

      setFormSubmitted(true)
      setShow(false)
    } catch (error) {
      console.error(error)
      setErrorMessage(
        'There was an error submitting your comment' + error.toString()
      )
    }
  }

  console.log('this is form', form)

  // this is best practice for react
  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>

        {/* Here goes the title */}
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={updateForm}
          // onChange={(event) => (console.log(event))}
        />
        <h3>{form.title}</h3>

        {/* Here goes the description */}
        <label>Description</label>
        <textarea
          value={form.description}
          name="description"
          onChange={updateForm}
        />
        <p>
          <i>{form.description}</i>
        </p>

        {/* This is the author */}
        <label>Author</label>
        <select value={form.author} name="author" onChange={updateForm}>
          <option value="">Choose One</option>
          <option value="todd">Todd</option>
          <option value="mason">Mason</option>
          <option value="alex">Alex</option>
          <option value="james">James</option>
          <option value="">Other</option>
        </select>
        <h3>{form.author}</h3>

        <button onClick={() => setStateFromChild('hello father')}>
          send stuff back to parent
        </button>
        <br />
        <br />
        {!formSubmitted && <button>Submit</button>}
        {errorMessage && (
          <h1>
            There was an error:
            <br />
            {errorMessage}
          </h1>
        )}
      </form>
    </div>
  )
}

export default Form