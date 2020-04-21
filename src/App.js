// 项目的根组件

import React from 'react'

import { Layout, Menu } from 'antd';


import {HashRouter as Router,Route,Link} from 'react-router-dom'

import HomeContainer from './components/home/HomeContainer.js'
import MovieContainer from './components/movie/MovieContainer.js'
import AboutContainer from './components/about/AboutContainer.js'


const { Header, Content, Footer } = Layout;



export default class App extends React.Component{
	constructor(props){
		super(props)
		this.state= {
			
		}
	}
	render(){
		return(
			<Router>
			
				<Layout className="layout" style={{height:'100%'}}>,
				
				
				{/*Header 头部区域*/}
				    <Header>
				      <div className="logo" />
					  {/*window.location.hash.split('/')[1] 获取url地址中的key,解决刷新停留上个地址问题*/}
				      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={window.location.hash.split('/')[1]}>
				        <Menu.Item key="home">
							<Link to="/home">首页</Link>
						</Menu.Item>
				        <Menu.Item key="movie">
							<Link to="/movie/in_theaters/1">电影</Link>
						</Menu.Item>
				        <Menu.Item key="about">
							<Link to="/about">关于</Link>
						</Menu.Item>
				      </Menu>
				    </Header>
					
					
					{/* 内容区域*/}
				    <Content style={{backgroundColor:'#fff',flex: 1 }}>
						<Route path="/home" component={HomeContainer}></Route>
						<Route path="/movie" component={MovieContainer}></Route>
						<Route path="/about" component={AboutContainer}></Route>
				    </Content>
					
					
					{/*底部区域*/}
				    <Footer style={{ textAlign: 'center' }}>kyyiu 练习 react</Footer>
				  </Layout>
				     
				
				 
			</Router>
		)
	}
	
}