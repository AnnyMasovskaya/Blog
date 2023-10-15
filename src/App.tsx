import { Provider } from "react-redux";
import Router from "./router/Router";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import "reset-css";
import "./variables.css";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <ScrollToTopButton />
    </Provider>
  );
};

export default App;
