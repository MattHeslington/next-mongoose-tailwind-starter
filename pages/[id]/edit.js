import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from 'components/Layout'
import Form from 'components/Form'

const fetcher = (url) => fetch(url).then((res) => res.json()).then((json) => json.data)

const EditUser = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: user, error } = useSWR(id ? `/api/users/${id}` : null, fetcher)

    if (error) return <p>Failed to load</p>
    if (!user) return <p>Loading...</p>

    // store the data from SWR as an object to be passed to the form. Nice.
    const userForm = {
        username: user.username,
        fullname: user.fullname,
        age: user.age,
        imageurl: user.imageurl,
    }

    return <Form userForm={userForm} newUser={false} />
}

export default EditUser

EditUser.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)