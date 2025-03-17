import './Footer.css';
import  Container from 'react-bootstrap/Container';
import  Row from 'react-bootstrap/Row'; /*Bootstrap imported to add responsiveness*/
import  Col  from 'react-bootstrap/Col';
function Footer()
{
    return (
  
        <footer className="footer">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} className="text-center">
                        <p> My Alley 2025.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );

}


export default Footer;