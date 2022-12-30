import React from 'react';
import { getPages } from '@/api/requests/getAllPages';
import { additionalDataByType, additionalDataDefault } from '@/api/additioanalPageData';
import { pagesByType } from '@/pages';
import NotFoundPage from './404';
import {getLayoutData} from "@/helpers/getLayoutData";

const generateSiteMap = (pages) => {
  const fs = require('fs');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
    .map((page) => `
    <url>
      <loc>${process.env.BASE_URL.replace(/\/$/, '')}${page.url}</loc>
      <lastmod>${page.last_modified}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>`)
    .join('')}
  </urlset>
`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
};

export const getStaticPaths = async () => {
  const pages = await getPages();

  generateSiteMap(pages);

  const paths = pages
    .filter((entry) => entry.uri !== '/')
    .map((entry) => ({
        params: {
          uri: entry.uri.split('/').splice(1),
        },
      }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const urlParams = new URLSearchParams();

  const uri = `/${  params.uri.join('/')}`;

  urlParams.append('filter[uri]', uri);
  urlParams.append('filter[published]', 'true');

  const layout = await getLayoutData();

  try {
    const response = await fetch(`${process.env.API_URL}collections/pages/entries?${urlParams}`);
    const pageJson = await response.json();
    const page = pageJson.data[0];

    const type = page.blueprint.handle;
    const additionalDataRequests = { ...additionalDataDefault, ...additionalDataByType[type] };
    const data = {};

    for (const key of Object.keys(additionalDataRequests)) {
      data[key] = await additionalDataRequests[key]();
    }

    return {
      props: {
        page,
        type,
        data,
        layout
      },
    };
  } catch(error) {
    return {
      props: {
        page: null,
        type: '404',
        data: {},
        layout
      },
    };
  }
};

export function Page({ page, type, data }) {
  const Template =  page && pagesByType[type] ? pagesByType[type] : NotFoundPage;

  if (!page) {
    return <NotFoundPage page={null} data={null} />;
  }
    return <Template page={page} data={data} />;
}

export default Page;
