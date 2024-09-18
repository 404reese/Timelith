import Link from "next/link";
import Links from "./links/Links";
import styles from "./Navbar.module.css";

const Navbar = async () => {
  return (
    <div className={styles.container}>
      <Link className={styles.logo} href="/">
        {/* <img src={logoImage} alt="Timelith Logo" className={styles.logoImage} /> */}
        TIMELITH
      </Link>
      <div>
        <Links session={{}} />
      </div>
    </div>
  );
};

export default Navbar;