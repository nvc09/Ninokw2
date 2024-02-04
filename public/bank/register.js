const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/register';
exports.index = async(req, res, next) => {
	var { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');   

	var senderID = req.query.senderID,
		stk = String(Math.floor(Math.random() * (900000000)) + 1000000),
		name = req.query.name,
		password = makeid(8),
	   	userData = { 
			name: name,
			senderID: senderID,  
			data: {
				money: 500,
				STK: stk,
				debt: 0,
				password: password
			}
		};
	if (!dataBank.some(i => i.senderID == senderID)) {
		dataBank.push(userData);
		writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");
		return res.json({
			status: true,
			message: {
				noti: '𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠',
				STK: stk,
				name: name,
				money: 500,
				debt: 0,
				password: password
			}
		})
	}
	else {
		return res.json({
			status: false,
			message: '𝐁𝐚̣𝐧 𝐜𝐨́ 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐭𝐫𝐞̂𝐧 𝐡𝐞̣̂ 𝐭𝐡𝐨̂́𝐧𝐠 𝐫𝐨̂̀𝐢'
		})
	}
	function makeid(length) {
	    var result           = '';
	    var characters       = 'ABCDKCCzwKyY9rmBJGu48FrkNMro4AWtCkc1flmnopqrstuvwxyz0123456789';
	    var charactersLength = characters.length;
	    for ( var i = 0; i < length; i++ ) {
	      	result += characters.charAt(Math.floor(Math.random() * 
	 		charactersLength));
	   }
	   return result;
	}
}