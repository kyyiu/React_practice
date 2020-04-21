import React from 'react'

import '../../css/MovieBox.css'

import {Rate} from 'antd'

export default class MovieItem extends React.Component{
	constructor(props) {
	    super(props)
		this.state= {
			
		}
	}
	
	render(){
		return(
			<div className='box' onClick={this.seeDetail}>
				<img src={this.props.images.small.replace('img9,doubanio.com','img1.doubanio.com')} className='img'/>
				<h4>电影名称{this.props.title}</h4>
				<h4>年份{this.props.year}</h4>
				<h4>电影类型{this.props.genres.join(',')}</h4>
				<Rate disabled defaultValue={this.props.rating.average / 2}/>
			</div>
		)
	}
	
	
	seeDetail=()=>{
		this.props.history.push('/movie/detail/' + this.props.id)
	}
}
