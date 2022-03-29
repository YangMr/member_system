/**
 * @author YangLing
 * @date 2022/3/29 11:26 AM
 */
const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url === "/api/list"){
        const jsonData = {
            code : 200,
            data : {
                list : [
                    {
                        id : 1,
                        name : "jack"
                    }
                ]
            }
        }
        res.end(JSON.stringify(jsonData))
    }

})

server.listen(3001)
