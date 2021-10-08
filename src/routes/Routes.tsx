import React from "react";
import { Switch, Route } from "react-router-dom";

import Index from "../pages/Index";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import JobITByMe from "../pages/JobITByMe";
import CreateJobIT from "../pages/CreateJobIT";
import PageNotFound from "../pages/PageNotFound";
import TierRoute from "./TierRoute";
import GiveRoute from "./GiveRoute";
import OrderGiveRoute from "./OrderGiveRoute";
import AdminRoutes from "./AdminRoutes";
import ManualADRoute from "./ManualADRoute";
import StockItRoute from "./StockItRoute";

interface Props { }

const Routes: React.FC<Props> = () => {
    return (
        <Switch>
          <Route path="/stock-it">
              <StockItRoute />
          </Route>
          <Route path="/job-it/me">
              <JobITByMe />
          </Route>
          <Route path="/job-it">
              <CreateJobIT />
          </Route>
          <Route path="/manual-ad">
              <ManualADRoute />
          </Route>
          <Route path="/profile">
              <Profile />
          </Route>
          <Route path="/tiers">
              <TierRoute />
          </Route>
          <Route path="/gives">
              <GiveRoute />
          </Route>
          <Route path="/order-give">
              <OrderGiveRoute />
          </Route>
          <Route path="/admin">
              <AdminRoutes />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/register">
              <Register />
          </Route>
          {/* FIXME: exact แปลว่า แน่นอน ใช้กำหนดหน้าให้เป็น path นี้ path เดียว */}
          <Route exact path="/">
              <Index />
          </Route>
          <Route path="*">
              <PageNotFound />
          </Route>
      </Switch>
    );
};

export default Routes;
