import Image from 'next/image'

const View = ({id, username, fullname, age, imageurl}) => {
    return (
        <div className="h-72 w-56 border border-gray-300 p-4 flex flex-col space-y-8 items-center">
            <Image
                src={imageurl}
                alt={username}
                className="h-24 w-24 object-center object-cover rounded-full border border-gray-300"
                width={96}
                height={96}
            />
            <span>{username}, {age}</span>
            <span>{fullname}</span>
        </div>
    )
}

export default View
