import React from 'react'

import {Button,Spin,Alert} from 'antd'

import fetchJSONP from 'fetch-jsonp'

export default class MovieDetail extends React.Component{
	constructor(props) {
	    super(props)
		this.state= {
			info: {},
			isloading: true
		}
	}
	
	
	componentWillMount(){
		fetchJSONP('https://douban.uieee.com/v2/movie/subject' + this.props.match.params.id)
		.then(res =>{
			res.json()
		}).then(data=>{
			this.setState({
				info: data,
				isloading: false
			})
		})
	}
	
	render(){
		return(
			<div>
				<Button type='primary' onClick={this.goBack}>
					&lt;  Back
				</Button>
				{this.renderInfo()}
			</div>
		)
	}
	
	goBack = ()=>{
		this.props.history.go(-1)
	}
	
	renderInfo = ()=>{
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
					<div style={{textAlign:'cneter'}}>
						<h1>{this.state.info.title}</h1>
						<img src={this.state.info.images.large.replace('img9,img1')}/>
						
					</div>
					<p style={{textIndent:'2em',lineHeight:'30px'}}>{this.state.info.summary}</p>
				</div>
			)
		}
	}
}