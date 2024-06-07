import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";
import "./style/style.scss";
const App = () => {
  // const location = useLocation();
  // console.log(location);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
