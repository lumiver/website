import { lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import { useTranslation } from 'react-i18next'

const Router = () => {

  const { i18n } = useTranslation()

  const setLangDir = () => {
    if (i18n.language) {
      document.documentElement.dir = i18n.dir(i18n.language)
    }
  }

  useEffect(() => {
    setLangDir()
  }, [i18n, i18n.language])

  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Switch>
        {routes.map((routeItem) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() => import(`../pages/${routeItem.component}`))}
            />
          );
        })}
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Router;
