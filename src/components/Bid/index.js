import React from "react";
import cn from "classnames";
import styles from "./Bid.module.sass";

const items = [
  {
    title: "Enter bid",
    value: "FTM",
  },
  // {
  //   title: "Your balance",
  //   value: "8.498 ETH",
  // },
  // {
  //   title: "Service fee",
  //   value: "0 ETH",
  // },
  // {
  //   title: "Total bid amount",
  //   value: "0 ETH",
  // },
];

const Bid = ({ className, handleBid, bidprice, SetBidPrice, incPrice, maxbidprice }) => {
  

  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn("h4", styles.title)}>Place a bid</div>
      <div className={styles.info}>
        You need to set minimum bid price higher than <strong>{maxbidprice}+{incPrice} FTM</strong>
      </div>
      <div className={styles.stage}>Your bid</div>
      <div className={styles.table}>
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            {/* <div className={styles.col}>{x.title}</div> */}
            <input className={styles.col} placeholder={x.title} type={"number"} value={bidprice} onChange={(e)=>SetBidPrice(e.target.value)}></input>
            <div className={styles.col} >{x.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={handleBid}>Place a bid</button>
        {/* <button className={cn("button-stroke", styles.button)}>Cancel</button> */}
      </div>
    </div>
  );
};

export default Bid;
