import { useState, useEffect } from 'react'
import React from 'react'

import { Connection } from '../../../../common/axiosConnect';

import { Box, Button, Container, Checkbox, Select, MenuItem, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Input, FormHelperText, FormControlLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';

const PaperQuestionSettingDialog = ({ open, close }) => {

}

const AddQuestionDialog = ({ open, close }) => {

    //題目敘述
    const [questionDescription, setQuestionDescription] = useState("")

    //類型（單選多選）
    const [questionType, setQuestionType] = useState("1")
    const handleChangeQuestionType = e => {
        setQuestionType(e.target.value)
    }
    //屬性 (html css javascript)
    const [questionAttribute, setQuestionAttribute] = useState('html')
    const handleChangeQuestionAttribute = e => {
        setQuestionAttribute(e.target.value)
    }
    const [correctOption, setCorrectOption] = useState("")
    //選項內容
    const [option_1, setOption_1] = useState("")
    const [option_2, setOption_2] = useState("")
    const [option_3, setOption_3] = useState("")
    const [option_4, setOption_4] = useState("")
    const [option_5, setOption_5] = useState("")

    return (
        <Dialog
            open={open}
            onClose={close}
            keepMounted
            fullWidth={true}
            maxWidth={"md"}
        >
            <DialogTitle fontSize={36}>新增題目</DialogTitle>
            <DialogContent sx={{
                padding: '10px 100px'
            }}>
                <DialogTitle textAlign={'center'}>基本設定</DialogTitle>
                <FormControl variant="standard" fullWidth margin='normal'>
                    <TextField variant='outlined' label='題目敘述' multiline rows={4} value={questionDescription} onChange={e => setQuestionDescription(e.target.value)} />
                    <FormHelperText id="my-helper-text">請寫下完整題目敘述</FormHelperText>
                </FormControl>
                <FormControl variant="standard" fullWidth margin='normal'>
                    <InputLabel>題目類型</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        value={questionType}
                        onChange={handleChangeQuestionType}
                        label="題目類型"
                    >
                        <MenuItem value={"1"}>單選</MenuItem>
                        <MenuItem value={"2"}>多選</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" fullWidth margin='normal'>
                    <InputLabel>題目屬性</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        value={questionAttribute}
                        onChange={handleChangeQuestionAttribute}
                        label="題目類型"
                    >
                        <MenuItem value={"html"}>html</MenuItem>
                        <MenuItem value={"css"}>css</MenuItem>
                        <MenuItem value={"javascript"}>javascript</MenuItem>
                    </Select>
                </FormControl>
                <DialogTitle textAlign={'center'}>選擇輸入</DialogTitle>
                {[
                    { value: option_1, set: setOption_1 },
                    { value: option_2, set: setOption_2 },
                    { value: option_3, set: setOption_3 },
                    { value: option_4, set: setOption_4 },
                    { value: option_5, set: setOption_5 }
                ].map((option, index) => {
                    return (
                        <Box sx={{ display: 'flex' }}>
                            <FormControlLabel control={<Checkbox />} label={"正解"} />
                            <FormControl variant="standard" fullWidth margin='normal'>
                                <InputLabel>選項{index}</InputLabel>
                                <Input type='text' value={option.value} onChange={e => option.set(e.target.value)} />
                                <FormHelperText id="my-helper-text">不填視作無此選項</FormHelperText>
                            </FormControl>
                        </Box>
                    )
                })
                }
            </DialogContent>
            <DialogActions>
                <Button>送出</Button>
                <Button onClick={close}>取消</Button>
            </DialogActions>
        </Dialog>
    )
}

const Quizzes = ({ setLoading }) => {
    //所有題目(包含正確回答數、總回答數)
    const [paperQuestionQuery, setpaperQuestionQuery] = useState([]);

    // Dialog Open
    const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false)
    const [paperQuestionSettingDialogOpen, setPaperQuestionSettingDialogOpen] = useState(false)

    // DataGrid 欄位名稱
    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'question', headerName: '題目', width: 350 },
        { field: 'category', headerName: '分類', width: 100 },
        { field: 'correct_nums', headerName: '正確數', width: 120 },
        { field: 'answer_nums', headerName: '總答題數', width: 160 },
        { field: 'wrong_rate', headerName: '錯誤率', width: 120 },
    ];

    const handleQuestionClick = e => {
        console.log(e)
    }
    const handleAddQuestion = e => {
        setAddQuestionDialogOpen(open => !open)
    }

    useEffect(() => {
        setLoading(true);
        Connection.getDashboardTeacher(localStorage.getItem("token")).then(
            res => {
                console.log(res);
                res.data.result.forEach((value, index) => {
                    value.id = index + 1
                    value.category = value.category === 1 ? "單選" : "多選"
                    value.wrong_rate = CountingParsent(value.answer_nums, value.correct_nums)

                })
                setpaperQuestionQuery(res.data.result);
                setLoading(false)
                //answer_num 總回答數
                //correct_num 正確回答數
            }
        );
    }, []);

    return (
        <>
            <AddQuestionDialog open={addQuestionDialogOpen} close={handleAddQuestion} />
            <PaperQuestionSettingDialog open={paperQuestionSettingDialogOpen} />
            <Container
                sx={{
                    overflowY: 'auto',
                    height: '75vh'
                }}>
                <Box sx={{
                    height: 50
                }}>
                    <Button variant='outlined' startIcon={<AddIcon />} onClick={handleAddQuestion}>新增題目</Button>
                </Box>
                <DataGrid
                    rows={paperQuestionQuery}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 50, 100]}
                    disableColumnSelector
                    onRowClick={handleQuestionClick}
                />
            </Container>
        </>
    )
};

//計算 parsent
function CountingParsent(answer_nums, correct_nums) {
    if (answer_nums === 0) {
        return "0%"
    }
    return ((answer_nums - correct_nums) / answer_nums * 100).toFixed(2) + "%"
}


export default Quizzes;
