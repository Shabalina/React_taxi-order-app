import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {reduxForm, Field} from 'redux-form'
import withLocalstorage from '../../HOC/WithLocalStorage';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    grid: {
        ...theme.mixins.gutters(),
        height: '700px',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing.unit * 2, 
        paddingBottom: theme.spacing.unit * 2,
        
      },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2, 
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%'
      },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        width: '100%'
      },
    grow: {
      flexGrow: 1,
    },
    paragraph: {
        width: '100%',
        textAlign: 'center'
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: '90%'
      },
      button: {
        margin: theme.spacing.unit,
        color: '#3f51b5',
        border: '1px solid rgba(63, 81, 181, 0.5)'
      },
      link : {
          textDecoration: 'none',
          color: '#3f51b5',
        }  
  });  


//const required = value => value ? undefined : 'Required'
const CVVLength = value => 
  value && value.length !== 3 ? 'Это поле должно иметь длину 3 символов' : undefined
const cardName = value =>
    value && !/^[A-Za-z\s]+$/i.test(value) ?
    'Это поле может содержать только буквы латинского алфавита' : undefined
const cardNumber = value => 
    (value && !/^[\d]+$/i.test(value)) || (value && value.length !== 8)?
    'Это поле может содержать только цифры и иметь длину 8 символов' : undefined

const customField = ({ input, defaultValue, id, type, lable, placeholder, className, meta: { touched, error, warning } }) => {
    return (
    <div style={{ width: "100%" }}>
        <div>
        <TextField 
            {...input} 
            required 
            value={defaultValue}
            placeholder={placeholder} 
            lable={lable}
            className={className} 
            type={type} 
            id={id}
            margin="normal"
            //variant="outlined"
            />
        {touched && ((error && <p style={{ color: "red" }}>{error}</p>) || (warning && <p style={{ color: "red" }}>{warning}</p>))}
        </div>
    </div>
    )
}



class Profile extends Component {
    state={
        formValue:{
            cardName:'',
            cardNumber:'',
            expDat: '',
            CVV: ''
        },
        isSubmt: false
    }

    componentDidMount(){            
        const { savedData } = this.props;  
        if (savedData.length !== 0){
            var tempObj = {
                cardName:'',
                cardNumber:'',
                expDat: '',
                CVV: ''
            }
            for (var field of savedData){
                tempObj[field[0]] = field[1]  
            }
            this.setState({
                formValue: tempObj       
              })        
        }
    }

    handleChange = event =>{
        const { formValue } = this.state;  
        this.setState({
            formValue: {...formValue, [event.target.name]:event.target.value.trim()}
        })
    }

    handleSubmit = (data) => {  
        const { saveData} = this.props;
        let newData = []      
        for(var fieldName in data){
            console.log(fieldName, data[fieldName])
            newData.push([fieldName,data[fieldName]])
            
            //fieldSubmit({fieldName, value:data[fieldName]})
        }  
        saveData(newData)
        this.setState({
            isSubmt: true
        })      
        console.log('submission success')
    }

    render() {
        const { classes } = this.props;      
        const { handleSubmit } = this.props        
        const { isSubmt } = this.state
        return (
            <Grid
                alignItems="center"
                className={classes.grid}
                direction="column"
                justify="space-between"
                container
            >                
                {
                isSubmt 
                ? this.renderMapLink(classes)
                : this.renderForm(handleSubmit, classes)
                }
            </Grid>
        )}

    renderMapLink(classes){
        return(            
            <Paper className={classes.root}>
                <Typography variant="h3" color="inherit" className={classes.grow}>
                    Профиль
                </Typography>
                <Typography className={classes.paragraph} component="p">
                    Платежные данные обновлены. Теперь вы можете заказывать такси
                </Typography>
                <Button className={classes.button}>
                    <Link className={classes.link} to='/map'>
                        Перейти на карту
                    </Link>
                </Button>
          </Paper>
        )
    }

    renderForm(handleSubmit, classes) { 
        const {formValue} = this.state   
        return (
        <Paper className={classes.root}>
            <Typography variant="h4" color="inherit">
                Профиль
            </Typography>
            <form 
                className={classes.container}
                onSubmit={handleSubmit(val => this.handleSubmit(val))}
            >  
            <Typography variant="h6" color="inherit">
                Способ оплаты
            </Typography>
            <Field
               // value={formValue.cardName !== '' ? formValue.cardName :undefined }
                defaultValue={formValue.cardName }
                onChange={this.handleChange}
                validate={cardName}
                name='cardName'
                type='text'
                id='card-name'
                placeholder='Имя владельца *'                    
                className={classes.textField}
                component={customField}
            />
            <Field
                defaultValue={formValue.cardNumber }
                onChange={this.handleChange}
                validate={cardNumber}
                name='cardNumber'
                type='text'
                id='card-number'
                placeholder='Номер карты *'
                className={classes.textField}
                component={customField}
            />
            <Field
                defaultValue={formValue.expDat }
                onChange={this.handleChange}
                name='expDat'
                type='date'
                id='exp-dat'
                lable='Дата окончания действия *'
                className={classes.textField}
                component={customField}
            />
            <Field
                defaultValue={formValue.CVV }
                onChange={this.handleChange}
                validate={CVVLength}
                name='CVV'
                type='text'
                id='cvv'
                placeholder='CVV *'
                lable='Last three digits on signature strip'
                className={classes.textField}
                component={customField}
            />
            <Button 
                type='submit'
                variant="outlined" 
                color="primary" 
                className={classes.button}
                >
                Сохранить
            </Button>
        </form>       
    </Paper>     
        )
    }

    
}

Profile = reduxForm({
    form: 'ProfileForm', // a unique name for this form
  })(Profile);

export default withLocalstorage('profile-data', [])(withStyles(styles)(Profile));