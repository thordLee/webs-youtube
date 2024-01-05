import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

const Today = (props) => {

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(()=>{
			setLoading(false);
		}, 400);
	}, []);

	const todayClass = loading ? 'isLoading':'isLoaded';

	return (
		<section id={props.id} className={todayClass}>
			<div className="today__inner">
				<div className="today__thumb play__icon">
					<Link to={props.videos[0].page}>
						<img src={props.videos[0].img} alt={props.videos[0].title} />
					</Link>
				</div>
				<div className="today__text">
					<span className='today'>today!</span>
					<h3 className='title'>
						<Link to={props.videos[0].page}>
							{props.videos[0].title}
						</Link>
					</h3>
					<p className='desc'>{props.videos[0].desc}</p>
					<div className='info'>
						<span className='author'>
							<Link to={`/channel/${props.videos[0].channelId}`}>
								{props.videos[0].author}
							</Link>
						</span>
						<span className='date'>{props.videos[0].date}</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Today
