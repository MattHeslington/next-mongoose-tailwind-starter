import Nav from 'components/Nav'

const Layout = ({children}) => {
    return (
        <div className="min-h-screen">
            <Nav/>
            <main className="container flex mx-auto mt-8">{children}</main>
        </div>
    )
}

export default Layout
