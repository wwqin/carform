var express=require('C：express');
var app =express();
var fs = require('fs');
var querystring = require('querystring');
// var bodyParser = require('body-parser');

app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});
//注册
app.post('/rest',function(req,res){
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;  
    });
    req.on('end', function () {
        body = querystring.parse(body);  
        writeJson(body);
        res.end();
    });
});
//车辆登记
app.post('/restcar',function(req,res){
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;  
    });
    req.on('end', function () {
        body = querystring.parse(body);  
        carinput(body);
        res.end();
    });
});
 //登录
app.post('/login', function (req, res) {
    var body = "";
    var key_up;
    req.on('data', function (chunk) {
        body += chunk;  
    });
    req.on('end', function () {
        body = querystring.parse(body);  
        console.log(body.name,body.password,key_up);
        key_up=loginup(body.name,body.password);
        console.log(key_up);
        res.end();
    });
    res.send(key_up);
});
//删除
app.post('/delete', function (req, res) {
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;  
    });
    req.on('end', function () {
        body = querystring.parse(body);  
        deleteJson(body.name);
        res.end();
    });
    
});
//查找
app.get('/find', function(req, res) {
    fs.readFile('./data/car.json',function(err,data){
        if(err){
            return console.error(err);
        }
        res.send(data);
    })
});

var server = app.listen(8081,'localhost',function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("访问地址为 http://%s:%s", host, port)
 
});

function writeJson(params){
    fs.readFile('./data/person.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        person.data.push(params);
        person.total = person.data.length;
        console.log(person.data[1].age);
        var str = JSON.stringify(person);
        fs.writeFile('./data/person.json',str,function(err){
            if(err){
                console.error(err);
            }
        })
    })
};
//车辆登记函数
function carinput(params){
    fs.readFile('./data/car.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        person.data.push(params);
        person.total = person.data.length;
        console.log(person.data[1].age);
        var str = JSON.stringify(person);
        fs.writeFile('./data/car.json',str,function(err){
            if(err){
                console.error(err);
            }
        })
    })
};
//登录函数
function loginup(name,password){
    fs.readFile('./data/person.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var key=0;
        var person = data.toString();
        person = JSON.parse(person);
        var str = JSON.stringify(person);
        for(var i = 0; i < person.data.length;i++){
            // console.log(person.data[i].name,person.data[i].password);
            if(name == person.data[i].name){
                if(password == person.data[i].password){
                    key=1;
                    console.log(key);
                }
            }
        }
    })
    return this.key;
};
//删除函数
function deleteJson(id){
    fs.readFile('./data/person.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来删除
        for(var i = 0; i < person.data.length;i++){
            if(id == person.data[i].id){
                //console.log(person.data[i])
                person.data.splice(i,1);
            }
        }
        console.log(person.data);
        person.total = person.data.length;
        var str = JSON.stringify(person);
        //然后再把数据写进去
        fs.writeFile('./data/person.json',str,function(err){
            if(err){
                console.error(err);
            }
        })
    })
}