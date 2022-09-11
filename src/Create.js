import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [ title, setTitle ] = useState('')
  const [ body, setBody ] = useState('')
  const [ author, setAuthor ] = useState('Austin')
  const [ isPending, setIsPending ] = useState(false)
  const history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = { title, body, author }

    setIsPending(true)
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('new blog add')
      setIsPending(false)
      history('/')
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Blog title</label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Fill title"
          />
        </div>
        <div>
          <label htmlFor="body">Blog body</label>
          <textarea
            id="body"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="author">Blog title</label>
          <select
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            >
            <option value="Austin">Austin</option>
            <option value="Jordan">Jordan</option>
          </select>
        </div>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Add Blog ...</button>}
      </form>
    </div>
  );
}
 
export default Create;