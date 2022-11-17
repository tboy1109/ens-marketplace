import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Form from "../Form";
import Theme from "../Theme";

const items = [
  // {
  //   title: "Crypter.",
  //   menu: [
  //     {
  //       title: "Discover",
  //       url: "/search01",
  //     },
  //     {
  //       title: "Connect wallet",
  //       url: "/connect-wallet",
  //     },
  //   ],
  // },
  // {
  //   title: "Info",
  //   menu: [
  //     {
  //       title: "FAQ",
  //       url: "/faq",
  //     },
  //     {
  //       title: "Create item",
  //       url: "/upload-variants",
  //     },
  //   ],
  // },
];

const Footers = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Link className={styles.logo} to="/">
              <img src="/images/color-logo.png" className={styles.mainlogo} />
              <span className={styles.companyName}>FANTOM</span>
            </Link>
            <div className={styles.info}>Fantom Name Service Economy.</div>
            <div className={styles.version}>
              <div className={styles.details}>Dark theme</div>
              <Theme className="theme-big" />
            </div>
          </div>
          <div className={styles.col}>
            {items.map((x, index) => (
              <Group className={styles.group} item={x} key={index} />
            ))}
          </div>
          <div className={styles.col}>
            <div className={styles.category}>Join Newsletter</div>
            <div className={styles.text}>
              Subscribe our newsletter to get more info and discuss

            </div>
            {/* <Form
              className={styles.form}
              value={email}
              setValue={setEmail}
              onSubmit={() => handleSubmit()}
              placeholder="Enter your email"
              type="email"
              name="email"
            /> */}
            <a href="https://twitter.com/" target="_blank"><svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="inherit"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
            </svg></a>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.copyright}>
            Copyright © 2021 UI8 LLC. All rights reserved
          </div>
          {/* <div className={styles.note}>
            We use cookies for better service. <a href="/#">Accept</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footers;
