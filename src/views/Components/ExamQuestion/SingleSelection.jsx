import { Exam_Container, History_Container } from "../../../common/MainStyle";

import {
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
} from "@mui/material";

const SingleSelection = ({
    Type,
    uuid,
    handleSelectingOptions,
    options,
    paperAnswerSheet,
    studentAnswer,
    rightAnswer,
    checkAnswer,
}) => {
    // Review => History 的觀看作答狀況 // Exam => Examming 考試 // Retest => History 重新考試
    switch (Type) {
        case "Review":
            return (
                <FormControl sx={History_Container.optionGroupStyle}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name={uuid}
                    >
                        {options.map((option, index) => {
                            if (option !== null) {
                                return (
                                    <FormControlLabel
                                        key={index + 1}
                                        value={index + 1}
                                        control={
                                            <Radio size="medium" disabled />
                                        }
                                        label={option}
                                        checked={studentAnswer.includes(
                                            (index + 1).toString()
                                        )}
                                        sx={History_Container.optionRightAnswerBackground(
                                            rightAnswer.includes(
                                                (index + 1).toString()
                                            ),
                                            checkAnswer(
                                                studentAnswer,
                                                rightAnswer
                                            )
                                        )}
                                    />
                                );
                            }
                        })}
                    </RadioGroup>
                </FormControl>
            );
        case "Exam":
            return (
                <FormControl sx={Exam_Container.optionGroupStyle}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name={uuid}
                        onChange={handleSelectingOptions}
                    >
                        {options.map((option, index) => {
                            if (option !== null) {
                                return (
                                    <FormControlLabel
                                        key={index + 1}
                                        value={index + 1}
                                        control={<Radio size="small" />}
                                        label={option}
                                        checked={
                                            parseInt(paperAnswerSheet) ===
                                            index + 1
                                        }
                                    />
                                );
                            }
                        })}
                    </RadioGroup>
                </FormControl>
            );
        case "Retest":
            return (
                <FormControl sx={Exam_Container.optionGroupStyle}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name={uuid}
                        onChange={handleSelectingOptions}
                    >
                        {options.map((option, index) => {
                            if (option !== null) {
                                return (
                                    <FormControlLabel
                                        key={index + 1}
                                        value={index + 1}
                                        control={<Radio size="small" />}
                                        label={option}
                                    />
                                );
                            }
                        })}
                    </RadioGroup>
                </FormControl>
            );
    }
};

export default SingleSelection;
