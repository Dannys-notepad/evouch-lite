exports.signPage = async (req, res) => {
    res.render('sign');
}

exports.messagePage = async (req, res) => {
    try {
        let { title, body } = req.query
        title = title || 'Nothing';
        body = body || 'Nothing to display';
        res.render('message', { title, body });
    } catch (e) {
        console.error(e)
    }
}