import $ from 'jquery'

// 開始考試
const handleStartExammingNav = () => {
    $('#NavBar').animate({ left: -150 })

    //Start Examming 常處理
    $(document)
        .on("keydown", (e) => {
            e.preventDefault();
        })
        .on('contextmenu', (e) => {
            return false
        })

    // setTimeout(() => {
    //     $(document).off("keydown").off('contextmenu')
    // }, 2000)
}

const isLocalStorageSetOpen = (Status, Original) => {
    Status
        ? localStorage.setItem = Original
        : localStorage.setItem = () => {
            window.alert("禁止調適 Localstorage 資料")
            console.log("Plz do not modifiy the localStorage");
        }
}

export { handleStartExammingNav, isLocalStorageSetOpen }