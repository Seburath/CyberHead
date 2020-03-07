

import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';

import './App.css';


import Overview from './components/Overview';
import HeatVision from './components/HeatVision';
import Configuration from './components/Configuration';
import Strategy from './components/Strategy';
import Brokers from './components/Brokers';
import getStrategies from './actions/getStrategies'


// Automated Import //

import datasets from './modules/datasets';

// Automated Import //


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      selectedKeyMenu: "1",
      loaded: false,
      strategies: []
    };
    this.updateMenuKey = this.updateMenuKey.bind(this);
    this.loadStrategies = this.loadStrategies.bind(this);
  }

  updateMenuKey(key){
    this.setState({selectedKeyMenu: key})
  }

  loadStrategies(){
    getStrategies()
      .then(response => {
        response.strategies.map(strategy => this.setState({strategies: [...this.state.strategies, strategy.strategy_name]}))
      })
  }

  componentDidMount(){
    this.loadStrategies()
    this.setState({loaded: true})
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ background: '#141414'}}>
          <div className="logo">
          <img src="/images/logo64.png" className="center"/>
          </div>
          <Menu style={{ background: '#141414'}} theme="dark" mode="inline" defaultSelectedKeys={["1"]} selectedKeys={[this.state.selectedKeyMenu]} >


{/* Automated Menu */}
    <Menu.Item className="item" key="5">
      <Link to="/datasets">
	<Icon type="file-add" />
	<span>Data Sets</span>
      </Link>
    </Menu.Item>

{/* Automated Menu */}

          </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: '#090909'}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '0px 0px',
              padding: 24,
              background: '#1b1b1b',
              minHeight: '100vh',
            }}
          >

              <Switch>
                <Route exact path="/strategy/:strategy_name"  component={Strategy} />

                <Route exact path="/heat-vision">
                  <HeatVision updateKey={this.updateMenuKey} />
                </Route>

                <Route exact path="/configuration">
                  <Configuration updateKey={this.updateMenuKey} />
                </Route>

                <Route exact path="/brokers">
                  <Brokers updateKey={this.updateMenuKey} />
                </Route>

                <Route path="/">
                  <Overview updateKey={this.updateMenuKey} />
                </Route>


{/* Automated Route */}

                <Route exact path="/datasets">
                  <datasets updateKey={this.updateMenuKey} />
                </Route>

{/* Automated Route */}


             </Switch>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

export default App;
