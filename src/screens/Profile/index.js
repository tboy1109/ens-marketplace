import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Followers from "./Followers";
import { useWallet } from '../../hooks/useWallet';

// data
import { bids } from "../../mocks/bids";
import { isStepDivisible } from "react-range/lib/utils";
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client'
import { ethers } from "ethers";

const ETH_NAMEHASH = '0xef0d8150af51886892faa1bf5f9cb425c4c2194294fbea6519ce2a9cff9fb4d8'; 

let ensUri = "https://api.thegraph.com/subgraphs/name/victorious-king/fnsdomain"
const ensClient = new ApolloClient({ uri: ensUri,cache: new InMemoryCache() });

// export const GET_DOMAINS = gql`
//   query getDomains($tokenId: String) {
//     domain(id: $tokenId) {
//       id
//       labelName
//       labelhash
//       name
//       owner {
//         id
//       }
//       parent {
//         id
//       }
//       resolver {
//         texts
//       }
//     }
//   }
// `;

export const GET_DOMAINS = gql`
  query getDomains($id: ID!, $expiryDate: Int) {
    account(id: $id) {
      registrations(
        where: { expiryDate_gt: $expiryDate }
      ) {
        expiryDate
        domain {
          id
          labelName
          labelhash
          name
          isMigrated
          parent {
            name
          }
        }
      }
    }
  }
`;

export const GET_DOMAINS_BY_LABELHASH = gql`
  query getDomains($tokenId: String) {
    domains(
      where: {
        parent: "${ETH_NAMEHASH}",
        labelhash: $tokenId
      }
    ) {
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

export const GET_REGISTRATIONS = gql`
  query getRegistration($labelhash: String) {
    registrations(
      orderBy: registrationDate
      orderDirection: desc
      where: { id: $labelhash }
    ) {
      labelName
      registrationDate
      expiryDate
    }
  }
`;

const navLinks = [
  "Owned",
  // "On Sale",
  // "Collectibles",
  // "Likes",
  // "Following",
  // "Followers",
];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
];

// const following = [
//   {
//     name: "Sally Fadel",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-5.jpg",
//     url: "https://ui8.net",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "/images/content/follower-pic-1.jpg",
//       "/images/content/follower-pic-2.jpg",
//       "/images/content/follower-pic-3.jpg",
//       "/images/content/follower-pic-4.jpg",
//     ],
//   },
//   {
//     name: "Aniya Harber",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-6.jpg",
//     url: "https://ui8.net",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "/images/content/follower-pic-5.jpg",
//       "/images/content/follower-pic-6.jpg",
//       "/images/content/follower-pic-1.jpg",
//       "/images/content/follower-pic-3.jpg",
//     ],
//   },
//   {
//     name: "Edwardo Bea",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-7.jpg",
//     url: "https://ui8.net",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "/images/content/follower-pic-4.jpg",
//       "/images/content/follower-pic-1.jpg",
//       "/images/content/follower-pic-3.jpg",
//       "/images/content/follower-pic-6.jpg",
//     ],
//   },
//   {
//     name: "Reymundo",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-8.jpg",
//     url: "https://ui8.net",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "/images/content/follower-pic-5.jpg",
//       "/images/content/follower-pic-2.jpg",
//       "/images/content/follower-pic-6.jpg",
//       "/images/content/follower-pic-1.jpg",
//     ],
//   },
//   {
//     name: "Jeanette",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-9.jpg",
//     url: "https://ui8.net",
//     buttonClass: "stroke",
//     buttonContent: "Unfollow",
//     gallery: [
//       "/images/content/follower-pic-1.jpg",
//       "/images/content/follower-pic-3.jpg",
//       "/images/content/follower-pic-5.jpg",
//       "/images/content/follower-pic-4.jpg",
//     ],
//   },
// ];

// const followers = [
//   {
//     name: "Sally Fadel",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-5.jpg",
//     url: "https://ui8.net",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "/images/content/follower-pic-1.jpg",
//       "/images/content/follower-pic-2.jpg",
//       "/images/content/follower-pic-3.jpg",
//       "/images/content/follower-pic-4.jpg",
//     ],
//   },
//   {
//     name: "Aniya Harber",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-6.jpg",
//     url: "https://ui8.net",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "/images/content/follower-pic-5.jpg",
//       "/images/content/follower-pic-6.jpg",
//       "/images/content/follower-pic-1.jpg",
//       "/images/content/follower-pic-3.jpg",
//     ],
//   },
//   {
//     name: "Edwardo Bea",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-7.jpg",
//     url: "https://ui8.net",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "/images/content/follower-pic-4.jpg",
//       "/images/content/follower-pic-1.jpg",
//       "/images/content/follower-pic-3.jpg",
//       "/images/content/follower-pic-6.jpg",
//     ],
//   },
//   {
//     name: "Reymundo",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-8.jpg",
//     url: "https://ui8.net",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "/images/content/follower-pic-5.jpg",
//       "/images/content/follower-pic-2.jpg",
//       "/images/content/follower-pic-6.jpg",
//       "/images/content/follower-pic-1.jpg",
//     ],
//   },
//   {
//     name: "Jeanette",
//     counter: "161 followers",
//     avatar: "/images/content/avatar-9.jpg",
//     url: "https://ui8.net",
//     buttonClass: "blue",
//     buttonContent: "Follow",
//     gallery: [
//       "/images/content/follower-pic-1.jpg",
//       "/images/content/follower-pic-3.jpg",
//       "/images/content/follower-pic-5.jpg",
//       "/images/content/follower-pic-4.jpg",
//     ],
//   },
// ];

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const { connect, active, account, activate, deactivate } = useWallet();
  const currentEpoch = Math.round(Date.now() / 1000) ;
  //console.log('account',ethers.utils.getAddress(account))
  const { data:domainData } = useQuery(GET_DOMAINS, {variables: { id:account?.toLowerCase(), expiryDate: currentEpoch }, client:ensClient});

  console.log('domainData',domainData)
  useEffect(()=>{
    
    
  },[account])
  return (
    <div className={styles.profile}>
      {/* <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage: "url(/images/content/bg-profile.jpg)",
        }}
      >
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => setVisible(true)}
            >
              <span>Edit cover photo</span>
              <Icon name="edit" size="16" />
            </button>
            <Link
              className={cn("button-stroke button-small", styles.button)}
              to="profile-edit"
            >
              <span>Edit profile</span>
              <Icon name="image" size="16" />
            </Link>
          </div>
          <div className={styles.file}>
            <input type="file" />
            <div className={styles.wrap}>
              <Icon name="upload-file" size="48" />
              <div className={styles.info}>Drag and drop your photo here</div>
              <div className={styles.text}>or click to browse</div>
            </div>
            <button
              className={cn("button-small", styles.button)}
              onClick={() => setVisible(false)}
            >
              Save photo
            </button>
          </div>
        </div>
      </div> */}
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          {/* <User className={styles.user} item={socials} /> */}
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && domainData &&(
                  <Items class={styles.items} items={domainData.account?.registrations} />
                )}
                {activeIndex === 1 && (
                  <Items class={styles.items} items={domainData?.account?.registrations} />
                )}
                {activeIndex === 2 && (
                  <Items class={styles.items} items={bids.slice(0, 2)} />
                )}
                {activeIndex === 3 && (
                  <Items class={styles.items} items={bids.slice(0, 3)} />
                )}
                {/* {activeIndex === 4 && (
                  <Followers className={styles.followers} items={following} />
                )}
                {activeIndex === 5 && (
                  <Followers className={styles.followers} items={followers} />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
