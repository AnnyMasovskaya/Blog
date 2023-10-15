import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SignUp from "../components/SignUp/SignUp";
import MainLayout from "../layouts/MainLayout";

const SignUpPage = () => {
  return (
    <MainLayout header={<Header />} main={<SignUp />} footer={<Footer />} />
  );
};

export default SignUpPage;
