import Link from 'next/link'

const Nav = () => {
    return (
        <div className="container flex mx-auto">
            <div className="flex flex-row space-x-4">
                <Link href="/">
                    <a>home</a>
                </Link>
                <Link href="/add">
                    <a>add</a>
                </Link>
            </div>
        </div>
    )
}

export default Nav
