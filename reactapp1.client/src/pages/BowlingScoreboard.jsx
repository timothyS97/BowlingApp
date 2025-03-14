import { useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import Alert from 'react-bootstrap/Alert';

function BowlingScoreboard() {
    // Initialize frames with 10 objects, each containing an empty rolls array.
    const initialFrames = Array.from({ length: 10 }, () => ({ rolls: [] }));
    const [frames, setFrames] = useState(initialFrames);
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

    // Formats rolls to display strikes (X) and spares (/)
    const formatFrameRolls = (rolls) => {
        const formatted = [];
        for (let i = 0; i < rolls.length; i++) {
            const roll = rolls[i];
            if (roll === 10) {
                formatted.push("X");
            } else if (i > 0 && rolls[i - 1] !== 10 && rolls[i - 1] + roll === 10) {
                formatted.push("/");
            } else {
                formatted.push(roll);
            }
        }
        return formatted;
    };

    // Reset handler that reinitializes the state variables.
    function handleReset() {
        setFrames(initialFrames);
        setCurrentFrameIndex(0);
    }

    // Handle a roll input given by a button click.
    function handleRollClick(pins) {
        if (pins < 0 || pins > 10) {
            alert("Please enter a valid number of pins (0-10).");
            return;
        }

        setFrames((prevFrames) => {
            const updatedFrames = [...prevFrames];
            const currentFrame = { ...updatedFrames[currentFrameIndex] };

            // Validation for frames 1-9.
            if (currentFrameIndex < 9) {
                if (currentFrame.rolls.length === 1 && currentFrame.rolls[0] + pins > 10) {
                    alert("The total for a frame cannot exceed 10.");
                    return prevFrames;
                }
            } else {
                // Tenth frame validations.
                if (currentFrame.rolls.length === 1 && currentFrame.rolls[0] !== 10 && currentFrame.rolls[0] + pins > 10) {
                    alert("In the tenth frame the sum of the first two rolls must not exceed 10 (unless the first roll is a strike).");
                    return prevFrames;
                }
                if (
                    currentFrame.rolls.length === 2 &&
                    currentFrame.rolls[0] === 10 &&
                    currentFrame.rolls[1] !== 10 &&
                    currentFrame.rolls[1] + pins > 10
                ) {
                    alert("In the tenth frame bonus rolls, if the first bonus roll isn't a strike, the final two rolls cannot exceed 10.");
                    return prevFrames;
                }
            }

            // Record the roll.
            currentFrame.rolls.push(pins);
            updatedFrames[currentFrameIndex] = currentFrame;

            // Advance the frame appropriately.
            if (currentFrameIndex < 9) {
                if (currentFrame.rolls[0] === 10 || currentFrame.rolls.length === 2) {
                    setCurrentFrameIndex(currentFrameIndex + 1);
                }
            } else {
                if (currentFrame.rolls.length === 2) {
                    const frameTotal = currentFrame.rolls[0] + currentFrame.rolls[1];
                    if (frameTotal < 10) {
                        setCurrentFrameIndex(currentFrameIndex + 1);
                    }
                }
                if (currentFrame.rolls.length === 3) {
                    setCurrentFrameIndex(currentFrameIndex + 1);
                }
            }

            return updatedFrames;
        });
    }

    // Calculate bonus for a strike.
    function getBonusForStrike(frameIndex) {
        let bonus = 0;
        if (frameIndex < 9) {
            const nextFrame = frames[frameIndex + 1];
            bonus += nextFrame.rolls[0] || 0;
            if (nextFrame.rolls[0] === 10) {
                if (frameIndex + 2 < frames.length) {
                    bonus += frames[frameIndex + 2].rolls[0] || 0;
                } else {
                    bonus += nextFrame.rolls[1] || 0;
                }
            } else {
                bonus += nextFrame.rolls[1] || 0;
            }
        }
        return bonus;
    }

    // Calculate bonus for a spare.
    function getBonusForSpare(frameIndex) {
        if (frameIndex + 1 < frames.length) {
            return frames[frameIndex + 1].rolls[0] || 0;
        }
        return 0;
    }

    // Calculate the total score including bonuses.
    function calculateTotalScore() {
        let total = 0;
        for (let i = 0; i < 10; i++) {
            const frame = frames[i];
            if (i < 9) {
                if (frame.rolls[0] === 10) {
                    total += 10 + getBonusForStrike(i);
                } else if ((frame.rolls[0] || 0) + (frame.rolls[1] || 0) === 10) {
                    total += 10 + getBonusForSpare(i);
                } else {
                    total += (frame.rolls[0] || 0) + (frame.rolls[1] || 0);
                }
            } else {
                total += frame.rolls.reduce((sum, pins) => sum + pins, 0);
            }
        }
        return total;
    }

    // Render the frames as a table.
    function showFrames() {
        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        {frames.map((_, idx) => (
                            <th key={idx} className="text-center">
                                Frame {idx + 1}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {frames.map((frame, idx) => (
                            <td key={idx} className="text-center">
                                {formatFrameRolls(frame.rolls).join(" | ")}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        );
    }

    // Determine possible pins that can be knocked down.
    const currentFrame = frames[currentFrameIndex] || { rolls: [] };
    let maxPinsAllowed = 10;
    if (currentFrameIndex < 9 && currentFrame.rolls.length === 1) {
        maxPinsAllowed = 10 - currentFrame.rolls[0];
    } else if (currentFrameIndex === 9 && currentFrame.rolls.length === 1 && currentFrame.rolls[0] !== 10) {
        maxPinsAllowed = 10 - currentFrame.rolls[0];
    }
    const possibleRolls =
        currentFrameIndex < 10
            ? [...Array(11).keys()].filter((pins) => pins <= maxPinsAllowed)
            : [];

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Bowling Scoreboard</h1>
                    {showFrames()}
                    <h2>Total Score: {calculateTotalScore()}</h2>
                </Col>
            </Row>
            {/* Button section for roll input */}
            <Row className="mt-3">
                <Col md={6}>
                    {currentFrameIndex < 10 && (
                        <div>
                            <p>Select the number of pins knocked down:</p>
                            <ButtonGroup>
                                {possibleRolls.map((pins) => (
                                    <Button
                                        key={pins}
                                        variant="primary"
                                        onClick={() => handleRollClick(pins)}
                                    >
                                        {pins}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>
                    )}
                </Col>
            </Row>
            {/* Reset button */}
            <Row className="mt-3">
                <Col>
                    <Button variant="danger" onClick={handleReset}>
                        Reset Scoreboard
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default BowlingScoreboard;
