import React, { PureComponent } from 'react';
import { Link} from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Map from '../MainMap';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import withLocalstorage from '../../HOC/WithLocalStorage';
import { connect } from 'react-redux';
import { getIsOrder } from '../../modules/Order';
import {createTaxiOrder, resetTaxiOrder} from '../../modules/Order';
import { getAddressList } from './api';


const styles = theme => ({
    root: {
        position:'relative',
        margin:0,
        padding:0      
    },
    form_container:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'left',
        //width: '40%'
    },
    container: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2, 
        paddingBottom: theme.spacing.unit * 2, 
        width: 340,
        position: 'absolute',
        top: '20px',
        left: '20px'
      },    
    grow: {
      textAlign: 'left',
      paddingBottom: '20px'
    },
    paragraph: {
        width: '100%',
        textAlign: 'left',
        paddingBottom: '20px',
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        paddingBottom: '20px'
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

class TaxiOrder extends PureComponent {

    state={
        address:{
            from: '',
            to: ''
        },
        addressList: [],      
    }

    componentDidMount(){
        const { savedData } = this.props
        if(savedData!== []){           
            getAddressList().then(jsonData => {
                this.setState({ 
                    addressList: jsonData.addresses
                })                                
            })  
        }
    }       

    handleChange = direction  => event => {
        const { address } = this.state
        this.setState({
            address: { ...address, [direction]: event.target.value }           
        });
      };

    handleReset = () =>{
        const {resetTaxiOrder} = this.props 
        resetTaxiOrder()
        this.setState({
            address: { from: '', to: '' }           
        });
    } 

    handleSubmit = () =>{
        const { address } = this.state
        const {createTaxiOrder} = this.props 
        this.setState({
            order: true          
        });       
        createTaxiOrder({from: address.from, to: address.to})
        
    } 

    addressFilter(value, direction) {
        const { address} = this.state
        if (value !== address[direction]){
            return(
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
            )
        }
      }

    render() {            
        const { savedData } = this.props
        const { classes, isOrder } = this.props;  
        return (
            <div className={classes.root}>
                <Map/>
                {
                    savedData.length !== 0 
                    ? (
                        isOrder
                        ? this.renderResetForm()
                        : this.renderOrderForm()
                        )
                    
                    : this.renderProfileLink()
                }
            </div>
            
    )}

    renderResetForm = () => {
        const { classes } = this.props;  
        return (
            <Paper className={classes.container}>
                <Typography variant="h4" color="inherit" className={classes.grow}>
                    Заказ размещен
                </Typography>
                <Typography className={classes.paragraph} component="p">
                    Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.
                </Typography>
                <Button 
                    className={classes.button} 
                    onClick={this.handleReset}
                    >
                    Сделать новый заказ
                </Button>
            </Paper>
        )
    }
    
    renderProfileLink = () => {
        const { classes } = this.props;          
        return (
            <Paper className={classes.container}>
                <Typography variant="h4" color="inherit" className={classes.grow}>
                    Заполните платежные данные
                </Typography>
                <Typography className={classes.paragraph} component="p">
                    Укажите информацию о банковской карте, чтобы сделать заказ
                </Typography>
                <Button className={classes.button} >
                    <Link className={classes.link} to='/profile'>
                        Перейти в профиль
                    </Link>
                </Button>
            </Paper>
        )
    }

    renderOrderForm = () => {
        const { classes } = this.props;  
        const {address, addressList} = this.state
        return (
            <Paper className={classes.container}>
            <form className={classes.form_container} noValidate autoComplete="off">
                <Typography variant="h4" color="inherit" className={classes.grow}>
                    Вызов такси
                </Typography>
                <TextField
                    id="addressFrom"
                    select                  
                    name="from"
                    value={address.from}
                    placeholder="Выберите адрес отправления"
                    onChange={this.handleChange('from')}
                    className={classNames(classes.margin, classes.textField)}                    
                >
                   {   addressList.length !== 0
                        //? addressList.filter(this.addressFilter(address.from))
                        ? addressList.map(option => {
                            if(address.to !== option)
                            return (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>)
                            return null
                          })
                        : null}                    
                </TextField>
                <TextField
                    id="addressTo"
                    select          
                    name="to"
                    value={address.to}
                    placeholder="Выберите адрес прибытия"
                    onChange={this.handleChange('to')}
                    className={classNames(classes.margin, classes.textField)}                    
                >
                    {   addressList.length !== 0
                        //? addressList.filter(this.addressFilter(address.from))
                        ? addressList.map(option => {
                            if(address.from !== option)
                            return (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>)
                            return null
                          })
                        : null} 
                    
                </TextField>
                {
                address.to !== '' && address.from !== ''
                ? 
                <Button 
                    className={classes.button} 
                    color="inherit"
                    onClick={this.handleSubmit}
                    >
                    Вызвать такси
                </Button>
                : 
                <Button disabled className={classes.button}>
                    Вызвать такси
                </Button>
                }
            </form>
            </Paper>
        )
    }

}

export default withLocalstorage('profile-data', [])(connect(state => (
    { 
      isOrder: getIsOrder(state),
    }),
    {
    createTaxiOrder, 
    resetTaxiOrder
    }
)(withStyles(styles)(TaxiOrder)))
