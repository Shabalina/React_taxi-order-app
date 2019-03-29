import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import style from './Login.module.css';
import { connect } from 'react-redux';
import { addLoginData, getIsError, getIsAuthorized } from '../../modules/Auth';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 0,
    maxWidth: '25%',
    height: '230px',
    paddingTop: theme.spacing.unit * 2, 
    paddingBottom: theme.spacing.unit * 2,
    
  },

  text: {
    textAlign: 'center'
  },
   
  container: {
    display: 'flex',
    width: '30%',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Login extends PureComponent {
  state={
    login: '',
    password:'',
    //error: null
}

handleChange = event => {
  this.setState({
      [event.target.name]: event.target.value.trim().toLowerCase(),            
  });
};

handleSubmit = () =>{
  const {login,password} = this.state 
  const {addLoginData} = this.props
  addLoginData({login, password})
}    

  
  render() {
    const { isAuthorized} = this.props
    return(
      !isAuthorized
      ? this.renderLoginForm()
      : <Redirect to="/map"/>
    )}


    renderLoginForm = () => {
      const { isError} = this.props
      const { classes } = this.props;
      const { login, password } = this.state;
      return (
        <Grid
          alignItems="center"
          className={style.root}
          direction="column"
          justify="space-between"
          container
        >
        <Paper className={classes.root}>
            <Typography variant="h4" color="inherit" className={classes.text}>
                Войти
            </Typography>      
            <FormControl 
              className={classes.formControl} 
              error={isError}
              required>
            <Input
              id="component-error"
              value={login}
              name="login"
              type="email"
              placeholder="Имя пользователя *"
              onChange={this.handleChange}
              aria-describedby="component-error-text"
            />
            {
              isError
              ? <FormHelperText id="component-error-text">Heверный логин</FormHelperText>
              : null
            }          
          </FormControl>  
          <FormControl 
              className={classes.formControl} 
              error={isError}
              required>
            <Input
              id="component-error"
              value={password}
              name="password"
              type="password"
              placeholder="Пароль пользователя *"
              onChange={this.handleChange}
              aria-describedby="component-error-text"
            />
            {
              isError
              ? <FormHelperText id="component-error-text">Heверный пароль</FormHelperText>
              : null
            }
            </FormControl>           
            <Button 
              variant="outlined" 
              color="primary" 
              className={classes.button}
              onClick={this.handleSubmit}
              >
              Войти
            </Button>
        </Paper>  
        </Grid>    
    );
  }
}

export default connect(state => (
  { 
    isError: getIsError(state),
    isAuthorized: getIsAuthorized(state)
  }
), { addLoginData })(withStyles(styles)(Login));
