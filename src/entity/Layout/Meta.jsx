import React from "react";
import Head from 'next/head';
import OpenGraphImage from "~/public/images/OpenGraph.png"
import favicon16 from "~/public/images/favicon-16x16.png"
import favicon32 from "~/public/images/favicon-32x32.png"
import appleTouchIcon from "~/public/images/apple-touch-icon.png"

export function Meta({settings, seo}) {
  const metaTitle = seo.title;

  const metaDescription =
    seo.description || settings?.meta_description_default || "";

  const metaImage =
    settings && settings.meta_social_image
      ? settings.meta_social_image.permalink
      : OpenGraphImage.src;

  const metaImageWidth =
    settings && settings.meta_social_image
      ? settings.meta_social_image.width
      : OpenGraphImage.width;

  const metaImageHeight =
    settings && settings.meta_social_image
      ? settings.meta_social_image.height
      : OpenGraphImage.height;

  // const origin = (process.env.BASE_URL as string).replace(/\/$/, "");

  const injectGA = (id) => {
    if (typeof window === "undefined") {
      return;
    }

    window.dataLayer = window.dataLayer || [];

    function gtag(type, id) {
      window.dataLayer.push(arguments);
    }

    gtag("js", new Date());
    gtag("config", id);

    return <></>;
  };

  return (

    <Head>
      <meta charSet='utf-8'/>
      <meta name='theme-color' content='#00534F'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <meta property='og:locale' content='en_EN'/>
      <meta property='og:title' content={metaTitle}/>
      {/* <meta property='og:url' content={origin + (uri || "")} /> */}
      <meta property='og:type' content='website'/>
      <meta property='og:description' content={metaDescription}/>
      <meta property='og:site_name' content={metaTitle}/>
      <meta property='og:image' content={metaImage}/>
      <meta property='og:image:alt' content={metaTitle}/>
      <meta property='og:image:width' content={`${metaImageWidth}`}/>
      <meta property='og:image:height' content={`${metaImageHeight}`}/>
      <meta property='og:image:url' content={metaImage}/>
      <meta property='og:image:secure_url' content={metaImage}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name='twitter:title' content={metaTitle}/>
      <meta name='twitter:description' content={metaDescription}/>
      <meta name='twitter:image' content={metaImage}/>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription}/>

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href={appleTouchIcon.src}
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href={favicon32.src}
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href={favicon16.src}
      />
      {/*<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#00534F' />*/}
      <meta name='msapplication-TileColor' content='#00534F'/>
      <meta name="msapplication-tooltip" content={metaTitle}/>
      <meta name="msapplication-tileimage" content={favicon32.src}/>

      {settings && settings.google_analytics_id && (
        <>
          {/*<script*/}
          {/*  async*/}
          {/*  src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`}*/}
          {/* />*/}
          {/*<script>{injectGA(settings.google_analytics_id)}</script>*/}


        </>
      )}

    </Head>
  )
}
