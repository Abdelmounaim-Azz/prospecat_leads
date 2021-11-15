import axios from "axios";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useHasMounted} from "../../utils/use-hasMounted";
import CustomButton from "../CustomButton/CustomButton";
import Router from "next/router";

const ContactForm = () => {
  const schema = yup.object().shape({
    firstname: yup.string().required("firstname can't be blank."),
    lastname: yup.string().required("lastname can't be blank."),
    message: yup.string().required("Please let us know what is your message."),
    email: yup
      .string()
      .required("Email is Required.")
      .email("Email must be valid."),
  });
  const {register, handleSubmit, errors} = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      await axios.post("/api/users/contact", data);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <section className="contact-form">
        <div className="container">
          <h2 className="text-center">Email us</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-1">
                      <label className="buttonText">First Name</label>
                      <input
                        type="text"
                        className="form-control main-input"
                        placeholder="Enter Your First Name"
                        name="firstname"
                        ref={register}
                        error={`${!!errors.firstname}`.toString()}
                        aria-describedby="firstnameErr"
                      />
                    </div>
                    <small
                      id="firstnameErr"
                      className={`invalid-feedback fs-mr`}
                    >
                      {errors?.firstname?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-1">
                      <label className="buttonText">Last Name</label>
                      <input
                        type="text"
                        className="form-control main-input"
                        placeholder="Enter Your Last name"
                        name="lastname"
                        ref={register}
                        error={`${!!errors.lastname}`.toString()}
                        aria-describedby="lastnameErr"
                      />
                    </div>
                    <small
                      id="lastnameErr"
                      className={`invalid-feedback fs-mr`}
                    >
                      {errors?.lastname?.message}
                    </small>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-1">
                      <label className="buttonText">Email</label>
                      <input
                        type="email"
                        className="form-control main-input"
                        placeholder="Email"
                        name="email"
                        ref={register}
                        error={`${!!errors.email}`.toString()}
                        aria-describedby="emailErr"
                      />
                    </div>
                    <small id="emailErr" className={`invalid-feedback fs-mr`}>
                      {errors?.email?.message}
                    </small>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label className="buttonText">Message</label>
                      <textarea
                        className="form-control main-input"
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Enter Your Message"
                        name="message"
                        ref={register}
                        error={`${!!errors.message}`.toString()}
                        aria-describedby="messageErr"
                      ></textarea>
                    </div>
                    <small id="messageErr" className={`invalid-feedback fs-mr`}>
                      {errors?.message?.message}
                    </small>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <CustomButton>Submit</CustomButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default ContactForm;
