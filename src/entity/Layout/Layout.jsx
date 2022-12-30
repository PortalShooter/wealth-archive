import React from 'react';
import Head from 'next/head';
import Header from '@/entity/Header';
import { Footer } from '@/entity/Footer';
import { Meta } from './Meta';
import AcceptCookies from "@/feature/AcceptCookies/AcceptCookies";
import { useMobileViewportHeight } from "@/hooks";
import { ModalForm } from '@/pages/Home/sections/OldHero/modalForm';
import { ModalGroup } from "@/shared/modal";
import Script from 'next/script'

function Layout({ page, data, children, header, footer, modal }) {
  useMobileViewportHeight();

  const currentPage = page?.page || page?.seo ? data[page.page] || { seo: page?.seo } : data;

  const { title } = currentPage;
  let { seo } = currentPage;

  if (!seo) {
    seo = {}
  }

  seo.title = seo.title || title || 'Wealth';
  seo.description = seo.description || 'Build Your Wealth, Secure Your Legacy.';

  return (
    <>
      <Meta settings={data.settings} seo={seo} />

      {/*  Floating security logo */}
      <Script strategy="beforeInteractive" async src="https://cdn.ywxi.net/js/1.js" />

      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script strategy="beforeInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-KBPS7YEXJT" />
      <Script strategy="beforeInteractive" dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KBPS7YEXJT');`
      }} />

      {/* Google Tag Manager */}
      <Script strategy="beforeInteractive" dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5TXD29P');`,
      }} />
      {/* End Google Tag Manager */}

      {/* Insights platform - Heap Analytics */}
      <Script dangerouslySetInnerHTML={{
        __html: `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("2155178930");`,
      }} />

      {/* Google Tag Manager (noscript) */}
      <noscript dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5TXD29P"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
        ></iframe>`
      }} />
      {/* End Google Tag Manager (noscript) */}

      {/* Hubspot forms */}
      <Script charset="utf-8"
              type="text/javascript"
              strategy="beforeInteractive"
              src="https://js.hsforms.net/forms/v2.js?pre=1"/>

      <AcceptCookies />
      {
        header && <Header page={page} data={header} />
      }
      <div className={page.pageSlug?`root ${page.pageSlug}`:'root'}>
        {children}
      </div>
      {
        footer && <Footer page={page} data={footer} />
      }
      {
        modal && <ModalGroup>
          <ModalForm page={modal} />
        </ModalGroup>
      }

    </>
  );
}

export default Layout;
