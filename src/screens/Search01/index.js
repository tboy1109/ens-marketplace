import React, { useState } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
import MarketCard from "../../components/MarketCard";
import Dropdown from "../../components/Dropdown";
import { useWallet } from '../../hooks/useWallet';
import { Deed, ENSRegistry, HashRegistrar } from "@ensdomains/ens";
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client'
// data
import { bids } from "../../mocks/bids";
const sha3 = require('js-sha3').keccak_256

let ensUri = "https://api.thegraph.com/subgraphs/name/ensdomains/ens"
const ensClient = new ApolloClient({ uri: ensUri, cache: new InMemoryCache() });

const GET_LABEL_NAME = gql`
query Account($account: String!){
  account(id:$account){
		id
    domains{
      id
      labelhash
      labelName
    }
  }
}
`;

const GET_STATS = gql`
query {
	statsEntity(id:""){
    id
    numOfDeeds
    currentValue
    accumValue
  }
}
`

const GET_ACCOUNTS = gql`
query Account($account: String!){
  account(id:$account){
    id
    deeds {
      id
      value
      name {
        id
      }
    }
  }
}
`
const GET_AUCTIONS = gql`
query AuctionedNamed($first: Int, $skip: Int!){
  auctionedNames (first: $first,skip:$skip,where:{state:"AUCTION"}) {
    id
    bidCount
		registrationDate
    secondBid
  }
}
`
export const GET_SaleItems = gql`
  query getSales($tokenId: BigInt) {
    auctionedNames(first: $first,skip:$skip,where:{state:"AUCTION"}) {
      id
      tokenID
      price
      seller
    }
  }
`;

const navLinks = []// ["All items", "Art", "Game", "Photography", "Music", "Video"];

const dateOptions = ["Newest", "Oldest"];
const likesOptions = ["Most liked", "Least liked"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const creatorOptions = ["Verified only", "All", "Most liked"];




const Search = () => {
  const { connect, active, account, activate, deactivate } = useWallet();

  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [page, setPage] = useState(5);
  const resultPerPage = 21;
  const [search, setSearch] = useState("");

  const [values, setValues] = useState([5]);

  const { data: accountData } = useQuery(GET_ACCOUNTS, { variables: { account } });
  const { data: labelData } = useQuery(GET_LABEL_NAME, { variables: { account }, client: ensClient });
  const { data: { statsEntity } = {} } = useQuery(GET_STATS);
  const { data: auctionednames } = useQuery(GET_SaleItems, { variables: { first: resultPerPage, skip: page * resultPerPage } });
  console.log('auctionednames', auctionednames)
  const handleSubmit = (e) => {
    alert();
  };

  const STEP = 0.1;
  const MIN = 0.01;
  const MAX = 10;

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Type your keywords</div>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search ..."
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
        </div>
        <div className={styles.row}>
          <div className='col-md-3'>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <Dropdown
                  className={styles.dropdown}
                  value={date}
                  setValue={setDate}
                  options={dateOptions}
                />
              </div>
              <div className={styles.nav}>
                {navLinks.map((x, index) => (
                  <button
                    className={cn(styles.link, {
                      [styles.active]: index === activeIndex,
                    })}
                    onClick={() => setActiveIndex(index)}
                    key={index}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className='col-md-9'>
            <div className={styles.row}>
              {/* <div className={styles.filters}>
              <div className={styles.range}>
                <div className={styles.label}>Price range</div>
                <Range
                  values={values}
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  onChange={(values) => setValues(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: "8px",
                          width: "100%",
                          borderRadius: "4px",
                          background: getTrackBackground({
                            values,
                            colors: ["#3772FF", "#E6E8EC"],
                            min: MIN,
                            max: MAX,
                          }),
                          alignSelf: "center",
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "24px",
                        width: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#3772FF",
                        border: "4px solid #FCFCFD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-33px",
                          color: "#fff",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontFamily: "Poppins",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          backgroundColor: "#141416",
                        }}
                      >
                        {values[0].toFixed(1)}
                      </div>
                    </div>
                  )}
                />
                <div className={styles.scale}>
                  <div className={styles.number}>0.01 FTM</div>
                  <div className={styles.number}>10 FTM</div>
                </div>
              </div>
              <div className={styles.group}>
                <div className={styles.item}>
                  <div className={styles.label}>Price</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={likes}
                    setValue={setLikes}
                    options={likesOptions}
                  />
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>Color</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={color}
                    setValue={setColor}
                    options={colorOptions}
                  />
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>Creator</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={creator}
                    setValue={setCreator}
                    options={creatorOptions}
                  />
                </div>
              </div>
              <div className={styles.reset}>
                <Icon name="close-circle-fill" size="24" />
                <span>Reset filter</span>
              </div>
            </div> */}
              <div className={styles.wrapper}>
                <div className={styles.list}>
                  {auctionednames && (
                    auctionednames.auctionedNames.map((x, index) => (
                      <MarketCard className={styles.card} item={x} key={index} />
                    ))
                  )
                  }
                  {auctionednames && (
                    auctionednames.auctionedNames.map((x, index) => (
                      <MarketCard className={styles.card} item={x} key={index} />
                    ))
                  )
                  }
                  {auctionednames && (
                    auctionednames.auctionedNames.map((x, index) => (
                      <MarketCard className={styles.card} item={x} key={index} />
                    ))
                  )
                  }
                  {auctionednames && (
                    auctionednames.auctionedNames.map((x, index) => (
                      <MarketCard className={styles.card} item={x} key={index} />
                    ))
                  )
                  }
                  {auctionednames && (
                    auctionednames.auctionedNames.map((x, index) => (
                      <MarketCard className={styles.card} item={x} key={index} />
                    ))
                  )
                  }
                </div>
                <div className={styles.btns}>
                  <button className={cn("button-stroke", styles.button)} onClick={() => setPage(page + 1)}>
                    <span>Load more</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
