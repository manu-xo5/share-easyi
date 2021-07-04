import React from "react";
import s from "../../styles/footer.module.css";

function Footer() {
  return (
    <footer>
      <ul className={s.linkList}>
        <li>
          <a href="/about">About</a>
        </li>

        <li>
          <a href="//github.com/manu-xo5/share-easy">Github</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
