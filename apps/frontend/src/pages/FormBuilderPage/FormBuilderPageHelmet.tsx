import { Helmet } from "react-helmet-async";

const FormBuilderPageHelmet = () => (
  <Helmet>
    <title>Form Builder - Create Online Forms</title>
    <meta
      name="description"
      content="Create online forms with questions, answer options, and question type settings. A user-friendly Form Builder for any purpose."
    />
    <meta
      name="keywords"
      content="form builder, online forms, surveys, questionnaires, multiple choice, checkbox, create forms"
    />
    <meta
      property="og:title"
      content="Form Builder - Create Online Forms | MyApp"
    />
    <meta
      property="og:description"
      content="Create online forms with questions, answer options, and question type settings."
    />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Form Builder - Create Online Forms | MyApp"
    />
    <meta
      name="twitter:description"
      content="Create online forms with questions, answer options, and question type settings."
    />
  </Helmet>
);

export default FormBuilderPageHelmet;
