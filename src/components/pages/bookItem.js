import React from 'react';
import {Row, Col, Well, Button, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component{
constructor(){
  super();
  this.state = {
    isClicked:false
  };
}
onReadMore(){
  this.setState({
    isClicked:true
  })
}
handleCart(){
  const book = [...this.props.cart, {
    _id: this.props._id,
    title: this.props.title,
    description: this.props.description,
    images: this.props.images,
    price: this.props.price,
    quantity:1
  }]
  //CHECK IF CART IS renderEmpty
  if(this.props.cart.length > 0){
    //CART IS NOT EMPTY
    let _id= this.props._id;

    let cartIndex = this.props.cart.findIndex(function(cart){
      return cart._id === _id;
    })
    //IF RETURNS -1 THERE AR ENO ITEMS ITH SAME ID
    if(cartIndex === -1){
      this.props.addToCart(book);
    } else {
      //WE NEED TO UPDATE QUANTITY
      this.props.updateCart(_id, 1, this.props.cart);

    }
  } else {
    //CART IS EMPTY
    this.props.addToCart(book);

  }
}

  render() {
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.images} style={{height: '100px', width: '100px'}} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h6>{this.props.title}</h6>
            <p>{(this.props.description.length> 50 && !this.state.isClicked)?(this.props.description.substring(0,50)):(this.props.description)}
              <btton className="link" onClick={this.onReadMore.bind(this)}>
                {(!this.state.isClicked && this.props.description !== null && this.props.description.length > 50)?('...read more'):('')}
              </btton>
            </p>
            <h6>usd.{this.props.price}</h6>
            <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}
function mapStateToProps(state){
  return {
    cart: state.cart.cart
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToCart: addToCart,
    updateCart: updateCart,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
