import React, { useState } from "react";
import cn from "classnames";
import styles from "./PutSale.module.sass";
import Icon from "../../../../components/Icon";
import Switch from "../../../../components/Switch";
import LoaderCircle from "../../../../components/LoaderCircle";

const items = [
  {
    title: "Enter your price",
    value: "FTM",
  },
  // {
  //   title: "Service fee",
  //   value: "1.5%",
  // },
  // {
  //   title: "Total bid amount",
  //   value: "0 ETH",
  // },
];

const PutSale = ({ className, salestatus, handleApprove, handleConfirm, saleprice, SetSalePrice, minprice, SetMinPrice, txstatus }) => {
  //const [price, setPrice] = useState(0);
  const [approve, setApprove] = useState(false);

  return (
    <div className={cn(className, styles.sale)}>
      <div className={cn("h4", styles.title)}>Put on sale</div>
      <div className={styles.line}>
        <div className={styles.icon}>
          <Icon name="coin" size="24" />
        </div>
        <div className={styles.details}>
          <div className={styles.info}> Sale price</div>
          <div className={styles.text}>
            Enter the price for which the item will be sold
          </div>
        </div>
        {/* <Switch className={styles.switch} value={price} setValue={setPrice} /> */}
        
      </div>
      <div className={styles.table}>
      
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            Sale Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <div className={styles.col}>{x.title}</div>
            <div className={styles.col}>{x.value}</div> */}
            <input className={styles.col} placeholder={x.title} type={"number"} value={saleprice} min={0} onChange={(e)=>SetSalePrice(e.target.value)}></input>
            <div className={styles.col}>{x.value}</div>
          </div>
        ))}

        <div className={styles.row}>
          Bid Inc Price &nbsp;&nbsp;
          <input className={styles.col} placeholder={"Enter your price"} type={"number"} value={minprice} min={0} onChange={(e)=>SetMinPrice(e.target.value)}></input>
          <div className={styles.col}>FTM</div>
        </div>
        {txstatus&&(<div className={styles.line}>
        <div className={styles.icon}>
          <LoaderCircle className={styles.loader} />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>Processing</div>
          <div className={styles.text}>
            Transaction Pending...
          </div>
        </div>
      </div>)}
      </div>
      <div className={styles.btns}>
        {salestatus?(<button className={cn("button-stroke", styles.button)} onClick={handleConfirm}>Confirm</button>):(<button className={cn("button", styles.button)} onClick={handleApprove}>Approve</button>)}
        {/* <button className={cn("button", styles.button)} onClick={handleApprove}>Approve</button>
        <button className={cn("button-stroke", styles.button)} onClick={handleConfirm}>Confirm</button> */}
      </div>
    </div>
  );
};

export default PutSale;
