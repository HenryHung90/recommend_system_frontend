const Main_Container = (NavBarOpen) => {
    return (
        {
            width: "80vw",
            maxWidth: "1600px !important",
            height: "100vh",
            padding: "15px",
            overflowY: "auto",
            overflowX: "hidden",
            margin: "0 auto",
            transitionDuration: "0.5s",
            opacity: NavBarOpen ? "0.3" : "1",
        }
    ) 
}


export { Main_Container }