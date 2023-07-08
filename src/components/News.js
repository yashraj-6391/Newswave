import React, { useEffect,useState } from 'react'

import NewsItem from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News=(props)=> {

  const[articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[page,setPage]=useState(1);
  const[totalResults,setTotalResults]=useState(0)
   

  const capitlizeFirstLetter = (string) => {
    return ' ' + string.charAt(0).toUpperCase() + string.slice(1);
  }

    const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }

 useEffect(()=>{
    updateNews();
   document.title = `${capitlizeFirstLetter(props.category)} - NewsMonkey`
 },[])

  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();

  // }

  // const handlePreviousClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {

    

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setLoading(true);
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
     };

  
    return (
      <>

        <div className='container my-3'>
          {loading && <Spinner />}
          <h2 className='text-center' style={{ margin: '40px 0px',marginTop:'90px' }}>NewsMonkey -  Top Headlines on
            {capitlizeFirstLetter(props.category)}</h2>


          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner></Spinner>}
          >

            <div className='container'>

              <div className='row'>
                {articles.map((element) => {
                  return <div className='col-md-4 my-2'>
                    <NewsItem key={element.url} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                      imageUrl={element.urlToImage ? element.urlToImage : 'https://i.ytimg.com/vi/Rf0ro0R1EHE/maxresdefault.jpg'} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>

            </div>

          </InfiniteScroll>

        </div>
      </>
    )

}

News.defaultProps = {
  country: 'in',
  category: 'general',
  totalResults: 0

}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}

export default News;