import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import { useWallet } from '../../hooks/useWallet';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client'

let ensUri = "https://api.thegraph.com/subgraphs/name/victorious-king/fnsdomain"
const ensClient = new ApolloClient({ uri: ensUri,cache: new InMemoryCache() });

export const GET_DOMAINS = gql`
  query getDomains($tokenId: String) {
    domain(id: $tokenId) {
      id
      labelName
      labelhash
      name
      owner {
        id
      }
      parent {
        id
      }
      resolver {
        texts
      }
    }
  }
`;

export const GET_HashItem = gql`
  query getHashItem($tokenId: String) {
    nfts(first: 1,where:{tokenID:$tokenId}) {
      id
      tokenID
      owner
      expiryDate
    }
  }
`;

export const GET_SaleItems = gql`
  query getSales($tokenId: BigInt) {
    auctionedNames(where:{assertId:$tokenId, state:"AUCTION"}) {
      id
      price
      minBidPrice
      seller
    }
  }
`;


const navLinks = ["Bids log"]//["Info", "History", "Bids"];

const categories = [
  // {
  //   category: "black",
  //   content: "art",
  // },
  // {
  //   category: "purple",
  //   content: "unlockable",
  // },
];

const users = [
  {
    name: "Raquel Will",
    position: "Owner",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "Selina Mayert",
    position: "Creator",
    avatar: "/images/content/avatar-1.jpg",
  },
];

const Item = () => {
  const { itemId } = useParams();
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const { connect, active, account, activate, deactivate } = useWallet();
  const { data:labelData } = useQuery(GET_DOMAINS, {variables: { tokenId:itemId }, client:ensClient});
  const { data:hashData } = useQuery(GET_HashItem, {variables: { tokenId:itemId.toString() } });
  const { data:saleData } = useQuery(GET_SaleItems, {variables: { tokenId:hashData?.nfts[0].id||0 } });

  const [itemPrice, SetItemPrice] = useState(0);
  const [incPrice, SetIncPrice] = useState(0);
  const [maxbidprice, SetMaxBidPrice] = useState(1);

  console.log('hashData',hashData)
  console.log('saleData',saleData)

  const converPrice = (labelprice) =>{
    let price = parseInt(labelprice);
    return (price/10**18);
    console.log('labelprice',labelprice)
  }
  useEffect(()=>{
    // console.log('labelData',labelData?.domain.length==0)
    // if(labelData?.domains.length==0)
    //     history.push('/');
    if(saleData && saleData.auctionedNames.length){
      SetItemPrice(converPrice(saleData.auctionedNames[0].price))
      SetIncPrice(converPrice(saleData.auctionedNames[0].minBidPrice))
    }
  },[saleData])
  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                {categories.map((x, index) => (
                  <div
                    className={cn(
                      { "status-black": x.category === "black" },
                      { "status-purple": x.category === "purple" },
                      styles.category
                    )}
                    key={index}
                  >
                    {x.content}
                  </div>
                ))}
              </div>
              <img
                src="/images/FNS-backimg.png"
                alt="Item"
              />
            </div>
            {/* <Options className={styles.options} /> */}
          </div>
          <div className={styles.details}>
          <h1 className={cn("h3", styles.title)}>{labelData?.domain?.name}</h1>
            <div className={styles.cost}>
              
              <div className={cn("status-stroke-green", styles.price)}>
                 {itemPrice} FTM
              </div>
              {/* <div className={cn("status-stroke-black", styles.price)}>
                $4,429.87
              </div>
              <div className={styles.counter}>10 in stock</div> */}
            </div>
            <div className={styles.info}>
              {/* This NFT Card will give you Access to Special Airdrops.
               */}
            </div>
            <div className={styles.border}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            <Users className={styles.users} itemId={itemId} activeIndex={activeIndex} SetMaxBidPrice={SetMaxBidPrice} />
            </div>
            <Control className={styles.control} owner={labelData?.domain.owner.id==account?.toLowerCase()} hash={hashData?.nfts[0].id} myitem={saleData?.auctionedNames} maxbidprice={maxbidprice} incPrice={incPrice}  itemPrice={itemPrice}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
