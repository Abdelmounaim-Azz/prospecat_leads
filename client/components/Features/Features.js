export default function Features() {
  return (
    <section className="product-features" id="features">
      <div className="container">
        <div className="text-center">
          <h2 className="main-heading mb-2">Product & Features</h2>
          <div className="bottom-line"></div>
          <p className="main-heading-para">
            We offer multiple features and services.
          </p>
        </div>
        <div class="product-features-container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="row">
                <div class="col-md-6">
                  <div class="product-feature text-center">
                    <img src="img/lead.svg" alt="Find new leads" />
                    <h4>Find new leads</h4>
                    <span class="main-border"></span>
                    <p>
                      Enter your search criterea in a form to get back a
                      matching business leads data within seconds (place, job
                      title,specific certificate...)
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="product-feature text-center">
                    <img src="img/email.svg" alt="Find emails" />
                    <h4>Find emails</h4>
                    <span class="main-border"></span>
                    <p>
                      Having a lead's name and current company, you can get his
                      business email address in a second.
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="product-feature text-center">
                    <img src="img/shadow.svg" alt="Manage Your Leads" />
                    <h4>Manage Your Leads</h4>
                    <span class="main-border"></span>
                    <p>
                      This is a simplified CRM to manage your data. You can
                      process a bulk task to find emails of an imported list.
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="product-feature text-center">
                    <img
                      src="img/domains.svg"
                      alt="Domain And Company Search"
                    />
                    <h4>Domain And Company Search</h4>
                    <span class="main-border"></span>
                    <p>
                      Use a company name to find it's valuable emails and
                      employees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
