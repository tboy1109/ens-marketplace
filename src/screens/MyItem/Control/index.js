import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Control.module.sass";
import Checkout from "./Checkout";
import Connect from "../../../components/Connect";
import Bid from "../../../components/Bid";
import Accept from "./Accept";
import PutSale from "./PutSale";
import SuccessfullyPurchased from "./SuccessfullyPurchased";
import Modal from "../../../components/Modal";
import { useWallet } from '../../../hooks/useWallet';
import { getContractHash } from '../../../utils/getContract';


const sha3 = require('js-sha3').keccak_256


const Control = ({ className, owner, hash }) => {
  
  const { connect, active, account, activate, deactivate,library } = useWallet();

  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);

  const [contract, setContract] = useState(null);

  //bid
  const [bidprice, SetBidPrice] = useState(0);

  useEffect(async ()=>{
    if(library){
    let nft = getContractHash(library.getSigner(account))
    
    if(nft)
    
      setContract(nft)
    }
  },[library]);

  const handleBid = async () => {
    if(!contract) return;
    

    // let nftContract = new ethers.Contract(
    //   "0xB0815F5eE373bE63Bd5a91900F752546bb2f15C8",
    //   AuctionRegistrarAbi,
    //   library.getSigner(account)
    // );
    await contract.newBid("0x234234234f");
    
    try{
      let shabid = ""//await contract.shaBid(hash,account,bidprice,"0x01")
      await contract.newBid(shabid);
    }catch(e){
      console.log(e)
    }
  }

  return (
    <>
      <div className={cn(styles.control, className)}>
        <div className={styles.head}>
          {/* <div className={styles.avatar}>
            <img src="/images/content/avatar-4.jpg" alt="Avatar" />
          </div> */}
          <div className={styles.details}>
            {/* <div className={styles.info}>
              Highest bid by <span>Kohaku Tora</span>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>1.46 FTM</div>
              <div className={styles.price}>$2,764.89</div>
            </div> */}
          </div>
        </div>
        {!owner?(<div className={styles.btns}>
          {/* <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModalPurchase(true)}
          >
            Purchase now
          </button>
          */}
          
          <button
            className={cn("button-stroke", styles.button)}
            onClick={() => setVisibleModalBid(true)}
          >
            Place a bid
          </button> 
        </div>):(<div className={styles.btns}>
          {/* <button className={cn("button-stroke", styles.button)}>
            View all
          </button>
          */}
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModalAccept(true)}
          >
            Accept
          </button> 
        </div>)}
        
        
        {/* <div className={styles.text}>
          Service fee <span className={styles.percent}>1.5%</span>{" "}
          <span>2.563 ETH</span> <span>$4,540.62</span>
        </div> */}
        {/* <div className={styles.foot}>
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModalSale(true)}
          >
            Put on sale
          </button>
        </div> */}
        {/* <div className={styles.note}>
          You can sell this token on Crypter Marketplace
        </div> */}
      </div>
      <Modal
        visible={visibleModalPurchase}
        onClose={() => setVisibleModalPurchase(false)}
      >
        <Checkout />
        <SuccessfullyPurchased />
      </Modal>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        {!active&&(<Connect />)}
        <Bid handleBid={handleBid} bidprice={bidprice} SetBidPrice={SetBidPrice} />
      </Modal>
      <Modal
        visible={visibleModalAccept}
        onClose={() => setVisibleModalAccept(false)}
      >
        <Accept />
      </Modal>
      <Modal
        visible={visibleModalSale}
        onClose={() => setVisibleModalSale(false)}
      >
        <PutSale />
      </Modal>
    </>
  );
};

export default Control;
