import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../../public/css/Tutorial.css';

export default class Tutorial extends Component {
  render () {
    const { title, imgURI } = this.props;
    return (
      <Card className='tutorial'>
        <CardMedia>
          <img src={imgURI} />
        </CardMedia>
        <CardTitle title={title} className='tutorial-media' />
      </Card>
    );
  }
}
