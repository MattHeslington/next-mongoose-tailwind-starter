import Layout from 'components/Layout'
import Form from 'components/Form'

export default function Add() {

    const userForm = {
        username: '',
        fullname: '',
        age: 0,
        imageurl: '',
    }

    return <Form formId="add-user-form" userForm={userForm} />
}

Add.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)