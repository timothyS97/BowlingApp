import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function BowlingScoreForm() {
    // Each field's data is kept in state.
    const [formData, setFormData] = useState({
        score_average: '',
        total_pinfall: '',
        first_ball_average: '',
        second_ball_average: '',
        handicap: '',
        handicap_score: '',
        total_games: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    // Control the display of the response (alert) message.
    const [showAlert, setShowAlert] = useState(false);

    // Update state as user types.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': ''
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.error || 'Submission failed.');
            }
            setShowAlert(true);
        } catch (error) {
            console.error('Error during submission:', error);
            setResponseMessage('An error occurred while submitting the form.');
            setShowAlert(true);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mt-4">Enter Your Data</h2>
                    <Form onSubmit={handleSubmit}>
                        {/* Score input */}
                        <Form.Group controlId="formScoreAverage" className="mb-3">
                            <Form.Label>Score Average:</Form.Label>
                            <Form.Control
                                type="text"
                                name="score_average"
                                value={formData.score_average}
                                onChange={handleChange}
                                placeholder="Enter your score average"
                                required
                            />
                        </Form.Group>

                        {/* Total pinfall input */}
                        <Form.Group controlId="formTotalPinfall" className="mb-3">
                            <Form.Label>Total Pinfall:</Form.Label>
                            <Form.Control
                                type="text"
                                name="total_pinfall"
                                value={formData.total_pinfall}
                                onChange={handleChange}
                                placeholder="Enter your total pinfall"
                                required
                            />
                        </Form.Group>

                        {/* 1st ball avg speed */}
                        <Form.Group controlId="formFirstBallAvg" className="mb-3">
                            <Form.Label>First Ball Average Speed:</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_ball_average"
                                value={formData.first_ball_average}
                                onChange={handleChange}
                                placeholder="Enter your first ball average"
                            />
                        </Form.Group>

                        {/* 2nd ball avg speed */}
                        <Form.Group controlId="formSecondBallAvg" className="mb-3">
                            <Form.Label>Second Ball Average Speed:</Form.Label>
                            <Form.Control
                                type="text"
                                name="second_ball_average"
                                value={formData.second_ball_average}
                                onChange={handleChange}
                                placeholder="Enter your second ball average"
                            />
                        </Form.Group>

                        {/* handicap*/}
                        <Form.Group controlId="formHandicap" className="mb-3">
                            <Form.Label>Handicap:</Form.Label>
                            <Form.Control
                                type="text"
                                name="handicap"
                                value={formData.handicap}
                                onChange={handleChange}
                                placeholder="Enter your handicap"
                            />
                        </Form.Group>

                        {/* handicap score*/}
                        <Form.Group controlId="formHandicapScore" className="mb-3">
                            <Form.Label>Handicap Score:</Form.Label>
                            <Form.Control
                                type="text"
                                name="handicap_score"
                                value={formData.handicap_score}
                                onChange={handleChange}
                                placeholder="Enter your handicap score"
                            />
                        </Form.Group>

                        {/* total games */}
                        <Form.Group controlId="formTotalGames" className="mb-3">
                            <Form.Label>Total Games:</Form.Label>
                            <Form.Control
                                type="text"
                                name="total_games"
                                value={formData.total_games}
                                onChange={handleChange}
                                placeholder="Enter your total games"
                            />
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                    {/* Conditional alert to display response messages */}
                    {showAlert && (
                        <Alert
                            variant={responseMessage.toLowerCase().includes('error') ? 'danger' : 'success'}
                            className="mt-3"
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            {responseMessage}
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default BowlingScoreForm;