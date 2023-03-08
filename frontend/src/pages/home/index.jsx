import React, { useEffect, useState } from 'react';
import FastAPIClient from '../../client';
import config from '../../config';
import DiaryTable from "../../components/DiaryTable"
import DashboardHeader from "../../components/DashboardHeader";
import Footer from "../../components/Footer";
import Loader from '../../components/Loader';

const client = new FastAPIClient(config);


const Home = () => {

     const [loading, setLoading] = useState(true)
     const [diaries, setDiaries] = useState([])
     const [searchValue, setSearchValue] = useState("chicken")

     useEffect(() => {
          // FETCH THE DIARIES
          fetchDiaries()
     }, [])


     const fetchDiaries = (search) => {

          if (searchValue?.length <= 0 && search)
               return alert("Please Enter Search Text")

          // SET THE LOADER TO TURE
          setLoading(true)

          // GET THE DIARIES FROM THE API
          client.getDiaries(searchValue).then((data) => {
               setLoading(false)

               // SET THE DIARIES DATA
               setDiaries(data?.results)
          });
     }


     if (loading)
          return <Loader />

     return (
          <>
               <section className="bg-black ">
                    <DashboardHeader />

                    <div className="container px-5 py-12 mx-auto lg:px-20">

                         <div className="flex flex-col flex-wrap pb-6 mb-12 text-white ">
                              <h1 className="mb-6 text-3xl font-medium text-white">
                                   No Smoking Diary
                              </h1>
                              {/* <!-- This is an example component --> */}
                              <div className="container flex justify-center items-center mb-6">
                                   <div className="relative w-full max-w-xs m-auto">
                                        <input
                                             type="text"
                                             onChange={(e) => setSearchValue(e.target.value)}
                                             className={`text-indigo-500 z-20 hover:text-indigo-700 h-14 w-full max-w-xs m-auto pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none`} placeholder="Search ..." />
                                        <div className="absolute top-2 right-2">
                                             <button onClick={() => fetchDiaries(true)} className="h-10 w-20 text-white rounded bg-indigo-500 hover:bg-indigo-600">Search</button>
                                        </div>
                                   </div>
                              </div>
                              {/* <p className="text-base leading-relaxed">
              Sample diaries...</p> */}
                              <div className="mainViewport">
                                   <DiaryTable
                                        diaries={diaries}
                                   />
                              </div>
                         </div>
                    </div>
                    <Footer />
               </section>
          </>
     )
}

export default Home;