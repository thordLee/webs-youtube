import React, { useEffect, useState } from 'react'
import Main from '../components/section/Main'
import VideoSearch from '../components/videos/VideoSearch'
import { useParams } from 'react-router-dom'

import { fetchFromAPI } from '../utils/api'

const Search = () => {

    const { searchID } = useParams();
    const [ videos, setVideos ] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);

    const [loading, setLoading] = useState(true);


    console.log(searchID);
    console.log(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${searchID}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
    useEffect(()=>{
        setVideos([]);
        fetchVideos(searchID);
        setLoading(false);

        /*
        fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${searchID}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
            )
            .then(response=>response.json())
            .then(result=>{
                console.log(result);
                setVideos(result.items);
            })
            .catch(error => console.log(error))

            */
    },[searchID]);

    const fetchVideos = (query, pageToken='')=>{
        fetchFromAPI(`search?part=snippet&q=${query}&pageToken=${pageToken}`)
            .then((data)=>{
                setNextPageToken(data.nextPageToken);
                setVideos((preVideo)=>[...preVideo, ...data.items]);
            })
            .catch((error) => {
                console.log('Error fetching data', error);
            })
    }

    const handleLoadMore = () => {
        if (nextPageToken) {
            fetchVideos(searchID, nextPageToken);
        }
    }

    const searchPageClass = loading?'isLoading':'isLoaded';

    return (
        <Main 
            title = "유투브 검색"
            description="유튜브 검색 결과 페이지입니다.">
            <section id='searchPage' className={searchPageClass}>
                <h2>😛 <em>{searchID}</em> 검색 결과</h2>
                <div className="video__inner search">
                    <VideoSearch videos={videos}/>
                </div>
                <div className="video__more">
                    {nextPageToken && (
                        <button onClick={handleLoadMore}>더보기</button>
                    )}
                </div>
            </section>
        </Main>
    )
}

export default Search
