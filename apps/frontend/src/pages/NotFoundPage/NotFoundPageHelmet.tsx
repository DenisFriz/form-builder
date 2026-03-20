import { Helmet } from "react-helmet-async";

const NotFoundPageHelmet = () => (
  <Helmet>
    <title>404 Not Found - Page Does Not Exist | MyApp</title>
    <meta
      name="description"
      content="Oops! The page you are looking for does not exist. Check the URL or return to the homepage of MyApp."
    />
    <meta
      name="keywords"
      content="404, not found, page missing, error, MyApp"
    />
    <meta property="og:title" content="404 Not Found | MyApp" />
    <meta
      property="og:description"
      content="The page you are looking for does not exist. Navigate back to the homepage."
    />
    <meta property="og:type" content="website" />
    <meta name="twitter:title" content="404 Not Found | MyApp" />
    <meta
      name="twitter:description"
      content="The page you are looking for does not exist. Navigate back to the homepage."
    />
  </Helmet>
);

export default NotFoundPageHelmet;
