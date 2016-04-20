exports.render = function(req, res){
	res.render('index', {
		title: 'Manuel Castro',
        messages: req.flash('error') || req.flash('info'),
        user: JSON.stringify(req.user)
	});
};