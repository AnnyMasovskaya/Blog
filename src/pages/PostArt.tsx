import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ArticleDetail from "../components/PostDetail/ArticleDetail";
import MainLayout from "../layouts/MainLayout";

const MainPage = () => {
  return (
    <MainLayout
      header={<Header />}
      main={<ArticleDetail />}
      footer={<Footer />}
    />
  );
};

export default MainPage;
