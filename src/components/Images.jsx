import React, { useEffect, useState } from 'react';
import Modals from './Modals';
import axios from 'axios';
import Loader from '../assets/loader.svg'
import InfiniteScroll from "react-infinite-scroll-component";
export default function Images() {
    const [photos, setPhotos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showRecommendation, setShowRecommendation] = useState(false)
    const [modalphoto, setModalphoto] = useState({});
    const [search, setSearch] = useState("");
    const [next, setNext] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const openModal = (photo) => {
        setModalphoto(photo);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }


    useEffect(() => {
        if (!search) {
            getRecent();
        } else {
            getAllData();
        }

    }, [search, next]);

    const getAllData = () => {
        axios
            .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&format=json&nojsoncallback=1&text=${search}&page=${next}&per_page=9`)
            .then((res) => {
                setTimeout(() => {
                    setPhotos(photos.concat(res.data.photos.photo));
                }, 1000)
            });
    };

    const getRecent = ()=>{
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getrecent&api_key=${process.env.REACT_APP_API_KEY}&format=json&nojsoncallback=1&page=${next}&per_page=9`)
                .then(res => {
                    setTimeout(() => {
                        setPhotos(photos.concat(res.data.photos.photo))
                    }, 1000)
                })
    }

    const handleChange = (event) => {
        setNext(1);
        setPhotos([])
        setSearch(event.target.value);
    };

    const fetchMoreData = () => {
        if (photos.length >= 1000) {
            sethasMore(false);
        } else {
            setNext(next + 1);
        }
    }

    const handleSearchSuggestion = () => {
        // setShowRecommendation(false);
        if(localStorage.getItem("suggestions")===null && search){
            let recommnendedArray = [];
            recommnendedArray.push(search)
            console.log(recommnendedArray);
            localStorage.setItem("suggestions",JSON.stringify(recommnendedArray));
        }else if(search){
            let suggestion=JSON.parse(localStorage.getItem("suggestions"))
            console.log(suggestion);
            suggestion.push(search);
            localStorage.setItem("suggestions",JSON.stringify(suggestion));
        }
    }

    const  removeSugesstion =  (item ) => {
        let suggestion=JSON.parse(localStorage.getItem("suggestions"))
        suggestion = suggestion.filter( value => value !== item );
        localStorage.setItem("suggestions", JSON.stringify(suggestion));
        setShowRecommendation(false);
    }   

    const handleFocus = () =>{
        setShowRecommendation(true);
        if(!search){
            setPhotos([])
            getRecent();
        }
    }

    return (
        <div className="bg-gray-100">
            <p className="font-serif text-6xl text-center pt-5 mb-5">Search Photos</p>
            <div>

            </div>
            <div className="sticky top-40 bg-white flex flex-col  mx-10 md:mx-96 shadow-xl">
                <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" onChange={handleChange} onFocus={handleFocus} onBlur={handleSearchSuggestion} />
                <div className="divide-y divide-light-blue-400" >
                    {
                        showRecommendation && JSON.parse(localStorage.getItem("suggestions"))?.slice(0,5).map((item,index)=>{
                            return <div className="px-3 flex flex-row justify-between items-center h-10" key={index}>
                                    {item}
                                <button onClick={() => removeSugesstion(item)} className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded" >clear</button>
                            </div>
                        })
                    }
                </div>    
            </div>
            
            <InfiniteScroll
                dataLength={photos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center">
                        <img src={Loader} className="animate-spin w-24 h-24" />
                    </div>
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                style={{ overflow: "hidden" }}
            >
                <div className="bg-gray-100 py-10">
                    <div className="container mx-auto pt-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
                            {photos.map((photo, index) => {
                                return (
                                    <div key={index}>
                                        <img key={index} onClick={() => openModal(photo)} className="w-96 h-96" src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Modals modalphoto={modalphoto} showModal={showModal} closeModal={closeModal} />
                </div>
            </InfiniteScroll>
        </div>
    )
}
