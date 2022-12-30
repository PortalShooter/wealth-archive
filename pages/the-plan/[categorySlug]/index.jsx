import React from 'react';
import {getArticlesByCategoryId, getCategoryById, getPageId} from "@/helpers/getBlogArticles";
import BlogCategory from '@/pages/BlogCategory/BlogCategory';
import {getSanityData} from "@/shared/utils/sanity.utils";
import {getLayoutData} from "@/helpers/getLayoutData";

function SearchResultsPage(props) {

  return <BlogCategory {...props} />;
}

export async function getStaticPaths() {
  const categories = await getSanityData('category', null, false);
  const paths = categories.map( category => {
    return {
      params: {
        categorySlug: category.slug.current ?? ''
      }
    }
  } )

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const { categorySlug } = context.params


  const categoryId = await getPageId('category', categorySlug);

  const articles = await getArticlesByCategoryId(categoryId)
  const category = await getCategoryById(categoryId)
  const data = await getSanityData(
    '',
    `*[_type == "blog"]{
      wantToLearnMore,
      searchResultInscription,
      searchInscriptions,
    }`
  );

  const layout = await getLayoutData();

  const page = {
    menuItemUnderline: 'resources',
  }

  if (category[0]?.seo) {
    page.seo = category[0].seo
  }

  return {
    props: {
      page,
      data,
      layout,
      articles
    },
  };
}

export default SearchResultsPage;
