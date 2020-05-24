import React, {Component, useState} from "react";
import {Form, Button, Container, Row, Col, Carousel, Card, CardDeck, CardGroup} from "react-bootstrap";
// import {Main_Nav} from "../Common-Comp/Main_Nav";
// import {SecondryNav} from "../Common-Comp/Secondry-Nav";


function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1573612664822-d7d347da7b80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="First slide"
                    width="800"
                    height="400"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.pinimg.com/originals/b1/68/2d/b1682d7c5579f8ce81b8df8088db43a1.jpg"
                    alt="Second slide"
                    width="800"
                    height="400"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://img.freepik.com/free-vector/big-fashion-shop-super-market-male-clothes-shopping-mall-interior-banner-with-copy-space_48369-11918.jpg?size=626&ext=jpg"
                    alt="Third slide"
                    width="800"
                    height="400"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
class HomePage extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>

                {/* <Main_Nav/> */}
                <ControlledCarousel/>

                    <Row style={{margin: '15px'}}>
                        <Col style={{marginTop: '5px'}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://s.alicdn.com/@sc01/kf/Ha6ffb5d425464d0cb2235d56244a8b889.jpg_300x300.jpg_.webp" width="300" height="300" />
                                <Card.Body className="text-center">
                                    <Card.Title>Cool Clothes And Others </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">in stock</Card.Subtitle>
                                    <Card.Text><strong>LKR: 100.50</strong></Card.Text>
                                    <Row>
                                        <Col><Button variant="primary"><i className="fas fa-cart-plus"></i>Add to cart</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col style={{marginTop: '5px'}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://colorlib.com/preview/theme/littlecloset/images/product_1.jpg" width="300" height="300" />
                                <Card.Body className="text-center">
                                    <Card.Title>Cool Clothes And Others </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">in stock</Card.Subtitle>
                                    <Card.Text><strong>LKR: 100.50</strong></Card.Text>
                                    <Row>
                                        <Col><Button variant="primary"><i className="fas fa-cart-plus"></i>Add to cart</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col style={{marginTop: '5px'}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://colorlib.com/preview/theme/littlecloset/images/product_3.jpg" width="300" height="300" />
                                <Card.Body className="text-center">
                                    <Card.Title>Cool Clothes And Others </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">in stock</Card.Subtitle>
                                    <Card.Text><strong>LKR: 100.50</strong></Card.Text>
                                    <Row>
                                        <Col><Button variant="primary"><i className="fas fa-cart-plus"></i>Add to cart</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col style={{marginTop: '5px'}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://colorlib.com/preview/theme/littlecloset/images/product_4.jpg" width="300" height="300" />
                                <Card.Body className="text-center">
                                    <Card.Title>Cool Clothes And Others </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">in stock</Card.Subtitle>
                                    <Card.Text><strong>LKR: 100.50</strong></Card.Text>
                                    <Row>
                                        <Col><Button variant="primary"><i className="fas fa-cart-plus"></i>Add to cart</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col style={{marginTop: '5px'}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://mirrormirror.lk/image/cache/catalog/Handbags/H961/9182655303_1430372067-560x636.jpg" width="300" height="300" />
                                <Card.Body className="text-center">
                                    <Card.Title>Cool Clothes And Others </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">in stock</Card.Subtitle>
                                    <Card.Text><strong>LKR: 100.50</strong></Card.Text>
                                    <Row>
                                        <Col><Button variant="primary"><i className="fas fa-cart-plus"></i>Add to cart</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col style={{marginTop: '5px'}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://mirrormirror.lk/image/cache/catalog/Shoes/MS423/3-440x500.gif" width="300" height="300" />
                                <Card.Body className="text-center">
                                    <Card.Title>Cool Clothes And Others </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">in stock</Card.Subtitle>
                                    <Card.Text><strong>LKR: 100.50</strong></Card.Text>
                                    <Row>
                                        <Col><Button variant="primary"><i className="fas fa-cart-plus"></i>Add to cart</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col style={{marginTop: '5px'}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://mirrormirror.lk/image/cache/catalog/Mens%20Clothing/MC123/3963000551_990353597-560x636.jpg" width="300" height="300" />
                                <Card.Body className="text-center">
                                    <Card.Title>Cool Clothes And Others </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">in stock</Card.Subtitle>
                                    <Card.Text><strong>LKR: 100.50</strong></Card.Text>
                                    <Row>
                                        <Col><Button variant="primary"><i className="fas fa-cart-plus"></i>Add to cart</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col style={{marginTop: '5px'}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://mirrormirror.lk/image/cache/catalog/Phone%20Accessories/PA263/00906767-440x500.jpg" width="300" height="300" />
                                <Card.Body className="text-center">
                                    <Card.Title>Cool Clothes And Others </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">in stock</Card.Subtitle>
                                    <Card.Text><strong>LKR: 100.50</strong></Card.Text>
                                    <Row>
                                        <Col><Button variant="primary"><i className="fas fa-cart-plus"></i>Add to cart</Button></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                {/* <SecondryNav/> */}
            </React.Fragment>

        );
    }

}

 export default HomePage;