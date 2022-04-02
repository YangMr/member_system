/**
 * @author YangLing
 * @date 2022/4/2 3:01 PM
 */
import dayjs from "dayjs"

function timeFormat(time){
  return dayjs(time).format("YYYY-MM-DD")
}

export default {
  timeFormat
}
// console.log(dayjs("2022-03-08T00:00:00.000Z").format("YYYY-MM-DD"))


