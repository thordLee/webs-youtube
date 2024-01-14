import React, { useEffect, useState } from 'react'
import Main from '../components/section/Main'
import VideoSearch from '../components/videos/VideoSearch'

import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api'
import { CiBadgeDollar, CiMedal, CiRead } from 'react-icons/ci'

const Channel = () => {

    const {channelID} = useParams();
    const [ channelDetail, setChannelDetail]=useState();
    const [ channelVideo, setChannelVideo] = useState([]);
    const [loading, setLoading] = useState(true);

    const [ nextPageToken, setNextPageToken] = useState(null);

    useEffect(()=>{
        const fetchResult=async()=>{
            try {
                const data = await fetchFromAPI(`channels?part=snippet&id=${channelID}`);
                setChannelDetail(data.items[0]);

                const videosData = await fetchFromAPI(`search?channelId=${channelID}&part=snippet%2Cid&order=date`);
                setChannelVideo(videosData?.items);
                setNextPageToken(videosData?.nextPageToken);
            } catch (error) {
                console.log('Error fetching data : ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResult();

    }, [channelID]);

    const loadMoreVideos = async()=>{
        if (nextPageToken) {
            const videosData = await fetchFromAPI(`search?channelId=${channelID}&part=snippet%2Cid&order=date&pageToken=${nextPageToken}`);
            setChannelVideo(preVideos=>[...preVideos, ...videosData.items]);
            setNextPageToken(videosData?.nextPageToken);
        }
    }

    const channelPageClass = loading?'isLoading':'isLoaded';

    return (
        <Main 
            title = "유튜브 채널"
            description="유튜브 채널페이지입니다.">
            {channelDetail && (
                <section id="channel" className={channelPageClass}>
                    <div className="channel__header" style={{ backgroundImage: `url(${channelDetail.brandingSettings.image.bannerExternalUrl})` }}>
                        <div className="circle">
                            <img src={channelDetail.snippet.thumbnails.high.url} alt={channelDetail.snippet.title} />
                        </div>
                        <div className="channel__info">
                            <h3 className='title'>{channelDetail.snippet.title}</h3>
                            <p className='desc'>{channelDetail.snippet.description}</p>
                            <div className='info'>
                                <span><CiBadgeDollar />{channelDetail.statistics.subscriberCount}</span>
                                <span><CiMedal />{channelDetail.statistics.videoCount}</span>
                                <span><CiRead />{channelDetail.statistics.viewCount}</span>
                            </div>

                        </div>
                        <div className='channel__video video__inner search'>
                            <VideoSearch videos={channelVideo} />
                        </div>
                    </div>
                    <div className='channel__more'>
                            {nextPageToken && <button onClick={loadMoreVideos}>더 보기</button>}
                        </div>
                </section>
            )}
        </Main>
    )
}

export default Channel
