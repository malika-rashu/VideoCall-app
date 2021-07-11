
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './rooms/Login';
import Meeting from './rooms/Meeting'

const useStyles = makeStyles((theme) => ({

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    
  },
}));
function App() {
  const classes = useStyles();

  return (
    <div className= {classes.wrapper}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />

          <Route path="/:roomID" component={Meeting} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
