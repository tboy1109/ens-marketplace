import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import cn from "classnames";
import styles from "./MyItem.module.sass";
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

const navLinks = []//["Info", "History", "Bids"];

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

const MyItem = () => {
  const { itemId } = useParams();
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const { connect, active, account, activate, deactivate } = useWallet();
  const { data:labelData } = useQuery(GET_DOMAINS, {variables: { tokenId:itemId }, client:ensClient});

  useEffect(()=>{
    // console.log('labelData',labelData?.domain.length==0)
    // if(labelData?.domains.length==0)
    //     history.push('/');
  },[labelData])
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
              {/* <div className={cn("status-stroke-green", styles.price)}>
                2.5 FTM
              </div> */}
              {/* <div className={cn("status-stroke-black", styles.price)}>
                $4,429.87
              </div>
              <div className={styles.counter}>10 in stock</div> */}
            </div>
            <div className={styles.info}>
              {/* This NFT Card will give you Access to Special Airdrops.
               */}
            </div>
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
            {/* <Users className={styles.users} items={users} /> */}
            <Control className={styles.control} owner={labelData?.domain.owner.id==account} hash={itemId}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyItem;
