import React from 'react'

import {Spin,Alert,Pagination} from 'antd'

import fetchJSONP  from 'fetch-jsonp'

import MovieItem from './movieItem.js'

export default class MovieList extends React.Component{
	constructor(props) {
	    super(props)
		this.state= {
			movies:[], //电影列表
			nowPage: parseInt(props.match.params.page) || 1, //当前显示第几页的数据
			pageSize: 14 , //每页显示多少条数据
			total: 0 ,//当前电影分类下总共多少条数据
			isloading: true,
			movieType: props.match.params.type //保存获取电影类型
		}
	}
	
	componentWillMount(){
		// {/*在React中,我们可以使用fetch API来获取数据,它是基于promise封装的*/}
		// fetch('http://www.liulongbin.top:3005/api/getlunbo')
		// .then(response=>{//当使用fetch API获取数据的时候,第一个then中,获取不到数据
		// // 第一个 .then中拿到的是一个Response对象,我们可以调用response.json()得到一个新的promise
		// 	return response.json()
		// })
		// .then(data =>{
		// 	console.log(data)
		// })
		
		// setTimeout(()=>{
		// 	//假设1秒后,数据获取回来了
		// 	console.log(1)
		// 	this.setState({
		// 		isloading:false //当数据获取后,把isloading加载中设置为false
		// 	})
			
		// },1000)
		this.loadMovieListByTypeAndPages()
		
	}
	
	
	//组件将要接收新属性
	componentWillReceiveProps(nextProps){
		//每当地址栏变化,重置state参数项,完毕后,可以重新发起数据请求
		this.setState({
			nowPage: parseInt(this.props.match.params.page) || 1, //当前显示第几页的数据
			isloading: true,
			movieType: this.props.match.params.type //保存获取电影类型
			
		}, function(){
			this.loadMovieListByTypeAndPages()
			
		})
		
	}
	
	render(){
		return(
			<div>
				{/*<h1>ML---{this.props.match.params.type}---{this.props.match.params.page}</h1>*/}
				{this.renderList()}
			</div>
		)
	}
	
	loadMovieListByTypeAndPages = ()=>{
		console.log('1')
		//注意,默认的window.fetch受到跨域限制,无法直接使用,这时使用第三方包fetch.jsonp来发送JSonP请求,用法和浏览器内置fetch完全兼容
		//npm i fetch-jsonp -S
		// fetch('https://douban.uieee.com/v2/movie/in_theaters')
		// .then(response => response.json())
		// .then(data => {console.log(data)})
		
		
		// fetchJSONP('https://douban.uieee.com/v2/movie/in_theaters')
		// .then(response => {return response.json()})
		// .then(data => {console.log(data)})
		
		//开始获取数据的索引
		const start = this.state.pageSize*(this.state.nowPage-1)
		const url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`
		// this.loadMovieListByTypeAndPages()
		
		fetchJSONP(url)
		.then(response => {return response.json()})
		.then(data => {console.log(data)
			this.setState({
				isloading: false,
				movies: data.subjects,
				total: data.total
			})
		})
		
		
		// const data = require('../../'+ this.state.movieType +'.json')
		// console.log(data)
		// setTimeout(()=>{
		// 	console.log(data.subjects)
		// 	this.setState({
		// 			isloading: false,
		// 			movies: data.subjects,
		// 			total: data.total
		// 		})
		// },1000)
	}
	
	renderList= ()=>{
		console.log(this.state.movies)
		if(this.state.isloading){
			return(
				<Spin tip="Loading...">
					<Alert
					message='正在请求电影列表'
					description='精彩内容,马上呈现'
					type='info'
					/>
				</Spin>
			)
		}else{
			return(
				<div>
					<div style={{display:'flex',felxWrap:'wrap'}}>
						{this.state.movies.map(item=>{
							return <MovieItem {...item} key = {item.id} history = {this.props.history}></MovieItem>
						})}
					</div>
					{/*分页*/}
					<Pagination defaultCurrent={this.state.nowPage} total={this.state.total}  onChange={this.pageChanged}/>
				</div>
			)
		}
	}

	pageChanged = (page)=>{
		// 这里使用了dom对象实现跳转,这样不好,最好用路由,进行编程导航
		// window.location.href = '/#/movie/' + this.state.movieType + '/' + page
		//使用react-router-dom实现编程式导航
		this.props.history.push('/movie/' + this.state.movieType + '/' + page)
	}
}