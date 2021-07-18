import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ formId, userForm, newUser = true }) => {

    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    // set the state, provided by prop userForm in add.js and based on the user model
    const [form, setForm] = useState({
        username: userForm.username,
        fullname: userForm.fullname,
        age: userForm.age,
        imageurl: userForm.imageurl,
    })

    /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (form) => {
        const { id } = router.query
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
            router.push('/')
        }
        catch (error) {
            setMessage('Failed to update pet')
        }
    }

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form) => {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }
            router.push('/')
        }

        catch (error) {
            setMessage('Failed to add user')
        }
    }

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name

        setForm({...form,[name]: value})
    }

    // if it's a new pet, postData, else putData. Nice.
    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            newUser ? postData(form) : putData(form)
        } else {
            setErrors({ errs })
        }
    }

    /* Makes sure user info is filled out*/
    const formValidate = () => {
        let err = {}
        if (!form.username) err.username = 'Username is required'
        if (!form.fullname) err.fullname = 'Full name is required'
        if (!form.age) err.age = 'Age is required'
        if (!form.imageurl) err.imageurl = 'Image URL is required'
        return err
    }

    return (
        <>
        <form id={formId} onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                maxLength="20"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="h-10 border border-gray-300 px-2 w-64"
                required
            />

            <label htmlFor="fullname">Full name</label>
            <input
                type="text"
                maxLength="30"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                className="h-10 border border-gray-300 px-2 w-64"
                required
            />

            <label htmlFor="age">Age</label>
            <input
                type="number"
                maxLength="2"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="h-10 border border-gray-300 px-2 w-64"
                required
            />

            <label htmlFor="imageurl">Photo</label>
            <input
                type="text"
                name="imageurl"
                value={form.imageurl}
                onChange={handleChange}
                className="h-10 border border-gray-300 px-2 w-64"
            />
            <button type="submit" className="btn">Submit</button>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => (
                <li key={index}>{err}</li>
                ))}
            </div>
        </form>
        </>
    )
}

export default Form

