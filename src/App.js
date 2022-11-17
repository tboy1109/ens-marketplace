import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import UploadVariants from "./screens/UploadVariants";
import UploadDetails from "./screens/UploadDetails";
import ConnectWallet from "./screens/ConnectWallet";
import Faq from "./screens/Faq";
import Activity from "./screens/Activity";
import Search01 from "./screens/Search01";
import Search02 from "./screens/Search02";
import Profile from "./screens/Profile";
import ProfileEdit from "./screens/ProfileEdit";
import Item from "./screens/Item";
import MyItem from "./screens/MyItem";
import PageList from "./screens/PageList";

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/fantomnameservice/fantomdomains/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Page>
                <Search01 />
              </Page>
            )}
          />
          <Route
            exact
            path="/upload-variants"
            render={() => (
              <Page>
                <UploadVariants />
              </Page>
            )}
          />
          <Route
            exact
            path="/upload-details"
            render={() => (
              <Page>
                <UploadDetails />
              </Page>
            )}
          />
          <Route
            exact
            path="/connect-wallet"
            render={() => (
              <Page>
                <ConnectWallet />
              </Page>
            )}
          />
          <Route
            exact
            path="/faq"
            render={() => (
              <Page>
                <Faq />
              </Page>
            )}
          />
          <Route
            exact
            path="/activity"
            render={() => (
              <Page>
                <Activity />
              </Page>
            )}
          />
          <Route
            exact
            path="/search01"
            render={() => (
              <Page>
                <Search01 />
              </Page>
            )}
          />
          <Route
            exact
            path="/search02"
            render={() => (
              <Page>
                <Search02 />
              </Page>
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <Page>
                <Profile />
              </Page>
            )}
          />
          <Route
            exact
            path="/profile-edit"
            render={() => (
              <Page>
                <ProfileEdit />
              </Page>
            )}
          />
          <Route
            exact
            path="/item/:itemId"
            render={() => (
              <Page>
                <Item />
              </Page>
            )}
          />
          <Route
            exact
            path="/user/:userId?"
            render={() => (
              <Page>
                <Profile />
              </Page>
            )}
          />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
