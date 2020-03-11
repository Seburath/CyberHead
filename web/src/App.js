import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import './App.css';

// Automated Import //
import ameritrade from './modules/ameritrade'

import coinbase from './modules/coinbase'

import alpaca from './modules/alpaca'

import datasets from './modules/datasets'

import mysql from './modules/mysql'

import strategies from './modules/strategies'

import portfolio from './modules/portfolio'
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
    };
    this.updateMenuKey = this.updateMenuKey.bind(this);
  }

  updateMenuKey(key){
    this.setState({selectedKeyMenu: key})
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
      <Link  to="ameritrade">
	<Icon type="experiment" />
	<span>Ameritrade</span>
      </Link>
    </Menu.Item>




    <Menu.Item className="item" key="4">
      <Link  to="coinbase">
	<Icon type="experiment" />
	<span>Coinbase</span>
      </Link>
    </Menu.Item>




    <Menu.Item className="item" key="4">
      <Link  to="alpaca">
	<Icon type="experiment" />
	<span>Alpaca</span>
      </Link>
    </Menu.Item>




    <Menu.Item className="item" key="5">
      <Link to="/datasets">
	<Icon type="file-add" />
	<span>Data Sets</span>
      </Link>
    </Menu.Item>


    <Menu.Item className="item" key="3">
      <Link to="/heat-vision">
	<Icon type="dot-chart" />
	<span>MySQL</span>
      </Link>
    </Menu.Item>




  <SubMenu
    style={{ background: '#141414'}}
    theme="dark"
    mode="inline"
    key="sub1"
    title={
      <span>
	<Icon type="stock" />
	<span>Strategies</span>
      </span>
    }
  >
    {this.state.loaded && this.state.strategies.map((strategy, index) => (
      <Menu.Item className="item" key={index+11}>
	<Link to={`/strategy/${strategy}`}>
	  <Icon type="stock" />
	  <span>{strategy}</span>
	</Link>
      </Menu.Item>

    ))}

      <Menu.Item className="item" key="10">
        <Link  to="strategy1">
	  <Icon type="experiment" />
	  <span>Strategy1</span>
        </Link>
      </Menu.Item>

      <Menu.Item className="item" key="11">
        <Link  to="strategy2">
	  <Icon type="experiment" />
	  <span>Strategy2</span>
        </Link>
      </Menu.Item>


  </SubMenu>




  <Menu.Item className="item"key="1">
	<Link to="/overview">
    <Icon type="desktop" />
    <span>Porfolio</span>

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


{/* Automated Route */}
<Route exact path="/ameritrade">
  <ameritrade updateKey={this.updateMenuKey}/>
</Route>

<Route exact path="/coinbase">
  <coinbase updateKey={this.updateMenuKey}/>
</Route>

<Route exact path="/alpaca">
  <alpaca updateKey={this.updateMenuKey}/>
</Route>

<Route exact path="/datasets">
  <datasets updateKey={this.updateMenuKey}/>
</Route>

<Route exact path="/mysql">
  <mysql updateKey={this.updateMenuKey}/>
</Route>

<Route exact path="/strategies">
  <strategies updateKey={this.updateMenuKey}/>
</Route>

<Route exact path="/portfolio">
  <portfolio updateKey={this.updateMenuKey}/>
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
  
