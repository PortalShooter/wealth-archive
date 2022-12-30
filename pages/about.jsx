import React, {useEffect} from "react";
import About from "@/pages/About";
import {getSanityData} from "@/shared/utils/sanity.utils";
import {getArticlesByTitle} from "@/helpers";
import {getLayoutData} from "@/helpers/getLayoutData";

function AboutPage(props) {
  useEffect( () => { document.querySelector("body").classList.add("about") } );

  return <About {...props}/>
}
export async function getStaticProps() {
  const data = await getSanityData('', `*[_type == "about"]{
    hero,
    withNewTechnologies,
    joinSection,
    individuallyAvailable,
    makingEstatePlanning,
    designedByExperts,
    employers,
    seo,
    latestStories {
      title,
      stories[]->{
        title,
        "image": mainImage,
        publishedAt,
        readTime,
        "category": category->title
      }
    },
    areWeForYou,
    legalInfo
  }`)

  const stories = await getArticlesByTitle('', 0, 2)
  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: 'resources'
      },
      data,
      stories,
      layout
    },
  }
}
export default AboutPage;
