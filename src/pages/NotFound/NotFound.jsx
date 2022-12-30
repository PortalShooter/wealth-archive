import { Container } from "src/feature/Container";
import {Link} from "@/feature/Link";
import styles from './NotFound.module.scss'
import {PageNotFound} from "@/svgComponents";

const classNames = require("classnames/bind");
const cn = classNames.bind(styles);


function NotFound({ data }) {

  const textContent = data?.textContent

  if (!textContent) return

  return (
    <Container>
      <div className={cn('not-found')}>
        <PageNotFound className={cn('not-found__svg')}/>
        <div className={cn('not-found__text-content')}>
          <h1 className={cn('not-found__title')}>
            <span>{ textContent.titleFirst }</span>
            <span>{ textContent.titleSecond }</span></h1>
          <p className={cn('not-found__description')}>
            <span>{ textContent.descriptionFirst }</span>
            <span>{ textContent.descriptionSecond }</span>
            </p>
          <div>
            <Link href={textContent.url} variant="button-fill" className={cn('not-found__link')}>{ textContent.linkText }</Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default NotFound;
