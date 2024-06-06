export const blurHash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['";

export function getRoomID(userID_1, userID_2) {
    // this function will sort the ids when creating a room so that it will always return the same
    // messages regardless of which user accesses their messages
    const sortedIDs = [userID_1, userID_2].sort();
    const roomID = sortedIDs.join("-");
    
    return roomID;
}