import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import NewsDetail from "../components/PostDetail/NewsDetail";
import MainLayout from "../layouts/MainLayout";

const MainPage = () => {
  return (
    <MainLayout header={<Header />} main={<NewsDetail />} footer={<Footer />} />
  );
};

export default MainPage;
