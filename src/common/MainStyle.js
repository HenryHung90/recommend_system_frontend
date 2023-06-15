const Main_Container = {
    Main_Container: () => {
        return (
            {
                width: "100vw",
                height: "100vh",
                display: "flex",
                maxWidth: "none !important",
                margin: "0 !important",
                padding: "0  !important",
            }
        )
    },
    Nav_Box: (NavBarOpen) => {
        return (
            {
                position: "absolute",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "rgba(0,0,0,0.5)",
                opacity: NavBarOpen ? "1" : "0",
                transitionDuration: "0.5s",
                zIndex: NavBarOpen ? "999" : "-100",
            }
        )
    }
}




export { Main_Container }