import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function UserEntryForm() {
    // Each field's data is kept in state.
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        registration_date: ''
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
                        {/* First Name Input */}
                        <Form.Group controlId="formFirstName" className="mb-3">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </Form.Group>

                        {/* Last Name Input */}
                        <Form.Group controlId="formLastName" className="mb-3">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </Form.Group>

                        {/* Phone Number Input */}
                        <Form.Group controlId="formPhoneNumber" className="mb-3">
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        </Form.Group>

                        {/* Email Input */}
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
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

export default UserEntryForm;