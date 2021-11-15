import Link from "next/link";
const GetStarted = () => (
  <>
    <section className='section-4'>
      <h1 className='section-4-heading'>Get started with ProsPecat.</h1>
      <div className='section-4-content'>
        <div className='section-4-img-wrapper'>
          <img src='img/macbook.png' />
        </div>
        <ul className='section-4-list'>
          <li className='section-4-list-item'>
            <span className='number'>1</span>
            <span>
              Set up{" "}
              <Link href='/signup'>
                <a>a business account</a>
              </Link>
            </span>
          </li>
          <li className='section-4-list-item'>
            <span className='number'>2</span>
            <span>
              Choose{" "}
              <Link href='/payment/choose-plan'>
                <a>a Subscription Plan</a>
              </Link>
            </span>
          </li>
          <li className='section-4-list-item'>
            <span className='number'>3</span>
            <span>Connect with people who matter to your business</span>
          </li>
        </ul>
      </div>
    </section>
  </>
);
export default GetStarted;
