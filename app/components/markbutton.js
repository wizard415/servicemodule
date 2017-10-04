import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux'

class MarkButton extends Component{
    constructor(props){
        super(props);
        this.state = this.props;
    }
   

    render(){
        //border = [left, right]
        var selectedType = {
            flex: 1,
            borderLeftWidth: this.state.border?this.state.border[0]:0,
            borderRightWidth: this.state.border?this.state.border[1]:0,
            borderBottomWidth: this.state.markWidth,
            justifyContent: 'center',
            borderLeftColor: this.state.borderColor,
            borderRightColor: this.state.borderColor,
            borderBottomColor: this.state.markColor,
        }

        var defaultType = {
            flex: 1,
            borderLeftWidth: this.state.border?this.state.border[0]:0,
            borderRightWidth: this.state.border?this.state.border[1]:0,
            justifyContent: 'center',
            borderLeftColor: this.state.borderColor,
            borderRightColor: this.state.borderColor,
        }

        return (
                this.state.mark == true?
                    <TouchableOpacity style={selectedType} onPress={() => {this._onClick()}}>
                        <Text style={{textAlign: 'center', color: this.state.markColor}}>{this.state.text}</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={defaultType} onPress={() => {this._onClick()}}>
                        <Text style={{textAlign: 'center', color: this.state.textColor}}>{this.state.text}</Text>
                    </TouchableOpacity>
            
        );
    }

    _onClick() {
        this.props.onPress();
    }

}

export default MarkButton;