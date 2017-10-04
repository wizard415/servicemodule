import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import SearchBar from 'react-native-searchbar'
import Panel from '../components/panel.js'
import SwitchView from '../components/switch'
import Modal from 'react-native-simple-modal';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var edit_service = require('../images/edit_category.png');
var delete_service = require('../images/delete_category.png');
var addService = require('../images/add_service.png');
var style = require('../styles/service_view');
var search_data = ['Organic Face Cleanup', 'Organic Face Wash', 'Gold Facial', 'Cucumber Facial'];
var service_data = [
  {
    name: 'Organic Face Cleanup',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: true
  },
  {
    name: 'Organic Face Wash',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: false
  },
  {
    name: 'Gold Facial',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: true
  },
  {
    name: 'Cucumber Facial',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: false
  },
  {
    name: 'Gold Fashion',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: true
  },
  {
    name: 'Body Lightning',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: false
  },
  
];

class SearchView extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { 
            dataSource: ds.cloneWithRows([]),
            searchText: '',
            Datas: service_data,
            category: props.category,
            selected_service: []
        };   
        this._handleResults = this._handleResults.bind(this); 
    }

    componentDidMount() {
    }

    

    _handleResults(results) {
        var filtered_services = [];
        service_data.map(function(item, index){
            if(results.indexOf(item.name) > -1) filtered_services.push(item);
        });
        this._setDataList(filtered_services);
    }

    _setDataList(data) {
        this.setState({Datas: data});
        this.setState({dataSource: ds.cloneWithRows(data)});
    }




    ListItemHeader(rowData) {
        return(
            <View style={{flex: 1, padding: 16}}>
                <View style={{flex: 0.8}}>
                    <Text style={{fontSize: 15}}>{rowData.name}</Text>
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                            <Text style={{fontSize: 14, color: '#ababab'}}>{'\u20B9'}{rowData.price}</Text>
                            <Text style={{fontSize: 14, color: '#d8d8d8', marginLeft: 5, textDecorationLine: 'line-through'}}>{'\u20B9'}{rowData.previous}</Text>
                            <Text style={{fontSize: 14, color: '#d8d8d8', marginLeft: 12}}>|</Text>
                            <Text style={{fontSize: 14, color: '#d8d8d8', marginLeft: 10}}>{rowData.time}</Text>
                    </View>
                </View>
                <View style={{marginTop: 9, height: 18, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#41ca41', borderRadius:9}}>
                    <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 11}}>20% OFF</Text>
                </View>
                <Text style={{marginTop: 15, color: '#a5a5a5', fontSize: 14}}>{rowData.description}</Text>

            </View>            
              
        )
    }

    renderItem(rowData, rowID) {
                return(
                                    
                                <Panel title={this.ListItemHeader(rowData)} data={rowData} handle={this}>
                                    
                                    
                                    <View style={{flexDirection: 'row',height: 48, borderTopWidth: 0.5, borderColor: '#e6e6e6'}}>

                                                    <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderColor: '#ababab'}}>
                                                        <TouchableOpacity onPress={() => {this.onEditService(rowData)}}>
                                                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                                <Image style={style.iconImage} source={edit_service}/>
                                                                <Text style={style.iconText}>EDIT</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRightWidth: 0.5, borderColor: '#ababab'}}>
                                                        <TouchableOpacity onPress={() => {this.onDeleteConfirm(rowData)}}>
                                                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                                <Image style={style.iconImage} source={delete_service}/>
                                                                <Text style={[style.iconText, {color: 'red'}]}>DELETE</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                            <Text style={style.switchText}>{rowData.active?'AVAILABLE':'UNAVILABLE'}</Text>
                                                            <View style={style.SwitchView}>
                                                                <SwitchView 
                                                                    switchWidth={22}
                                                                    switchHeight={8}
                                                                    buttonRadius={7}
                                                                    activeButtonColor='#1FbF55'
                                                                    inactiveButtonColor='#rgba(200,200,200,.7)'
                                                                    activeSwitchColor='#8FDFAA' 
                                                                    inactiveSwitchColor='#rgba(200,200,200,.4)'
                                                                    active={rowData.active}
                                                                    onPress={(state)=>{this.onChangeCategoryActiveState(rowID, state)}}
                                                                    />
                                                            </View>                                                    
                                                    </View>
                                                </View>     
                                  
                                </Panel>
                )
                        
    }
   

    render(){
        
        return (
            <View style={{backgroundColor: '#f1f5ff', flex: 1, paddingBottom: 30}}>
                <ListView
                    style={{paddingBottom: 80, padding: 16, marginTop: 78, backgroundColor: '#f1f5ff'}}
                    dataSource = {this.state.dataSource}
                    enableEmptySections = {true}
                    renderRow = {(rowData, sectionID, rowID, highlightRow) => {
                        return(
                            <View style={style.serviceCard}>
                                {this.renderItem(rowData, rowID)}
                            </View>
                        )
                    }}
                />   
                <SearchBar
                    data={search_data}
                    ref={(ref) => this.searchBar = ref}
                    placeholder='Search...'
                    handleResults={this._handleResults}
                    handleChangeText={(input) => {this.setState({searchText: input})}}
                    showOnLoad={true}
                    onHide={() => {
                        Actions.pop();
                    }}
                    onShow={() => {this._handleResults(null)}}
                />     
                <Modal
                    offset = {0}
                    containerStyle={{
                       justifyContent: 'center',
                       position: 'absolute'
                    }}
                    open = {this.state.delete_service}
                    modalDidOpen = {() => console.log('modal did open')}
                    modalDidClose = {() => this.setState({delete_service: false})}>
                    <View style = {{padding: 14, paddingBottom: 2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Confirm Delete</Text>
                        <Text style={{marginTop: 15, color: '#b9b9b9'}}>Are you sure you want to <Text style={{color: 'black'}}>delete {this.state.selected_service.name}?</Text></Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 24, height: 36}}>
                            <TouchableOpacity onPress={()=>{this.setState({delete_service: false})}}>
                                <Text style={{color:'#b9b9b9', fontSize: 14, width: 64}}>CLOSE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.onDeleteService()}}>
                                <Text style={{color:'#E64848', width: 70, marginLeft: 32}}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    onEditService(data) {
        Actions.edit_service({service: this.state.selected_service, category: this.state.category})
    }

    onDeleteService() {
        alert('Deleted Service!')
    }
   
    onDeleteConfirm(data) {
        this.setState({delete_service: true, selected_service: data})
    }

    onChangeCategoryActiveState(index, state) {
        var data = this.state.Datas[index];
        data.active = state;
        this._setDataList(this.state.Datas)
    }    

    onAddService() {
      Actions.add_service({category: this.state.category});
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(SearchView);