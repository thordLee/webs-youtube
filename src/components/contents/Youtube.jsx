import React from 'react'

import { youtubeText } from '../../data/youtube'
import { Link } from 'react-router-dom'


const Youtube = () => {
	return (
		<section id='website'>
			<h2>😮 지금 이 코딩을 영상으로</h2>
			<div className="video__inner overflow">
				{youtubeText.map((vide, key)=>(
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

export default Youtube
