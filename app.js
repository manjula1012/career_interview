let express = require('express');
let app = express();

let axios = require('axios');

axios.get('https://jsonkeeper.com/b/N9OS')
    .then( res =>{
        let data = res.data;
        let currentDate = new Date().getTime();
        let hasTag = [];
        let noTag = [];
        data.forEach(rowIn => {
            let createdTime = new Date(rowIn.createdAt);
            let createTIme = createdTime.getTime();
            let diff = currentDate - createTIme;
            rowIn.isPrime = true;
            //check for prime
            for( let i=2; i< diff; i++){
                if(diff % i == 0){
                    rowIn.isPrime = false;
                    break;
                }
            }
            //segrigate array
            if(rowIn.tag?.name){                
                if(hasTag[rowIn.tag.name]?.length > 0){
                    hasTag[rowIn.tag.name].push(rowIn)
                } else {                    
                    hasTag[rowIn.tag.name] = rowIn;
                }
            } else {
                noTag.unshift(rowIn)       
            } 
        });
    })
    .catch(err=>{
        console.log('error', err);
    });