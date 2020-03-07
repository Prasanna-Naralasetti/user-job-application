import React, { Component, Fragment } from 'react'
import { Tabs } from "antd";
import {connect} from 'react-redux'
import FrontEndApplications from '../FrontEndApplications/FrontEndApplications';
import NodeJsApplications from '../NodeJsApplications/NodeJsApplications';
import MERNApllications from '../MERNApllications/MERNApllications';
import FullStackApplications from '../FullStackApplications/FullStackApplications';
import styled from 'styled-components';
import { enums } from './enums';


const { TabPane } = Tabs;

 class Applications extends Component {
    constructor(){
        super()
        this.state={
            isFrontEnd:true,
            isNodeJs:false,
            isMern:false,
            isFullStack:false,
            activeKey:"1",
        }
    }

    tabChange=(key)=>{
this.setState({activeKey:key})
    }

    handleFrontEnd=(user)=>{
      let jobs;
      let backend=[]
      let fullstack=[]
      let mern =[]
       user.filter(ele=>{
         if(ele===enums.FRONT_END_APPLICATION){
           return jobs=ele
         }else if(ele===enums.NODE_JS_APPLICATION){
          return jobs=ele
         }else if(ele===enums.MERN_APPLICATION){
           return jobs=ele
         }else if(ele===enums.FULL_STACK_APPLICATION){
           return jobs=ele
         }
       })
    }

    render() {
        return (
          <Fragment>
              <h1 style={{padding:"2rem 2rem 0 2rem"}}>Admin Dashboard</h1>
              <div style={{padding:"0 2rem"}}>
             
            <Tabs onChange={this.tabChange} defaultActiveKey={this.state.activeKey} activeKey={this.state.activeKey}>
              
              <TabPane tab="FornEnd" key="1">
                <FrontEndApplications title="Front -End" user={this.handleFrontEnd(this.props.User)} />
              </TabPane>
              <TabPane tab="NodeJS" key="2">
                  <FrontEndApplications title="NodeJS" user={this.handleFrontEnd(this.props.User)} />
              </TabPane>
              <TabPane tab="MERN" key="3">
                  <FrontEndApplications title="MERN" user={this.props.User.filter(fe => fe.jobTitle == 'MERN Developer')}/>
              </TabPane>
              <TabPane tab="FullStack" key="4">
                  <FrontEndApplications title="FullStack" user={this.props.User.filter(fe => fe.jobTitle == 'Full Stack Developer')} />
              </TabPane>
            </Tabs>
              </div>
          </Fragment>
        );
    }
}

//

const styledTabs = styled(Tabs)`
  background-color: darkblue;
  color: white;
`;
const mapStateToProps=(state)=>{
    return{
      User:state.user
    }
}
export default connect(mapStateToProps)(Applications)