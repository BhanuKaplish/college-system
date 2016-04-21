exports.render = function(req, res){
	res.render('index', {
		title: 'College-System',
        messages: req.flash('error') || req.flash('info'),
        user: JSON.stringify(req.user)
	});
};