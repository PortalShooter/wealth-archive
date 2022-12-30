import { Container } from "@/feature/Container";
import Link from "next/link";
import styles from './SiteMap.module.scss'
const classNames = require("classnames/bind");
const cn = classNames.bind(styles);


function Sections({ sections }) {
  return sections.map( section => {
    return (
      <div key={section._key} className={ cn('site-map__section') }>
        <h2 className={cn('site-map__section-title')}>{ section.title }</h2>
        <div className={cn('site-map__section-links')}>
          { section.links.map( link => {
            return (
              <div key={link._key}>
                <Link  className={cn('site-map__section-link')} href={link.url}>{ link.linkText }</Link>
              </div>
            )
          } ) }
        </div>
      </div>
    )
  } )
}

function SiteMap({ data }) {
  return (
    <Container className={cn('site-map')}>
      <h1 className={cn('site-map__title')}>{ data.title }</h1>
      <div className={cn('site-map__sections')}>
        <Sections sections={ data.sections }/>
      </div>
    </Container>
  )
}

export default SiteMap
