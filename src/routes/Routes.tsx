import React from "react";
import { Switch, Route } from "react-router-dom";

import Index from "../pages/Index";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import JobITByMe from "../pages/JobITByMe";
import CreateJobIT from "../pages/CreateJobIT";
import TodoPage from "../pages/TodoPage";
import LeaveCreate from "../pages/LeaveCreate";
import LeaveApproval from "../pages/LeaveApproval";
import LeaveByMe from "../pages/LeaveByMe";
import ResellCreate from "../pages/ResellCreate";
import ResellCreateStep2 from "../pages/ResellCreateStep2";
import ResellReport from "../pages/ResellReport";
import ResellByMe from "../pages/ResellByMe";
import SalesReportLeader from "../pages/SalesReportLeader";
import SalesReport from "../pages/SalesReport";
import SalesActualCreate from "../pages/SalesActualCreate";
import SalesIssueCreate from "../pages/SalesIssueCreate";
import SalesIssueDetail from "../pages/SalesIssueDetail";
import SalesRoleManage from "../pages/SalesRoleManage";
import SalesRoleDe from "../pages/SalesRoleDe";
import UserDetail from "../pages/UserDetail";
import PageNotFound from "../pages/PageNotFound";
import TierRoute from "./TierRoute";
import GiveRoute from "./GiveRoute";
import OrderGiveRoute from "./OrderGiveRoute";
import AdminRoutes from "./AdminRoutes";
import ManualADRoute from "./ManualADRoute";
import StockItRoute from "./StockItRoute";
import SalesVisitCreate from "../pages/SalesVisitCreate";
import SalesVisitDetail from "../pages/SalesVisitDetail";

interface Props { }

const Routes: React.FC<Props> = () => {
    return (
        <Switch>
            <Route path="/user-id/:id">
                <UserDetail />
            </Route>
            <Route path="/sales-report/issue/:id">
                <SalesIssueDetail />
            </Route>
            <Route path="/sales-report/visit/:id">
                <SalesVisitDetail />
            </Route>
            <Route path="/sales-report/role-manage/:id">
                <SalesRoleDe />
            </Route>
            <Route path="/sales-report/role-manage">
                <SalesRoleManage />
            </Route>
            <Route path="/sales-report/issue-create">
                <SalesIssueCreate />
            </Route>
            <Route path="/sales-report/visit-create">
                <SalesVisitCreate />
            </Route>
            <Route path="/sales-report/actual-create">
                <SalesActualCreate />
            </Route>
            <Route path="/sales-report-leader">
                <SalesReportLeader />
            </Route>
            <Route path="/sales-report">
                <SalesReport />
            </Route>
            <Route path="/resell/by-me">
                <ResellByMe />
            </Route>
            <Route path="/resell/report">
                <ResellReport />
            </Route>
            <Route path="/resell/step2/:id">
                <ResellCreateStep2 />
            </Route>
            <Route path="/resell">
                <ResellCreate />
            </Route>
            <Route path="/leave/me">
                <LeaveByMe />
            </Route>
            <Route path="/leave/approval">
                <LeaveApproval />
            </Route>
            <Route path="/leave">
                <LeaveCreate />
            </Route>
            <Route path="/todo">
                <TodoPage />
            </Route>
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
