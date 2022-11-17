import React, { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <div className={styles.page}>
      <ToastContainer autoClose={3000}  position={ toast.POSITION.TOP_CENTER}/>
      <Header />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
};

export default withRouter(Page);
