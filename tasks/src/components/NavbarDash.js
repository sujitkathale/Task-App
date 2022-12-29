import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Register = React.lazy(() => import("./Register"));
const Login = React.lazy(() => import("./Login"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const Addtask = React.lazy(() => import("./Addtask"));
const MyAccount = React.lazy(() => import("./Myprofile/MyAccount"));
const Profile = React.lazy(() => import("./Myprofile/Profile"));
const ChangePasssword = React.lazy(() => import("./Myprofile/ChangePassword"));
const Forgotpassword = React.lazy(() => import("./Forgotpassword"));
const Otp = React.lazy(() => import("./Otp"));
const Contact = React.lazy(() => import("./Contact"));

export default function NavbarDash(props) {
  return (
    <div className="col-md-12 col-lg-12 col-sm-12">
      <Suspense
        fallback={
          <div>
            <br />
            <img src="./images/load.gif" alt="Loading..." />
            <h1>Please wait ...</h1>
          </div>
        }
      >
        <BrowserRouter>
          <Switch>
            <Route path="/Profile" exact component={Profile} />
            <Route path="/ChangePasssword" exact component={ChangePasssword} />
            <Route path="/otp" exact component={Otp} />
            <Route path="/Addtask" exact component={Addtask} />
            <Route path="/MyAccount" exact component={MyAccount} />
            <Route path="/forgot" exact component={Forgotpassword} />
            <Route path="/Dash" exact component={Dashboard} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/Reg" exact component={Register} />
            <Route path="/" exact component={Login} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
