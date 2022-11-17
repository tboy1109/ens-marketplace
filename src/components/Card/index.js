import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client'

// let ensUri = "https://api.thegraph.com/subgraphs/name/ensdomains/ens"
// const ensClient = new ApolloClient({ uri: ensUri,cache: new InMemoryCache() });

// const GET_LABEL_NAME = gql`
// query Domain($labelhash: String!){
//   domains(where: {labelhash:$labelhash}) {
//     id
//     name
//     labelName
//     labelhash
//   }
// }
// `;

const Card = ({ className, item }) => {
  const [visible, setVisible] = useState(false);
  
  //const { data:labelData } = useQuery(GET_LABEL_NAME, {variables: { labelhash:item.id }, client:ensClient});
  // console.log('labelData',labelData)
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        <img src={'/images/FNS-backimg.png'} alt="Card" />
        <div className={styles.control}>
          {/* <div
            className={cn(
              { "status-green": item.category === "green" },
              styles.category
            )}
          >
            {item.categoryText}
          </div>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="heart" size="20" />
          </button> 
          <button className={cn("button-small", styles.button)}>
            <Link  to={"/item/"+item.id}>
             <span>Place a bid</span>
            <Icon name="scatter-up" size="16" /> 
            </Link>
          </button>*/}
        </div>
      </div>
      <Link className={styles.link} to={"/item/"+item?.domain?.id}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item?.domain?.name}</div>
            {/* <div className={styles.price}>{item.price}</div> */}
          </div>
          <div className={styles.line}>
            {/* <div className={styles.users}>
              {item.users.map((x, index) => (
                <div className={styles.avatar} key={index}>
                  <img src={x.avatar} alt="Avatar" />
                </div>
              ))}
            </div>
            <div className={styles.counter}>{item.counter}</div> */}
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            <Icon name="candlesticks-up" size="20" />
            {item.expiryDate&&(<>
            Registration Date <span>{new Intl.DateTimeFormat().format(new Date(parseInt(item.expiryDate,10)*1000))}</span>
            </>
            )}
          </div>
          <div
            className={styles.bid}
          >
            Bid Count : <span>{item.bidCount}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
