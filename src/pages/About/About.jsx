import React from 'react';

// Helpers
import {getImgUrl, getImgSize} from "@/shared/utils/sanity.utils";

// Components
import ScrollProvider from "@/feature/ScrollProvider";
import HeroAboutSection from './sections/HeroAboutSection';
import TechnologiesSection from "./sections/TechnologiesSection";
import JoinSection from "./sections/JoinSection";
import IndividuallyAvailableSection from "./sections/IndividuallyAvailableSection";
import PlanningSection from "./sections/PlanningSection";
import PlanningBlockSection from "./sections/PlanningBlockSection";
import DesignedByExperts from "./sections/DesignedByExperts";
import PartneringSection from "./sections/PartneringSection";
import StoriesSection from "./sections/StoriesSection";
import AreWeForYouSection from "./sections/AreWeForYouSection";
import LegalInfo from "@/pages/About/sections/LegalInfo";

function About({ data, stories }) {
  const heroData = {
    ...data.hero,
    image: {
      alt: data.hero.image.alt,
      url: getImgUrl(data.hero.image.image),
      width: 1260,
      height: 704,
    },
  };

  const newTechData = {
    ...data.withNewTechnologies,
    title: data.withNewTechnologies.title.title,
    accentPhrase: data.withNewTechnologies.title.accentPhrase,
    blocks: data.withNewTechnologies.blocks.map((block) => {
      const imageUrl = getImgUrl(block.image.image);
      const { width, height } = getImgSize(block.image.image);

      return {
        title: block.title,
        description: block.description,
        image: {
          alt: block.image.alt,
          width,
          height,
          url: imageUrl,
        },
        partners: block.partners,
      };
    }),
    partnerLogos: data.withNewTechnologies.partnersLogos.map(logo => logo.source)
  };

  const joinData = {
    title: data.joinSection.title.title,
    accentPhrase: data.joinSection.title.accentPhrase,
    link: {
      url: data.joinSection.link.url,
      text: data.joinSection.link.text,
    },
  };

  const individualData = {
    title: data.individuallyAvailable.title.title,
    accentPhrase: data.individuallyAvailable.title.accentPhrase,
    link: {
      url: data.individuallyAvailable.link.url,
      text: data.individuallyAvailable.link.text
    }
  }

  const planningData = {
    title: data.makingEstatePlanning.title,
    description: data.makingEstatePlanning.description,
    images: data.makingEstatePlanning.images.map(imageData => {
      const imageUrl = getImgUrl(imageData.image);
      const {width, height} = getImgSize(imageData.image);

      return {
        alt: imageData.alt,
        width,
        height,
        url: imageUrl
      }
    }),
  }

  const planningBlockData = {
    blocks: data.makingEstatePlanning.blocks.map(block => {
      const imageUrl = getImgUrl(block.image.image);
      const {width, height} = getImgSize(block.image.image);

      return {
        title: block.title,
        description: block.description,
        image: {
          alt: block.image.alt,
          width,
          height,
          url: imageUrl
        }
      }
    }),
  }

  const designData = {
    title: data.designedByExperts.title,
    description: data.designedByExperts.description,
  }

  const partneringData = {
    title: data.employers.title,
    description: data.employers.subtitle,
    link: {
      url: data.employers.link.url,
      text: data.employers.link.text
    }
  }

  const storiesData = {
    title: data.latestStories.title,
    stories: stories?.map(story => {
      const imageUrl = story.mainImage && story.mainImage.image ? getImgUrl(story.mainImage.image) : "";
      const {width, height} = story.mainImage && story.mainImage.image ? getImgSize(story.mainImage.image) : {width:0, height: 0};
      const publishedDate = new Date(story.publishedAt)
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const publishedAt = story.publishedAt ? `${months[publishedDate.getMonth()]} ${publishedDate.getDate()}, ${publishedDate.getFullYear()}` : null;
      const readTime = story.readTime ? `${story.readTime} min read` : null;

      return {
        category: story.category?.title || '',
        articleId: story._id,
        articleSlug: story.slug.current,
        categoryId: story.category._id,
        categorySlug: story.category.slug.current,
        title: story.title,
        publishedAt,
        readTime,
        layout: story.mainImage && story.mainImage.image  ? "normal" : "imageless",
        image: {
          alt: story.mainImage && story.mainImage.alt || '',
          width,
          height,
          url: imageUrl
        }
      }
    })
  }

  const areWeForYouData = {
    title: data.areWeForYou.title,
    secondTitle: data.areWeForYou.secondTitle,
    description: data.areWeForYou.description,
    mainImage: {
      alt: data.areWeForYou.mainImage.alt || '',
      url: getImgUrl(data.areWeForYou.mainImage.image)
    },
    avatars: data.areWeForYou.avatars.map(avatar => {
      const imageUrl = getImgUrl(avatar.image);
      const {width, height} = getImgSize(avatar.image);

      return {
        url: imageUrl,
        width,
        height,
        alt: avatar.alt || ''
      }
    }),
    cta_link: data.areWeForYou.cta_link
  }

  const legalInfoData = {
    link: data.legalInfo.link,
    text: data.legalInfo.text
  }

  return <>
    <ScrollProvider mobileDisable={1024} >
      <PlanningSection data={planningData} isAbout/>
    </ScrollProvider>
    <DesignedByExperts data={designData}/>
    <HeroAboutSection data={heroData}/>
    <TechnologiesSection data={newTechData}/>
    <PlanningBlockSection data={planningBlockData}/>
    <AreWeForYouSection data={areWeForYouData}/>
    <PartneringSection data={partneringData}/>
    <IndividuallyAvailableSection data={individualData}/>
    {/*{stories && (<StoriesSection data={storiesData}/>)}*/}
    <JoinSection data={joinData}/>
    <LegalInfo data={legalInfoData}/>
  </>
}

export default About;
