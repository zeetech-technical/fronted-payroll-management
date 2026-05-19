import { redirect } from "react-router";

async function authMiddleware({ context }:any) {
    // const request = context.request;
    // const token = request.headers.get("Authorization");
    // if (!token) {
        throw redirect("/");
    // }
 
}

export default authMiddleware;