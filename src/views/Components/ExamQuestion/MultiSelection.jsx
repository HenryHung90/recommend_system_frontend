import { Exam_Container, History_Container } from "../../../common/MainStyle";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const MultiSelection = ({
    Type,
    uuid,
    options,
    handleSelectingOptions,
    paperAnswerSheet,
    studentAnswer,
    rightAnswer,
    checkAnswer,
}) => {
    // Review => History 的觀看作答狀況 // Exam => Examming 考試 // Retest => History 重新考試
    switch (Type) {
        case "Review":
            return (
                <FormGroup sx={History_Container.optionGroupStyle} name={uuid}>
                    {options.map((option, index) => {
                        if (option === null) {
                            return;
                        }
                        return (
                            <FormControlLabel
                                key={index + 1}
                                value={index + 1}
                                control={<Checkbox disabled size="medium" />}
                                label={option}
                                name={uuid}
                                checked={studentAnswer.includes(
                                    (index + 1).toString()
                                )}
                                sx={History_Container.optionRightAnswerBackground(
                                    rightAnswer.includes(
                                        (index + 1).toString()
                                    ),
                                    checkAnswer(studentAnswer, rightAnswer)
                                )}
                            />
                        );
                    })}
                </FormGroup>
            );
        case "Exam":
            return (
                <FormGroup sx={Exam_Container.optionGroupStyle} name={uuid}>
                    {options.map((option, index) => {
                        return (
                            <FormControlLabel
                                key={index + 1}
                                value={index + 1}
                                control={<Checkbox />}
                                label={option}
                                name={uuid}
                                onChange={handleSelectingOptions}
                                checked={paperAnswerSheet
                                    .split(",")
                                    .includes((index + 1).toString())}
                            />
                        );
                    })}
                </FormGroup>
            );
        case "Retest":
            return (
                <FormGroup
                    sx={History_Container.optionGroupStyle}
                    name={uuid}
                >
                    {options.map((option, index) => {
                        return (
                            <FormControlLabel
                                key={index + 1}
                                value={index + 1}
                                control={<Checkbox />}
                                label={option}
                                name={uuid}
                                onChange={handleSelectingOptions}
                            />
                        );
                    })}
                </FormGroup>
            );
    }
};

export default MultiSelection;
