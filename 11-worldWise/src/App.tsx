import {lazy, Suspense} from "react";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {CitiesProvider} from "./contexts/CitiesContext.tsx";
import {AuthContextProvider} from "./contexts/AuthContext.tsx";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import "./index.css";

// import Homepage from "./pages/Homepage.tsx";
// import Product from "./pages/Product.tsx";
// import Pricing from "./pages/Pricing.tsx";
// import PageNotFound from "./pages/PageNotFound.tsx";
// import AppLayout from "./pages/AppLayout.tsx";
// import Login from "./pages/Login.tsx";

// Lazy loading components
// loads app layout component in the background to improve performance avoid the loadind screen
const AppLayoutComp = import("./pages/AppLayout.tsx");
const AppLayout = lazy(() => AppLayoutComp);

// Lazy loading pages only loads when needed
const Homepage = lazy(() => import("./pages/Homepage.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));

import CityList from "./components/CityList.tsx";
import CountryList from "./components/CountryList.tsx";
import City from "./components/City.tsx";
import Form from "./components/Form.tsx";
import SpinnerFullPage from "./components/SpinnerFullPage.tsx";

function Layout() {
  let location = useLocation();

  return (
    <Suspense fallback={<SpinnerFullPage />} key={location.key}>
      <Outlet />
    </Suspense>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthContextProvider>
  );
}

export default App;

// dist/index.html                   0.48 kB │ gzip:   0.31 kB
// dist/assets/icon-C76IL8ru.png    20.20 kB
// dist/assets/index-HQpHvf0p.css   30.60 kB │ gzip:   5.10 kB
// dist/assets/index-BdWkRBTH.js   572.81 kB │ gzip: 169.35 kB
