"use strict"
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';
function handleRender(req, res){
   axios.get('http://localhost:3001/books')
   .then(function(response){
     // var myHtml = JSON.stringify(response.data);
     // res.render('index', {myHtml});

     //STEP 1: CREATE A REDUX STORE ON THE Server
     const store= createStore(reducers,{"books":{"books":response.data}})
     //STEP2: GET INITAL STATE FROM STORE
     const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,
     '<\\/script').replace(/<!--/g,'<\\!--');
     //STEP 3: IMPLEMENT REACT-ROUTER ON TH ESERVER TO INTERCEPT CLIENT REQUEST ND DEFINE WHAT TO TO WITH THEM
     const Routes ={
       routes:routes,
       location:req.url
     }
     match(Routes, function(error,redirect, props){
       if(error){
         res.status(500).send("Error fullfulling the request");
       } else if(redirect){
         res.status(302, redirect.pathname + redirect.search)
       } else if(props){
         const reactComponent = renderToString(
           <Provider store={store}>
             <RouterContext {...props} />
           </Provider>
         )
         res.status(200).render('index',{reactComponent, initialState})
       } else{
         res.status(404).send("Not found")
       }
     })



   })
   .catch(function(err){
   console.log('#Initial Server-side rendering error', err);
   })
}
module.exports = handleRender;
