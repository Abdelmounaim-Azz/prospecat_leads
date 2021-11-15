import Link from "next/link";
export default function ContactUs() {
  return (
    <section className="contact-us contact-page main-banner offset-top-2 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="main-item text-center">
              <img src="img/dev.svg" alt="Icone" />
              <h3 className="buttonText">Developement Team</h3>
              <p className="lead">Want to know more about Prospecat?</p>
              <p className="lead">
                Have an idea that can help us improve your user experience?
              </p>
              <Link href="mailto:contact@prospecat.com">
                <a className="lead">contact@prospecat.com</a>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="main-item text-center">
              <img src="img/design.svg" alt="Icon" />
              <h3 className="buttonText">Support Team</h3>
              <p className="lead">Facing a problem during your experience?</p>
              <p className="lead">Report a bug or software dysfunction?</p>
              <Link href="mailto:support@prospecat.com">
                <a className="lead">support@prospecat.com</a>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="main-item text-center">
              <img src="img/sales.svg" alt="Icon" />
              <h3 className="buttonText">Sales Team</h3>
              <p className="lead">
                Inquiries concerning our pricing model or custom plan needs?
              </p>
              <p className="lead">Problems concerning a purchase?</p>
              <Link href="mailto:sales@prospecat.com">
                <a className="lead">sales@prospecat.com</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
