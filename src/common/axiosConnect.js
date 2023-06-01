import axios from "axios"

const Connection = {
    testing: () => {
        return (
            axios({
                method: "post",
                url: "http://localhost:28102/testing"
            })
        )
    }
}


export { Connection }