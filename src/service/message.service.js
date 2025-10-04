module.exports = async (title, body, resCode, res) => {
    try {
        const Title = encodeURIComponent(title);
        const Body = encodeURIComponent(body);
        const StatCode = resCode || 200
        res.status(StatCode).redirect(`/message?title=${Title}&body=${Body}`);
    } catch (e) {
       console.error('could not send message due to: ',e) 
    }
}