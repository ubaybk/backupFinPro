import { Link, useNavigate } from "react-router-dom";
import ButtonBack from "../../components/buttonback";
import { useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../../components/layout";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Validation with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email diperlukan"),
    password: Yup.string()
      .min(6, "Password harus terdiri dari minimal 6 karakter")
      .required("Password diperlukan"),
  });

  const handleLogin = (values) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log("API Key:", apiKey);

    // API call to login
    axios
      .post(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const userId = res.data.user.id;
        const name = res.data.user.name;
        const photo = res.data.user.profilePictureUrl;
        const id = res.data.token;
        const username = res.data.user.username;
        const bio = res.data.user.bio;
        const website = res.data.user.website;
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        localStorage.setItem("photo", photo);
        localStorage.setItem("token", id);
        localStorage.setItem("username", username);
        localStorage.setItem("bio", bio);
        localStorage.setItem("website", website);
        toast.success("Berhasil login", {
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      })
      .catch((err) => {
        toast.error("Login gagal, periksa email atau password Anda", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  return (
    <>
    <Layout>
      <div className="md:border-green-500 md:border-2 md:rounded-xl md:mt-10">
      <ToastContainer />
      <div className="p-3">
        <Link to={"/"}>
          <ButtonBack />
        </Link>
        <div className="text-center mb-8">
          <h1 className="font-semibold text-[40px]">Hello Again!</h1>
          <p className="text-[14px] text-[#4A4A4A]">Sign in to your account</p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
         
            <Form className="flex flex-col gap-5">
              <div className="border border-green-500 rounded-md p-3">
                <label htmlFor="email" className="block font-semibold text-green-500">
                  Email
                </label>
                <Field
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px] dark:text-black dark:p-1"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-[12px]"
                />
              </div>
              <div className="border border-green-500 rounded-md p-3">
                <label htmlFor="password" className="block font-semibold text-green-500">
                  Password
                </label>
                <Field
                  ref={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px] dark:text-black dark:p-1"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-[12px]"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 w-full py-5 font-medium text-[14px] text-white rounded-md mb-10"
              >
                Sign In
              </button>
              <div className="text-center">
                <p>
                  Don’t have an account? Let’s{" "}
                  <Link to={"/register"}>
                    <span className="text-green-500">Sign Up</span>
                  </Link>
                </p>
              </div>
            </Form>
          
        </Formik>
      </div>

      </div>

    </Layout>
    </>
  );
};

export default Login;
