exports.UserId = () => {
    try {
        let id = 'usr_'
        const alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 16; i++) {
            id += alphaNumeric.charAt(Math.floor(Math.random() * alphaNumeric.length));
        }
        return id;
    } catch (e) {
        console.error('Error generating User ID:', e);
    }
}