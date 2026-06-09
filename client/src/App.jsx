import Header from "./components/Header";
import Home from "./pages/Home";
import Container from "./components/Container";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import AddAddress from "./pages/AddAddress";
import MyOrdersPage from "./pages/MyOrdersPage";
import { useAppContext } from "./context/AppContext";
import SellerLogin from "./components/seller/SellerLogin";
import SellerDashboardPage from "./pages/SellerDashboardPage";
// import AddProductNew from './pages/seller/AddProductNew';
// import ProductList from "./components/seller/ProductList";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {
    state: { isSeller },
  } = useAppContext();

  return (
    <div className="flex flex-col gap-15">
      {isSellerPath ? null : <Header />}
      <Toaster />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route
            path="/products/:category/:id"
            element={<SingleProductPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          
          <Route
            path="/seller"
            element={isSeller ? <SellerDashboardPage /> : <SellerLogin />}
          >
            {/*<Route index element={isSeller && <AddProductNew />} />*/}
            {/*<Route path="product-list" element={<ProductList />} />*/}
          </Route>
        </Routes>
      </Container>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;

// <Button
//   onClick={() => {
//     console.log("clicked");
//   }}
//   variant="secondary"
//   iconLeft={
//     <img src={assets.cart_icon} alt="icon-left" className="w-5 h-5" />
//   }
// >
//   Login
// </Button>
