import React from 'react'
import { Layout, Menu } from 'antd';


import {Link,Route,Switch} from 'react-router-dom'
import MovieList from './MovieList.js'
import MovieDetail from './MovieDetail.js'

const { Content, Sider } = Layout;

export default class MovieContainer extends React.Component{
	constructor(props) {
	    super(props)
		this.state= {
			
		}
	}
	
	render(){
		return(
			<Layout style={{height:'100%'}}>
			  <Sider width={200} className="site-layout-background">
				<Menu
				  mode="inline"
				  defaultSelectedKeys={[window.location.hash.split('/')[2]]}
				  style={{ height: '100%', borderRight: 0 }}
				>
					<Menu.Item key="in_theaters">
						<Link to= '/movie/in_theaters/1'>正在热映</Link>
					</Menu.Item>
					<Menu.Item key="coming_soon">
						<Link to= '/movie/coming_soon/1'>即将上映</Link>
					</Menu.Item>
					<Menu.Item key="top50">
						<Link to= '/movie/top50/1'>Top50</Link>
					</Menu.Item>
				</Menu>
			  </Sider>
			  <Layout style={{ paddingLeft: '5px'}}>
				<Content
				  className="site-layout-background"
				  style={{
					backgroundColor: '#fff',
					padding: 10,
					margin: 0,
					minHeight: 280,
				  }}
				>
				  {/*在匹配路由规则的时候,这里提供两个参数*/}
				  {/*如果想从路由规则中,提取参数,需要this.props.match.params*/}
				  <Switch>
					<Route exact path='/movie/detail/:id' component={MovieDetail}></Route>
					<Route exact path='/movie/:type/:page' component={MovieList}></Route>
					
				  </Switch>
				</Content>
			  </Layout>
			</Layout>
		)
	}
}