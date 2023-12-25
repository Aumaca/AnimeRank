import "./sidemenu.css"
import { Link } from "react-router-dom";

const Sidemenu = ({ isActive }: {isActive: boolean}) => {
  return (
    <>
      <div className={`sidemenu ${isActive ? 'active' : ''}`}>
        <Link to="/" className="item">Homepage</Link>
        <Link to="/" className="item">Top Animes</Link>
        <Link to="/" className="item">Most Popular Animes</Link>
        <Link to="/" className="item">My Profile</Link>
      </div>
    </>
  );
}

export default Sidemenu;