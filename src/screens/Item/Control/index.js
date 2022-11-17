import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import cn from "classnames";
import styles from "./Control.module.sass";
import Checkout from "./Checkout";
import Connect from "../../../components/Connect";
import Bid from "../../../components/Bid";
import Accept from "./Accept";
import PutSale from "./PutSale";
import SuccessfullyPurchased from "./SuccessfullyPurchased";
import Modal from "../../../components/Modal";
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import { useWallet } from '../../../hooks/useWallet';
import { getContractHash, getContractFTM, FTMBaseRegistrarAddress, AuctionRegistrarAddress } from '../../../utils/getContract';


const sha3 = require('js-sha3').keccak_256


const Control = ({ className, owner, hash, myitem, maxbidprice, incPrice, itemPrice }) => {
  
  const { connect, active, account, activate, deactivate,library } = useWallet();

  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);

  const [marketcontract, setMarketContract] = useState(null);
  const [ftmcontract, setFtmContract] = useState(null);
  const history = useHistory();
  //sale
  const [saleprice, SetSalePrice] = useState(0);
  const [salestatus, SetSaleStatus] = useState(false);
  const [minprice, SetMinPrice] = useState(0);

  //const [itemPrice, SetItemPrice] = useState(0);
  // const [incPrice, SetIncPrice] = useState(0);

  //bid
  const [bidprice, SetBidPrice] = useState(0);

  //pending tx
  const [txstatus, SetTxStatus] = useState(false);

  console.log('myitem',myitem)
  

  const handleApprove = async() => {
    try{
     SetTxStatus(true)
     const response = await ftmcontract.approve(AuctionRegistrarAddress, hash)
     await response.wait(r =>{
      console.log(r)
     }).catch(e => console.log(e))
     
     SetSaleStatus(true)
     SetTxStatus(false)

    } catch(e){
      SetTxStatus(false)
      console.log(e)
      toast.error(e?.data?.message);
    }
  }

  const handleConfirm = async() => {
    try{
      
      if(saleprice<=0) {
        alert('Price should be bigger than zero')
        return;
      }
      SetTxStatus(true)
      const response = await marketcontract.createOrder(FTMBaseRegistrarAddress, hash, ethers.utils.parseEther(saleprice.toString()), ethers.utils.parseEther(minprice.toString()))
      await response.wait(r =>{
        console.log(r)
       }).catch(e => console.log(e))
      SetTxStatus(false)
      history.push("/")
    } catch(e){
      SetTxStatus(false)
      console.log(e)
      toast.error(e?.data?.message);
    }
  }

  const handleAccept = async() => {
    try{
      await marketcontract.acceptBid(FTMBaseRegistrarAddress, hash)
    } catch(e){
      console.log(e)
      toast.error(e?.data?.message);
    }
  }
  
  const handleCancel = async() => {
    try{
      await marketcontract.cancelOrder(FTMBaseRegistrarAddress, hash)
    } catch(e){
      console.log(e)
      toast.error(e?.data?.message);
    }
  }
  
  const handleCancelBid = async() => {
    try{
      await marketcontract.cancelBid(FTMBaseRegistrarAddress, hash)
    } catch(e){
      console.log(e)
      toast.error(e?.data?.message);
    }
  }

  const handlePurchase = async() => {
    try{
      let overrides = {
        value: ethers.utils.parseEther(itemPrice.toString()),
      };
      await marketcontract.safeExecuteOrder(FTMBaseRegistrarAddress, hash, ethers.utils.parseEther(itemPrice.toString()),overrides)
    } catch(e){
      console.log(e)
      toast.error(e?.data?.message);
    }
  }

  const handleBid = async () => {
    if(!marketcontract) return;
    
    if(bidprice<=0 || bidprice < (incPrice + maxbidprice)) {
      toast.error("You have to input right amount");
      return;
    }
    let overrides = {
      value: ethers.utils.parseEther((bidprice).toString()),
    };
    try{
      await marketcontract.safePlaceBid(FTMBaseRegistrarAddress, hash, overrides);
    }catch(e){
      toast.error(e?.data?.message);
    }
  }


  useEffect(async ()=>{
    if(library){
      let ftmregistrar = getContractFTM(library.getSigner(account))
    
      if(ftmregistrar)
      setFtmContract(ftmregistrar)

      let nftmarket = getContractHash(library.getSigner(account))
      
      if(nftmarket)
        setMarketContract(nftmarket)

    
    }
  },[library]);



  return (
    <>
      <div className={cn(styles.control, className)}>
        <div className={styles.head}>
          {/* <div className={styles.avatar}>
            <img src="/images/content/avatar-4.jpg" alt="Avatar" />
          </div> */}
          {/* <div className={styles.details}>
            <div className={styles.info}>
              Highest bid by <span>Kohaku Tora</span>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>{bidprice} FTM</div>
              <div className={styles.price}>$2,764.89</div>
            </div>
          </div> */}
        </div>
        {!owner?(<><div className={styles.btns}>
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModalPurchase(true)}
          >
            Purchase now
          </button>
          <button
            className={cn("button-stroke", styles.button)}
            onClick={() => setVisibleModalBid(true)}
          >
            Place a bid
          </button>
        </div>
        <div className={styles.btns}>
            <button
                className={cn("button-stroke", styles.button)}
                onClick={() => handleCancelBid()}
              >
              Cancel a bid
            </button>
          </div></>):!myitem||myitem?.length==0?(
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModalSale(true)}
          >
            Put on sale
          </button>
        ):(<div className={styles.btns}>
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
		  <button
            className={cn("button", styles.button)}
            onClick={() => handleCancel()}
          >
            Cancel
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
        <Checkout handlePurchase={handlePurchase} itemPrice={itemPrice} />
        {/* <SuccessfullyPurchased /> */}
      </Modal>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        {!active&&(<Connect />)}
        <Bid handleBid={handleBid} bidprice={bidprice} SetBidPrice={SetBidPrice} incPrice={incPrice} maxbidprice={maxbidprice}/>
      </Modal>
      <Modal
        visible={visibleModalAccept}
        onClose={() => setVisibleModalAccept(false)}
      >
        <Accept handleAccept={handleAccept}/>
      </Modal>
      <Modal
        visible={visibleModalSale}
        onClose={() => setVisibleModalSale(false)}
      >
        <PutSale salestatus={salestatus} handleApprove={handleApprove} handleConfirm={handleConfirm} saleprice={saleprice} SetSalePrice={SetSalePrice} minprice={minprice} SetMinPrice={SetMinPrice} txstatus={txstatus}/>
      </Modal>
    </>
  );
};

export default Control;
