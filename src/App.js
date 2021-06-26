import "./App.css";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import AudioPage from "./AudioPage";
import SignInsList from "./SignInsList";
import SignInPage from "./SignInPage";
import Navigation from "./Navigation";
import {useSelector} from 'react-redux';

function App() {

  const user = useSelector(s => s.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <SignInPage />
          </Route>
          {!!user && (
            <>
              <Route exact path="/audio">
                <AudioPage />
              </Route>
              <Route exact path="/users">
                <SignInsList />
              </Route>
            </>
          )}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
