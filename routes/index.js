var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Rasith' });
});

module.exports = router;


/* Create Employee Service */

router.post('/test/hello/insertEmployee',function(req,res,next){
	console.log('hi');
	try{
		var reqObj = req.body;
		console.log(reqObj);
		req.getConnection(function(err,conn){
		if(err){
			console.error('SQL Connection Error : ',err);
			return next(err);
		}else{
			var insertSql = 'INSERT INTO employee SET ?';
			var insertValues = {
				"Emp_Name"	:	reqObj.empName,
				"Role_Id"	:	reqObj.roleId,
				"Dept_Id"	:	reqObj.depId
			};
			var query = conn.query(insertSql,insertValues,function(err,result){
				if(err){
					console.error('SQL Error : ',err);
					return next(err);
				}
				console.log(result);
				var Employee_Id = result.insertId;
				res.json({"Emp_Id:":Employee_Id});
			});
		}
		});
	}catch(ex){
		console.error("Internal Error"+ex);
		return next(ex);
	}
});