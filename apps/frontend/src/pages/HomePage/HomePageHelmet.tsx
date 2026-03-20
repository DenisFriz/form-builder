import { Helmet } from "react-helmet-async";

const HomePageHelmet = () => (
  <Helmet>
    <title>FormBuilder - Create and Manage Online Forms Easily</title>
    <meta
      name="description"
      content="FormBuilder allows you to create, customize, and manage online forms and surveys easily. User-friendly interface for creating questionnaires, collecting responses, and analyzing data."
    />
    <meta
      name="keywords"
      content="online forms, surveys, form builder, questionnaires, create forms, collect responses, FormBuilder"
    />
    <meta
      property="og:title"
      content="FormBuilder - Create and Manage Online Forms Easily"
    />
    <meta
      property="og:description"
      content="Create, customize, and manage online forms and surveys easily with FormBuilder. Collect responses and analyze data effortlessly."
    />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="FormBuilder - Create and Manage Online Forms Easily"
    />
    <meta
      name="twitter:description"
      content="Create, customize, and manage online forms and surveys easily with FormBuilder. Collect responses and analyze data effortlessly."
    />
  </Helmet>
);

export default HomePageHelmet;
