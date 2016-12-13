//创建飞机对象
var oStar=document.getElementById('startdiv')

var isMove=true
function PropFactory (){
	this.init=function(pos){
			console.log(propArr)
			var me=propArr[propArr.length-1]
				switch (me.type){
					case "accelerate" : me.style.background="green";break
					case "treble" : me.style.background="#03bbcc";break
					case "bigBoom" : me.style.background="red";break
					case "couple" : me.style.background="black";break
				}
				me.style.width=20+"px"
				me.style.height=20+"px"
				me.style.borderRadius="50%"
				me.style.opacity=1
				me.style.position="absolute"
				me.style.left=pos.x+"px"
				me.style.top=pos.y+"px"
				me.existTime=50
				me.shineSpeed=0.05
				me.shine=function(){
					if(this.style.opacity<=0.3||this.style.opacity>1){
						this.shineSpeed*=-1
					}
					this.style.opacity=parseFloat(this.style.opacity)+this.shineSpeed
					return this
				}
				me.get=function(index){
					this.remove()
					propArr.splice(index,1)
					return this
				}
				me.kill=function(index){
					this.remove()
					propArr.splice(index,1)
					return this
				}
		}
	this.accelerate=function(){
		var accelerateBox=document.createElement('div')
			accelerateBox.type="accelerate"
			oStar.appendChild(accelerateBox)
			propArr.push(accelerateBox)
			return this
	}
	this.treble=function(){
		var trebleBox=document.createElement('div')
			trebleBox.type="treble"
			oStar.appendChild(trebleBox)
			propArr.push(trebleBox)
			return this
	}
	this.bigBoom=function(){
		var bigBoomBox=document.createElement('div')
			bigBoomBox.type="bigBoom"
			oStar.appendChild(bigBoomBox)
			propArr.push(bigBoomBox)
			return this
	}
	this.couple=function(){
		var coupleBox=document.createElement('div')
			coupleBox.type="couple"
			oStar.appendChild(coupleBox)
			propArr.push(coupleBox)
			return this
	}
}
	var propfac=new PropFactory()
//飞机构造函数
function Plan(){
	
}
Plan.prototype={
	parent:document.getElementById('startdiv'),
	bind:function(){
		var that=this
//		starDiv.addEventListener('mousemove',move,true)//move 怎么传参数
		oStar.onmousemove=function(){
			if(isMove){
				var e=window.event||arguments[0]
				that.moveX(e.clientX)
				that.moveY(e.clientY)
				if(secondPlane.self.style.display=="block"){
					secondPlane.adjustmentPlane()
				}
			}
		}
		return this
	},
	moveX:function(mouseX){
		var x =mouseX-500-this.self.width/2
		if(x>0&&x<320-this.self.width){
			this.self.style.left=x+"px"
		}
		return this
	},
	moveY:function(mouseY){
		var y=mouseY-this.self.height/2
		if(y>0&&y<568-this.self.height){
			this.self.style.top=y+"px"
		}
		return this
	},
	fire:function(){
	},
	starPosition:function(_img,posX,posY){
		_img.style.left=posX+"px"
		_img.style.top=posY+"px"
	},
	over:function(){
		clearInterval(timer)
		var main=document.getElementById('maindiv')
		var end=document.getElementById('enddiv')
			main.style.display="block"
			end.style.display="block"
			oStar.onmousemove=""
	}
}
//我方飞机构造函数
function OurPlan(){
	this.self=document.createElement('img')
	this.init=function(initData){
		this.parent.appendChild(this.self)
		this.self.src=initData.src
		this.self.style.position="absolute"
		this.self.width=initData.width
		this.self.width=initData.width
		this.self.src=initData.src
		this.self.accelerateTime=100
		this.self.onclick=function(){
			pause=!pause
			isMove=!isMove
		}
		this.starPosition(this.self,initData.starX,initData.starY)
		return this
	}
	this.killSelf=function(){
		this.self.remove();
		return this
	}
	this.adjustmentPlane=function(){
		this.self.style.left=myPlane.self.offsetLeft+50+"px"
		this.self.style.top=myPlane.self.offsetTop+"px"
		return this
	}
}
	OurPlan.prototype=new Plan();
	var myPlane= new OurPlan().init({width:50,height:50,src:"image/wdfj.gif",starX:135,starY:485}).bind()
