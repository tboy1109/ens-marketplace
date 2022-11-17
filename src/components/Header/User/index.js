import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";

const items = [
  // {
  //   title: "My profile",
  //   icon: "user",
  //   url: "/profile",
  // },
  {
    title: "My Domains",
    icon: "image",
    url: "/user",
  },
  {
    title: "Dark theme",
    icon: "bulb",
  },
  {
    title: "Disconnect",
    icon: "exit",
    url: "https://ui8.net/ui8/products/crypter-nft-marketplace-ui-kit",
  },
];

const User = ({ className, account, deactivate }) => {
  const [visible, setVisible] = useState(false);
  
  const simpleShow = (address)=>{
    if(address)
      return address.substr(0, 6) + " ... " + address.substr(-4) 
    else return ""
  }

  const walletDisConnectPrc = () => {
    setVisible(!visible);
    deactivate()
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            
          </div>
          <div className={styles.wallet}>
            {simpleShow(account)}
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.menu}>
              {items.map((x, index) =>
                x.url ? (
                  x.url.startsWith("http") ? (
                    <Link
                      className={styles.item}
                      rel="noopener noreferrer"
                      key={index}
                      onClick={walletDisConnectPrc}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </Link>
                  ) : (
                    <Link
                      className={styles.item}
                      to={x.url}
                      onClick={() => setVisible(!visible)}
                      key={index}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </Link>
                  )
                ) : (
                  <div className={styles.item} key={index}>
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
                    <Theme className={styles.theme} />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default User;
