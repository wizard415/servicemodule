import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import {Actions} from 'react-native-router-flux'

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = this.props
        this.state = {
            animation   : new Animated.Value(),
            minLeft     : 0,
            maxLeft     : 0,
            active: this.props.active
        };
    }
   

    render(){
        var OnButton = {
                            position: 'absolute', 
                            left: 0,
                            top: 0,
                            width: this.props.buttonRadius * 2, 
                            height: this.props.buttonRadius * 2, 
                            borderRadius: this.props.buttonRadius, 
                            backgroundColor: this.props.activeButtonColor
                        }
        var OffButton = {
                            position: 'absolute', 
                            left: this.props.switchWidth - this.props.buttonRadius * 2,
                            top: 0,
                            width: this.props.buttonRadius * 2, 
                            height: this.props.buttonRadius * 2, 
                            borderRadius: this.props.buttonRadius, 
                            backgroundColor: this.props.inactiveButtonColor
                        }
        return (          
                
                this.state.active == true?
                    <TouchableOpacity onPress={() => {this._onPress()}} style={{height: this.props.buttonRadius * 2, width: this.props.switchWidth, position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: this.props.switchWidth, height: this.props.switchHeight, borderRadius: this.props.switchHeight / 2, backgroundColor: this.props.activeSwitchColor}}/>                    
                        <Animated.View style={OnButton} onLayout={this._setActive.bind(this)} />
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={() => {this._onPress()}} style={{height: this.props.buttonRadius * 2, width: this.props.switchWidth, position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: this.props.switchWidth, height: this.props.switchHeight, borderRadius: this.props.switchHeight / 2, backgroundColor: this.props.inactiveSwitchColor}}/>                    
                        <Animated.View style={OffButton} onLayout={this._setInactive.bind(this)} />
                    </TouchableOpacity>
        );        
    }

    _setActive(event) {
        this.setState({minLeft: 0, maxLeft: this.props.switchWidth - this.props.buttonRadius * 2, animation: new Animated.Value(0)});
    }

    _setInactive(event) {
        this.setState({minLeft: 0, maxLeft: this.props.switchWidth - this.props.buttonRadius * 2, animation: new Animated.Value(this.props.switchWidth - this.props.buttonRadius * 2)});
    }

    _onPress() {
        this.props.onPress(!this.state.active);
        this.setState({active: !this.state.active})       
        if(this.state.active){
            this.state.animation.setValue(this.state.minLeft);
            Animated.spring(
            this.state.animation,
            {
                toValue: this.state.maxLeft
            }
        ).start();
        }else{
            this.state.animation.setValue(this.state.maxLeft);
            Animated.spring(
            this.state.animation,
            {
                toValue: this.state.minLeft
            }
        ).start();
        }
        
    }
}

var style = StyleSheet.create({
   statuBar: {
        height: 20,
        backgroundColor: '#263041',
    },    

    backButton: {
        width: 40,
        height: 40,
        resizeMode: 'stretch',
        alignSelf: 'stretch'
    },

    headerText: {
        color: 'white',
        textAlign: 'center', 
        fontSize: 20,
        padding: 20,
    },

    titleView: {
        justifyContent: 'center'
    },

    backView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default NavBar;