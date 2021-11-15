import Head from "next/head";
import {Title} from "../utils/use-title";
import Header from "../components/Header/Header";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactMain from "../components/ContactMain/ContactMain";
import Footer from "../components/Footer/Footer";
const Contact = () => (
  <>
    <Title
      title="PROSPECAT - Contact Us"
      content="Contact Us- We'd love to hear from you!Contact us with any questions or feedback.Get  Help From Our Teams right away. "
    />
    <Header />
    <ContactMain />
    <ContactForm />
    <Footer />
  </>
);
export default Contact;
