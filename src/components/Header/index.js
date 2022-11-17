import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import { useWallet } from '../../hooks/useWallet';
import { useWalletModal } from '../../hooks/useWalletModal';

const nav = [
  // {
  //   url: "/search01",
  //   title: "Discover",
  // },
  // {
  //   url: "/faq",
  //   title: "How it work",
  // },
  // {
  //   url: "/item",
  //   title: "Create item",
  // },
  // {
  //   url: "/profile",
  //   title: "Profile",
  // },
];

const Headers = () => {
  const { connect, active, account, activate, deactivate } = useWallet();
  const { toggleOpen, open } = useWalletModal();
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");

  const handleConnect = async (key) => {
    try {
      await connect(key);
      toggleOpen()
    } catch (err) {
      console.log({ err });
    }
  };
  const handleSubmit = (e) => {
    alert();
  };

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <img src="/images/color-logo.png" className={styles.mainlogo} />
          <span className={styles.companyName}>FANTOM</span>
        </Link>

        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav>
          {/* <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form> */}
        </div>
        {/*
        <Notification className={styles.notification} />
        <Link
          className={cn("button-small", styles.button)}
          to="/upload-variants"
        >
          Upload
        </Link> */}
        {!active ? (
          <Link
            className={cn("button-stroke button-small", styles.button)}
            to="/#"
            onClick={() => handleConnect('injected')}
          >
            Connect Wallet
          </Link>) :
          <User className={styles.user} account={account} deactivate={deactivate} />}
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
