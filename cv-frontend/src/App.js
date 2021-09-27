import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/navbar'
import About from './pages/navbar/about'
import Page1 from './pages/navbar/page1'
import Page2 from './pages/navbar/page2'
import Page3 from './pages/navbar/page3'
import RecipeMachine from "./components/recipemachine/RecipeMachine";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri:'http://localhost:4000/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={About}/>
          <Route path='/Page1' component={Page1}/>
          <Route path='/Page2' component={Page2}/>
          <Route path='/Page3' component={Page3}/>
          <Route path='/recipe' component={RecipeMachine}/>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
