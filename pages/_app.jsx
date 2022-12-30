import React, { useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import 'focus-visible';
import { useRouter } from 'next/router';

// Components
import Layout from '@/entity/Layout';
import { store } from '@/redux/store';

// Styles
import '@/app/styles/index.css';
import '@/entity/Header/HeaderGlobal.scss';

function App({ Component, pageProps }) {
  const { headerData, footerData, modalData } = pageProps.layout;
  const resetWindowScrollPosition = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" })

  useEffect(() => {
    window.onbeforeunload = function () {
      resetWindowScrollPosition()
    }
  }, [resetWindowScrollPosition])
  useEffect(() => {
    return resetWindowScrollPosition()
  }, [])

  let header = null

  if (headerData) {
    header = {
      menu:
        headerData?.menu.map((menuElem) => ({
          page: {
            title: menuElem.title,
            uri: menuElem.uri ?? null,
            underline: menuElem.underlineMark ?? null
          },
          children:
            menuElem.children?.map((subMenuElem) => ({
              page: {
                title: subMenuElem.title,
                description: subMenuElem.description,
                icon: subMenuElem.icon?.source ?? '',
                uri: subMenuElem.uri ?? null,
              },
            })) ?? [],
        })) || [],
      bottomLinks: headerData?.bottomLinks || [],
      socials: headerData?.socials || [],
      signIn: headerData?.signIn
    };
  }

  const { data = {}, page = {} } = pageProps;

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page={page} data={data} header={header} footer={footerData} modal={modalData}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
