import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (localStorageKey, initData) => (WrappedComponent) => {
    return class extends Component {

        static displayName = "localstorage HOC"
        
        saveData = (data) => {
            save(localStorageKey, data)
            this.forceUpdate();
        }

        savedData = () =>  {
            return load(localStorageKey) || initData
        }

        render(){
            return(
                <WrappedComponent 
                    saveData={this.saveData} 
                    savedData={this.savedData(localStorageKey)}
                />
            )
        }
    }
}

export default withLocalstorage;