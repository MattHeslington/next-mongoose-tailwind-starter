import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

const Card = ({ id, username, fullname, age, imageurl }) => {

    const router = useRouter()

    const handleDelete = async () => {

        try {
            await fetch(`/api/users/${id}`, {
                method: 'Delete',
            })
            router.push('/')
        }
        catch (error) {
            console.log('Failed to delete the user.')
        }
    }

    return (
        <article className="flex flex-row items-center border border-gray-300 px-2 space-x-4 h-10">
            <Image src={imageurl} alt={`avatar of ${fullname}`} className="w-8 h-8 rounded-full border border-gray-300 object-cover object-center" height={32} width={32}/>
            <span className="w-16">{username}</span>
            <span className="w-32">{fullname}</span>
            <span className="w-10">{age}</span>
            <Link href="/[id]/edit" as={`/${id}/edit`}>
                <button>edit</button>
            </Link>
            <button onClick={handleDelete} className="cursor-pointer">delete</button>
        </article>
    )
}

export default Card
