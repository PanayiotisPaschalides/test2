/*'use strict'
import axios from 'axios';
var Rates;
var People;
module.exports.GetRatings = (user) => {
    axios.get('/api/GetRating', {
        params:{
            User : user
        }
    })
    .then(res => { 
        Rates = res.data.Rates 
        People = res.data.People
        
    
})
console.log(Rates)
console.log(People)
    return user;
}
*/

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component';
class RatingComponent extends Component {

    static propTypes = {
        user: PropTypes.string,
        Reciever : PropTypes.string
    }
    constructor(props){
        super(props);
        this.state={
            logUser: this.props.user,
            RecieverUser: this.props.Reciever,
            rating: 0,
            People: 0,
            Rates: []

            

        }
        this.onStarClick = this.onStarClick.bind(this);
        
    }
    componentDidMount(){
        axios.get('/api/GetRating', {
            params:{
                User : this.state.RecieverUser
            }
        })
        .then(res => { this.setState({Rates : res.data.Rates,People : res.data.People})
        if (this.state.People !== 0){
            var Total = 0;
            for (var i = 0; i < this.state.People; i++) { 
                Total = Total + this.state.Rates[i]['rating'];
            }
            this.setState({rating: Total/this.state.People})
        }
    })
            
        }
        onStarClick(nextValue, prevValue, name) {
            this.setState({rating: nextValue});
            
          }
    render() {
        

    return (

      <div style={{fontSize: '30px'}}>
      <link rel="stylesheet" href="node_modules/react-star-rating/dist/css/react-star-rating.min.css"></link>
        {/*https://github.com/voronianski/react-star-rating-component */}
             <StarRatingComponent 
          name="rate1" 
          starCount={5}
          starColor={'#A66FA6'}
          value={this.state.rating}
          onStarClick={this.onStarClick}
        />
        
    </div>
    );
  }
}

export default RatingComponent;
