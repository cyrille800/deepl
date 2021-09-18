import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { store } from "../store";
import { Provider } from "react-redux";
import React from 'react';

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <React.StrictMode> 
      <ReactNotification />
      <Component {...pageProps} />
      </React.StrictMode>
    </Provider>
  );
}

export default MyApp;
