import { useState } from 'react'
import { useRouter } from 'next/router'
import dbConnect from 'utils/dbConnect'
import Layout from 'components/Layout'
import Users from 'models/Users'
import View from 'components/View'

const UserPage = ({ user }) => {

    const router = useRouter()

    return (
        <>
            <div className="flex flex-col space-y-2">
                <span>user:{user._id}</span>
                <View
                    username={user.username}
                    fullname={user.fullname}
                    age={user.age}
                    imageurl={user.imageurl}
                />
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
    await dbConnect()
    const user = await Users.findById(params.id).lean()
    user._id = user._id.toString()
    return { props: { user } }
}

export default UserPage

UserPage.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)