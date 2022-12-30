// header
import layout from './layout';

// about page
import about from './pages/about';

// home page
import home from './pages/home';

// pricing page
import pricing from './pages/pricing';

// solutions page
import solutions from './pages/solutions';

// security page
import security from './pages/security';

// companies page
import companies from './pages/companies';

// advisers page
import advisers from './pages/advisers';

// not found page
import notFound from './pages/not-found';

// error page
import errorPage from './pages/error';

// site map
import siteMap from './pages/site-map';

// blog page
import blog from './pages/blog';

// help page
import help from './pages/help';

// product page
import product from './pages/product';

// careers page
import careers from './pages/careers';

// partnerships page
import partnerships from './pages/partnerships';

// other
import shared from './shared';

export default [
  ...layout,
  ...home,
  ...solutions,
  ...pricing,
  ...companies,
  ...advisers,
  ...about,
  ...careers,
  ...partnerships,
  ...security,
  ...blog,
  ...product,
  ...help,
  ...errorPage,
  ...notFound,
  ...siteMap,
  ...shared,
];
