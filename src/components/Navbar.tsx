import { Add } from "@mui/icons-material"
import ListIcon from '@mui/icons-material/List';
import Link from "next/link";

const Navbar = () => {
    return (
        <>
            <div className='navbar-placeholder' />
            <section className="navbar">
                <div className="nav-container">
                    <Link className='Link' href={'/'}>
                        <span className="logo">
                            BLOGG
                        </span>
                    </Link>
                    <nav className="main-nav">
                        <ul >
                            <Link className='Link' href={'/'}>
                                <li> <ListIcon /> Posts</li>
                            </Link>
                            <Link className='Link' href={'/create'}>
                                <li> <Add /> Create</li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </section>
        </>
    )
}

export default Navbar