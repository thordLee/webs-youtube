import React from 'react'

import { portfolioText } from '../../data/portfolio'
import { Link } from 'react-router-dom'


const Portfolio = () => {
	return (
		<section id='website'>
			<h2>😮 포트폴리오 만드는 방법을 공유합니다.</h2>
			<div className="video__inner overflow">
				{portfolioText.map((vide, key)=>(
				<div className="video" key={key}>
					<div className="video__thumb play__icon">
					<Link to={`/video/${vide.videoId}`}>
						<img src={vide.img} alt={vide.title} />
					</Link>
					</div>
				</div>
				))}
			</div>
		</section>
	)
}

export default Portfolio
