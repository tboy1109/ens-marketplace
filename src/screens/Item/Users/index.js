import React,{useEffect,useState} from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client'

// state:"OFFER"
export const GET_Bids = gql`
  query getBids($tokenId: BigInt) {
    bids(where:{tokenID:$tokenId, state:"OFFER" }, orderBy: price, orderDirection: desc) {
      id
      price
      bidder
    }
  }
`;


const Users = ({ className, itemId, activeIndex, SetMaxBidPrice }) => {

  const { data:bidData } = useQuery(GET_Bids, {variables: { tokenId:itemId }});
  //console.log('bidData',bidData);

  const converPrice = (labelprice) =>{
    let price = parseInt(labelprice);
    return (price/10**18);
  }
  
  useEffect(()=>{
    if(bidData && bidData.bids.length){
      SetMaxBidPrice(converPrice(bidData.bids[0].price))
    }
  },[bidData])

  
  return (
    <div className={cn(styles.users, className)}>
      <div className={styles.list}>
        {bidData&&bidData.bids.map((x, index) => (
          <div className={styles.item} key={index}>
            {/* <div className={styles.avatar}>
              <img src={x.avatar} alt="Avatar" />
              {x.reward && (
                <div className={styles.reward}>
                  <img src={x.reward} alt="Reward" />
                </div>
              )}
            </div> */}
            <div className={styles.details}>
              <div className={styles.position}>{converPrice(x.price)} FTM</div>
              <div className={styles.name}>{x.bidder}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
