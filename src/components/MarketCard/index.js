import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client'

let ensUri = "https://api.thegraph.com/subgraphs/name/victorious-king/fnsdomain"
const ensClient = new ApolloClient({ uri: ensUri, cache: new InMemoryCache() });

const GET_LABEL_NAME = gql`
query Domain($domainId: String!){
  domain(id: $domainId){
    name
    labelName
    labelhash
  }
}
`;

const MarketCard = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  const { data: labelData } = useQuery(GET_LABEL_NAME, { variables: { domainId: item.tokenID }, client: ensClient });
  console.log('labelData', labelData)

  const converPrice = (labelprice) => {
    let price = parseInt(labelprice);
    return (price / 10 ** 18);
    console.log('labelprice', labelprice)
  }
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        <div className={styles.creator}>
          <a href="#" class="title-tip title-tip-up" title="Creator : Creator Name" style={{ objectFit: 'cover' }}>
            <img class="lazy" src="/images/creator.png" alt="" style={{ objectFit: 'cover', width: '100%', borderRadius: '25px', bakcgroundColor: '#0d6efd', padding: '3px', objectPosition: 'top' }} />
          </a>
        </div>
        <img src={'/images/FNS-backimg.png'} alt="Card" style={{ boxShadow: '0px 3px 8px #222222', borderRadius: '8px' }} />
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
      <Link className={styles.link} to={"/item/" + item.tokenID}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{labelData?.domain?.name}</div>
            <div className={styles.weaktitle}>Price</div>
            {/* <div className={styles.price}>{item.price}</div> */}
          </div>
          <div className={styles.line}>
            <div className={styles.title}>monstar</div>
            <div className={styles.weaktitle}>$2</div>
            {/* <div className={styles.price}>{item.price}</div> */}
          </div>
          <div className={styles.line}>
            <div className={styles.title}>Buy</div>
            <div style={{ paddingRight: '60px' }}><a href='/buy' className={styles.buyBtn}>Buy</a></div>
            {/* <div className={styles.price}>{item.price}</div> */}
          </div>
        </div>
        {/* <div className={styles.foot}>
          <div className={styles.status}>
            <Icon name="candlesticks-up" size="20" />
            {item.expiryDate && (<>
              Registration Date <span>{new Intl.DateTimeFormat().format(new Date(parseInt(item.expiryDate, 10) * 1000))}</span>
            </>
            )}
          </div>
          <div
            className={styles.bid}
          >
            Price : <span>{converPrice(item.price)} FTM</span>
          </div>
        </div> */}
      </Link>
    </div>
  );
};

export default MarketCard;
