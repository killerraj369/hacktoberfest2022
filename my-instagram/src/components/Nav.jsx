import instagramLogo from "../assets/instagram.png";
import houseIcon from "../assets/house-chimney.svg";
import compassIcon from "../assets/compass.svg";
import heartIcon from "../assets/heart.svg";
import messageIcon from "../assets/message.svg";

const Nav = () => {
  return (
    <nav>
      <div className="container nav">
        <div className="logo">
          <img src={instagramLogo} alt="Instagram Logo" />
        </div>
        <input type="text" className="search" placeholder="search" />
        <div className="nav-links">
          <button>
            <img src={houseIcon} alt="house icon" />
          </button>

          <button>
            <img src={messageIcon} alt="Message icon" />
          </button>

          <button>
            <img src={compassIcon} alt="Compass icon" />
          </button>

          <button>
            <img src={heartIcon} alt="Heart icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