function  EnemyPlan(width,height,imgsrc){
	this.self=document.createElement('img')
	this.init=function(initData){
		this.parent.appendChild(this.self)
		this.self.classname="enemy"
		this.self.style.position="absolute"
		this.self.width=initData.width
		this.self.height=initData.height
		this.self.src=initData.src
		this.speed=initData.speed
		this.self.planetype=initData.type
		this.self.ph=this.self.planetype*2
		this.self.explodeTime=20
		this.self.prop=initData.isprop;
		this.self.treble=initData.istreble;
		this.self.bigboom=initData.isbigBoom;
		this.self.couple=initData.isCouple;
		this.starPosition(this.self,initData.starX,initData.starY)
		this.self.boom=function(index){
			var starPh=this.planetype*2
			if(this.ph==starPh){
				if(this.planetype==1){
					this.src=this.src.replace('1.png','2.gif')
					this.ph--
				}else{
					this.src=this.src.replace('1.png','2.png')
					this.ph--
				}
			}else if(this.ph==1){
				if(this.planetype==1){
					this.src=this.src.replace('2.gif','3.png')
					this.ph--
				}else{
					this.src=this.src.replace('2.png','3.gif')
					this.ph--
				}
				explodeArr.push(this)
				EnemyArr.splice(index,1)
				if(this.prop){
					if(Math.round(Math.random()*10)<4){
						propfac.accelerate().init({x:this.offsetLeft+this.offsetWidth/2,y:this.offsetTop+this.offsetHeight/2})
					}else if(this.treble){
						if(Math.round(Math.random()*10)<4){
						propfac.treble().init({x:this.offsetLeft+this.offsetWidth/2,y:this.offsetTop+this.offsetHeight/2})
						}else if(this.bigboom){
							if(Math.round(Math.random()*10)<4){
						propfac.bigBoom().init({x:this.offsetLeft+this.offsetWidth/2,y:this.offsetTop+this.offsetHeight/2})	
							}else{
						propfac.couple().init({x:this.offsetLeft+this.offsetWidth/2,y:this.offsetTop+this.offsetHeight/2})
							}
						}
					}
				}
			}else{
				this.ph--
			}
		}
		return this
	}
	this.moveY=function(index){
		var me=this.self
		me.style.top=me.offsetTop+this.speed+"px"
		if(me.offsetTop>oStar.offsetHeight){
			this.del(index)
		}
		return this
	}
	this.del=function(index){
		EnemyArr.splice(index,1)
		this.self.remove()
		return this
	}
}
	EnemyPlan.prototype=new Plan();
