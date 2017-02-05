/* GET 'about us' page */
module.exports.about = function(req, res) {
    res.render('generic-text', {
        title: 'About Loc8r',
        content: 'FlexerzApp was created to help people find places to sit down and get a ...'
    });
};
