import Link from "next/link";
import { Title } from "../../utils/use-title";
const CheckLink = () => (
  <>
    <Title
      title='PROSPECAT - Password sent!'
      content='Prospecat is a platform to find verified email addresses and build a quality Data for your sales funnel.Start using Prespecat to reach your customers directly.'
    />
    <div className='login-page'>
      <h2 className='top-heading-reset'>Reset Your Password</h2>
      <div className='login-page-content'>
        <p className='f-s-2 f-w-600'>
          Check your email for a link to reset your
          <br />
          password. If it doesn’t appear within a few
          <br />
          minutes, check your spam folder.
        </p>
        <Link href='/signin' passHref>
          <button className='card-reset-btn'>
            <i className='fas fa-arrow-circle-left'></i> Return to sign in
          </button>
        </Link>
      </div>
    </div>
  </>
);
export default CheckLink;