function CreateEnemyPlane(){
	this.createSmall=function(){
		return new EnemyPlan().init({width:20,height:20,src:"image/small1.png",starX:Math.random()*270,starY:0,speed:10,type:1,isprop:false})
	}
	this.createMid=function(){
		return new EnemyPlan().init({width:100,height:100,src:"image/mid1.png",starX:Math.random()*220,starY:0,speed:15,type:3,isprop:false})
	}
	this.createBig=function(){
		return new EnemyPlan().init({width:150,height:150,src:"image/big1.png",starX:Math.random()*170,starY:0,speed:10,type:5,isprop:true,istreble:true,isbigBoom:true,isCouple:true})
	}
}
var factory=new CreateEnemyPlane();
function  CreateBullet(){
	this.bullet=document.createElement('img')
	this.init=function(initData){
		this.bullet.style.position="absolute"
		this.bullet.classname="bullets"
		oStar.appendChild(this.bullet)
		this.bullet.width=initData.width
		this.bullet.height=initData.height
		this.bullet.src=initData.src
		this.bullet.style.left=initData.plane.x+"px"
		this.bullet.style.top=initData.plane.y+"px"
		this.bullet.boom=function(index){
			this.remove();
			bulletArr_top.splice(index,1)
		}
		return this
	}
}
CreateBullet.prototype={
	movetop:function(bullet,arr){
		bullet.style.top=bullet.offsetTop-22+"px"
		if(bullet.offsetTop<-22){
			arr.shift().bullet.remove()
		}
		return this
	},
	movebottom:function(){
		return this
	},
}
		//参数都可以写到config文件中
		var times=1;//敌机计数
		var bulletArr_top=[]
		var bulletArr_bottom=[]
		var EnemyArr=[]
		var mainPositionY=0
		var isAccelerate=false
		var bulletFrequency=4;
		var bulletCount=1;
		var explodeArr=[]
		var propArr=[]
		var trebleFire=false
		var trebleTime=50
		var pause=false
		var bigBoom=false
		var bigBoomTime=10
	    var secondPlane=new CreateSecondPlane()
	    var secondPlaneTime =50
		var timer = setInterval(function(){
			if(!pause){
				//添加趣味
				(function(){
					if(isAccelerate){
						if(myPlane.self.accelerateTime>=0){
							oStar.style.backgroundPositionY=mainPositionY+"px"
							mainPositionY+=50
							myPlane.self.accelerateTime--
						}else{
							isAccelerate=false
							myPlane.self.accelerateTime=100
						}
					}else{
						var mainSpeed=1;
						oStar.style.backgroundPositionY=mainPositionY+"px"
						mainPositionY+=1
					}
				})();
				//检测敌机碰撞
				(function(){
					for(var i in bulletArr_top)	{
						for(var j in EnemyArr){
							var flag=detection(bulletArr_top[i].bullet,EnemyArr[j].self,i,j)
							if(flag){
								break;
							}
						}
					}
				})();
				//检测我方飞机碰撞
				(function(){
					//我的位置
					var mypos={x:myPlane.self.offsetLeft+myPlane.self.offsetWidth/2,y:myPlane.self.offsetTop+myPlane.self.offsetHeight/2}
					//敌机检测
					for(var i in EnemyArr){
						var enemypos={x:EnemyArr[i].self.offsetLeft+EnemyArr[i].self.offsetWidth/2,y:EnemyArr[i].self.offsetTop+EnemyArr[i].self.offsetHeight/2}
						if(Math.sqrt(Math.pow(mypos.x-enemypos.x,2)+Math.pow(mypos.y-enemypos.y,2))<=Math.max(EnemyArr[i].self.offsetWidth/2,myPlane.self.offsetWidth/2)){
							myPlane.over()
						}
					}
					//道具碰撞检测
					propArr.forEach(function(item,index,arr){
						var propPos={y:item.offsetTop+item.offsetHeight/2,x:item.offsetLeft+item.offsetWidth/2}
						if(Math.sqrt(Math.pow(propPos.x-mypos.x,2)+Math.pow(propPos.y-mypos.y,2))<=(myPlane.self.offsetWidth/2)*Math.sqrt(2)){
							switch(item.type){
								case "accelerate" : isAccelerate=true;break
								case "treble" : trebleFire=true;break
								case "bigBoom" : pause=true ;break
								case "couple" : 
										  secondPlane.adjustmentPlane()
										  secondPlane.self.style.display="block"
								;break
							}
							item.get();
						}
					})
				})();
				//操作子弹
				(function(){
					//先移动已有的我方子弹
					
					for(var i=0;i<bulletArr_top.length;i++){
						bulletArr_top[i].movetop(bulletArr_top[i].bullet,bulletArr_top)
					}
					//添加新的子弹
					if(bulletCount%bulletFrequency==0){ 
						bulletArr_top.push(new CreateBullet().init({width:10,height:20,src:"image/bullet1.png",plane:{x:myPlane.self.offsetLeft+myPlane.self.offsetWidth/2-4,y:myPlane.self.offsetTop-20}}))
						if(secondPlane.self.style.display=="block"){
							if(secondPlaneTime>=0){
						bulletArr_top.push(new CreateBullet().init({width:10,height:20,src:"image/bullet1.png",plane:{x:secondPlane.self.offsetLeft+secondPlane.self.offsetWidth/2-4,y:secondPlane.self.offsetTop-20}}))
							secondPlaneTime--
							}else{
								secondPlane.self.style.display="none"
								secondPlaneTime=50
							}
						}
						if(trebleFire){
							if(trebleTime>=0){
						bulletArr_top.push(new CreateBullet().init({width:10,height:20,src:"image/bullet1.png",plane:{x:myPlane.self.offsetLeft+myPlane.self.offsetWidth/2-34,y:myPlane.self.offsetTop-20}}))
						bulletArr_top.push(new CreateBullet().init({width:10,height:20,src:"image/bullet1.png",plane:{x:myPlane.self.offsetLeft+myPlane.self.offsetWidth/2+24,y:myPlane.self.offsetTop-20}}))
							if(secondPlane.self.style.display=="block"){
								if(secondPlaneTime>=0){
						bulletArr_top.push(new CreateBullet().init({width:10,height:20,src:"image/bullet1.png",plane:{x:secondPlane.self.offsetLeft+secondPlane.self.offsetWidth/2-34,y:secondPlane.self.offsetTop-20}}))
						bulletArr_top.push(new CreateBullet().init({width:10,height:20,src:"image/bullet1.png",plane:{x:secondPlane.self.offsetLeft+secondPlane.self.offsetWidth/2+24,y:secondPlane.self.offsetTop-20}}))
								}
							}
							trebleTime--
							}else{
								trebleTime=50;
								trebleFire=false;
							}
						}
					}
					bulletCount++
				})();
				//操作敌机
				(function(){
					//移动敌机
						EnemyArr.forEach(function(item,index,arr){
							item.moveY(index)
						})
					//生产敌机
					randomPlaneClass()
				})();
				//处理爆炸飞机
				(function(){
					explodeArr.forEach(function(item,index,arr){
						if(item.explodeTime==0){
							item.remove()
							arr.splice(index,1)
						}
						item.explodeTime--
					})
				})();
				//移动道具
				(function(){
//					propfac.accelerate().init()
					for(var i in propArr){
						propArr[i].style.top=propArr[i].offsetTop+2+"px"
						propArr[i].shine()
						if(propArr[i].offsetTop>oStar.offsetHeight){
							propArr[i].kill(i)
						}
					}
				})();
//				//道具发光
//				(function(){
//					
//				})();
			}
			else{//暂停时候的动作
				(function(){
					if(bigBoomTime==10){
						for(var i in EnemyArr){
							if(EnemyArr[i].self.planetype==1){
								EnemyArr[i].self.src=EnemyArr[i].self.src.replace(/[\d]\.[a-z]{3}/g,'3.png')
							}else{
								EnemyArr[i].self.src=EnemyArr[i].self.src.replace(/[\d]\.[a-z]{3}/g,'3.gif')	
							}
						}
						EnemyArr.forEach(function(item,index,arr){
							explodeArr.push(item.self)
							arr.splice(index,1)
						})
						bigBoomTime--
					}else if(bigBoomTime>=0){
						bigBoomTime--
					}else{
						explodeArr.forEach(function(item,index,arr){
							arr.splice(index,1)
							item.remove()
						})
						pause=false
						bigBoomTime=10
						console.log(EnemyArr)
					}
				})()
			}
		},50)
	function  randomPlaneClass(){
		if(times>1000){
			times=1
		}
		if(times%120==0){
			EnemyArr.push(factory.createBig()) 
			times++
		}else if(times%60==0){
			EnemyArr.push(factory.createMid())
			times++
		}else if(times%10==0){
			EnemyArr.push(factory.createSmall())
			times++
		}
		times++
	}
	function detection(bullet,plane,index1,index2){
		var  bulletCenter= {x:bullet.offsetLeft+bullet.offsetWidth/2,y:bullet.offsetTop}
		var  planeCenter={x:plane.offsetLeft+plane.offsetWidth/2,y:plane.offsetTop+plane.offsetHeight/2}
		if(Math.abs(bulletCenter.x-planeCenter.x)<=plane.offsetWidth/2&&bulletCenter.y<=planeCenter.y){

				bullet.boom(index1)
				plane.boom(index2)
				return true
		}
		return false
	}
	function CreateSecondPlane(){
		//单例
		if(!CreateSecondPlane.instence){
		  CreateSecondPlane.instence=new OurPlan().init({width:50,height:50,src:"image/wdfj.gif"})
		  CreateSecondPlane.instence.self.style.display="none"
		}
		return  CreateSecondPlane.instence
	}
	function jixu(){
		location.reload()
	}

