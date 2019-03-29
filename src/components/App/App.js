import React, { PureComponent } from 'react';
import { Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getIsAuthorized, logOut } from '../../modules/Auth';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,    
    color: 'rgba(0, 0, 0, 0.87)'
  },
  link : {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  }
});


class App extends PureComponent {

  logOut = () =>{
    const {isAuthorized, logOut} = this.props 
    if (isAuthorized){
      return logOut()
    }
  }  

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>            
            <Typography variant="h5" color="inherit" className={classes.grow}>
              Loft Taxi
            </Typography>
            <Button className={classes.button}>
              <Link className={classes.link} to='/map'>
                  Карта
              </Link>
            </Button>
            <Button className={classes.button}>
              <Link className={classes.link} to='/profile'>
                  Профиль
              </Link>
            </Button>
            <Button 
              className={classes.button}
              onClick={this.logOut}>
              Выйти
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}  

export default connect(
  state => ({ isAuthorized: getIsAuthorized(state) }),
  {logOut}
)(withStyles(styles)(App));  
