import $ from 'jquery'

// 處理Click Navbar部分的事件
const handleTargetId = (Id, NavLocation) => {
    switch (Id) {
        case "Avatar":
            break
        case "Home":
            $(`body`).fadeOut(500)
            setTimeout(() => {
                NavLocation("/home")
                $('body').fadeIn(0)
            }, 500)
            break
        case "Exam":
            $(`body`).fadeOut(500)
            setTimeout(() => {
                NavLocation('/exam')
                $('body').fadeIn(0)
            }, 500)
            break
        case "Statistics":
            break
        case "History":
            break
        case "Bookmarks":
            break
        case "Interactive":
            break
    }
}

//處理Click Navbtn部分的事件
const handleNavBtnClick = (e, NavBarOpen, NavLocation) => {
    if (NavBarOpen) {
        e.stopPropagation()
        handleTargetId(e.currentTarget.id.split("_")[2], NavLocation)
    }
};

//處理Click Centerbtn部分的事件
const handleCenterBtnClick = (e, NavBarOpen, NavLocation) => {
    if (!NavBarOpen) {
        e.stopPropagation()
        handleTargetId(e.currentTarget.id.split("_")[2], NavLocation)
    }
}

//處理 CenterBtn hover事件(使用sx判定backgroundPosition會導致刷新，一瞬間會有閃爍)
const handleCenterBtnHover = (e, Status) => {
    if (Status) {
        $(`#${e.currentTarget.id}_Background`).css('opacity', '1')
    }
}
const handleCenterBtnLeave = (e, Status) => {
    if (Status) {
        $(`#${e.currentTarget.id}_Background`).css('opacity', '0.2')
    }
}



export { handleNavBtnClick, handleCenterBtnClick, handleCenterBtnHover, handleCenterBtnLeave }