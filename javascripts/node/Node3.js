<!-- "use strict";!function(){function t(t,e){return null!=t?t:e}function e(t){this.garden=t,this.reset()}function i(t){this.nodes=[],this.container=t,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.started=!1,this.nightmode=!1,window.addEventListener("mousedown",function(t){i.m=15}),window.addEventListener("mouseup",function(t){i.m=0}),1!==n&&(this.canvas.style.transform="scale("+1/n+")",this.canvas.style.transformOrigin="0 0"),this.canvas.id="nodegarden";var i=new e(this);i.m=0,i.update=function(){},i.reset=function(){},i.render=function(){},i.x=Number.MAX_SAFE_INTEGER,i.y=Number.MAX_SAFE_INTEGER,document.addEventListener("mousemove",function(t){i.x=t.pageX*n,i.y=t.pageY*n}),document.documentElement.addEventListener("mouseleave",function(t){i.x=Number.MAX_SAFE_INTEGER,i.y=Number.MAX_SAFE_INTEGER}),this.nodes.unshift(i),this.resize(),this.container.appendChild(this.canvas)}e.prototype.reset=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=e.x,n=e.y,s=e.vx,h=e.vy,o=e.m;this.x=t(i,Math.random()*this.garden.width),this.y=t(n,Math.random()*this.garden.height),this.vx=t(s,.5*Math.random()-.25),this.vy=t(h,.5*Math.random()-.25),this.m=t(o,2.5*Math.random()+.5)},e.prototype.addForce=function(t,e){this.vx+=t*e.x/this.m,this.vy+=t*e.y/this.m},e.prototype.distanceTo=function(t){var e=t.x-this.x,i=t.y-this.y,n=Math.sqrt(Math.pow(e,2)+Math.pow(i,2));return{x:e,y:i,total:n}},e.prototype.update=function(){this.x+=this.vx,this.y+=this.vy,(this.x>this.garden.width+50||this.x<-50||this.y>this.garden.height+50||this.y<-50)&&this.reset()},e.prototype.squaredDistanceTo=function(t){return(t.x-this.x)*(t.x-this.x)+(t.y-this.y)*(t.y-this.y)},e.prototype.collideTo=function(t){t.vx=t.m*t.vx/(this.m+t.m)+this.m*this.vx/(this.m+t.m),t.vy=t.m*t.vy/(this.m+t.m)+this.m*this.vy/(this.m+t.m),this.reset()},e.prototype.render=function(){this.garden.ctx.beginPath(),this.garden.ctx.arc(this.x,this.y,this.getDiameter(),0,2*Math.PI),this.garden.ctx.fill()},e.prototype.getDiameter=function(){return this.m};var n=window.devicePixelRatio;i.prototype.start=function(){this.playing||(this.playing=!0,this.render(!0))},i.prototype.stop=function(){this.playing&&(this.playing=!1)},i.prototype.resize=function(){this.width=window.innerWidth*n,this.height=window.innerHeight*n,this.area=this.width*this.height,this.nodes.length=Math.sqrt(this.area)/25|0,this.canvas.width=this.width,this.canvas.height=this.height,this.nightMode?this.ctx.fillStyle="#ffffff":this.ctx.fillStyle="#000000";for(var t=0;t<this.nodes.length;t++)this.nodes[t]||(this.nodes[t]=new e(this))},i.prototype.toggleNightMode=function(){this.nightMode=!this.nightMode,this.nightMode?(this.ctx.fillStyle="#ffffff",document.body.classList.add("nightmode")):(this.ctx.fillStyle="#000000",document.body.classList.remove("nightmode"))},i.prototype.render=function(t){var e=this;if(this.playing){t&&requestAnimationFrame(function(){e.render(!0)}),this.ctx.clearRect(0,0,this.width,this.height);for(var i,n,s=0;s<this.nodes.length-1;s++){i=this.nodes[s];for(var h=s+1;h<this.nodes.length;h++){n=this.nodes[h];var o=i.squaredDistanceTo(n),r=3*(i.m*n.m)/o,a=100*r;if(!(.025>a))if(o<=(i.m/2+n.m/2)*(i.m/2+n.m/2))i.m<=n.m?i.collideTo(n):n.collideTo(i);else{var d=i.distanceTo(n),c={x:d.x/d.total,y:d.y/d.total};this.ctx.beginPath(),this.nightMode?this.ctx.strokeStyle="rgba(191,191,191,"+(1>a?a:1)+")":this.ctx.strokeStyle="rgba(63,63,63,"+(1>a?a:1)+")",this.ctx.moveTo(i.x,i.y),this.ctx.lineTo(n.x,n.y),this.ctx.stroke(),i.addForce(r,c),n.addForce(-r,c)}}}for(s=0;s<this.nodes.length;s++)this.nodes[s].render(),this.nodes[s].update()}};var s=window.devicePixelRatio,h=document.getElementById("container"),o=document.getElementsByClassName("moon")[0],r=new i(h);r.start();var a=new Date;(a.getHours()>18||a.getHours()<6)&&r.toggleNightMode();var d=0;h.addEventListener("click",function(t){d++,d>r.nodes.length-1&&(d=1),r.nodes[d].reset({x:t.pageX*s,y:t.pageY*s,vx:0,vy:0})}),o.addEventListener("click",function(){r.toggleNightMode()}),window.addEventListener("resize",function(){r.resize()})}(); -->
;
'use strict';
jQuery(window).load(function() {
	(function() {
		'use strict';

		function defined(a, b) {
			return a != null ? a : b;
		}

		function Node(garden) {
			this.garden = garden;
			this.reset();
		}
		Node.prototype.reset = function() {
			var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var x = _ref.x;
			var y = _ref.y;
			var vx = _ref.vx;
			var vy = _ref.vy;
			var m = _ref.m;
			this.x = defined(x, Math.random() * this.garden.width);
			this.y = defined(y, Math.random() * this.garden.height);
			this.vx = defined(vx, Math.random() * 0.5 - 0.25);
			this.vy = defined(vy, Math.random() * 0.5 - 0.25);
			this.m = defined(m, Math.random() * 2.5 + 0.5);
		};
		Node.prototype.addForce = function(force, direction) {
			this.vx += force * direction.x / this.m;
			this.vy += force * direction.y / this.m;
		};
		Node.prototype.distanceTo = function(node) {
			var x = node.x - this.x;
			var y = node.y - this.y;
			var total = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
			return {
				x: x,
				y: y,
				total: total
			};
		};
		Node.prototype.update = function() {
			this.x += this.vx;
			this.y += this.vy;
			if (this.x > this.garden.width + 50 || this.x < -50 || this.y > this.garden.height + 50 || this.y < -50) {
				// if node over screen limits - reset to a init position
				this.reset();
			}
		};
		Node.prototype.squaredDistanceTo = function(node) {
			return (node.x - this.x) * (node.x - this.x) + (node.y - this.y) * (node.y - this.y);
		};
		Node.prototype.collideTo = function(node) {
			node.vx = node.m * node.vx / (this.m + node.m) + this.m * this.vx / (this.m + node.m);
			node.vy = node.m * node.vy / (this.m + node.m) + this.m * this.vy / (this.m + node.m);
			this.reset();
		};
		Node.prototype.render = function() {
			this.garden.ctx.beginPath();
			this.garden.ctx.arc(this.x, this.y, this.getDiameter(), 0, 2 * Math.PI);
			this.garden.ctx.fill();
		};
		Node.prototype.getDiameter = function() {
			return this.m;
		};
		var pixelRatio$1 = window.devicePixelRatio;

		function NodeGarden(container) {
			this.nodes = [];
			this.container = container;
			this.canvas = document.createElement('canvas');
			this.ctx = this.canvas.getContext('2d');
			this.started = false;
			this.nightmode = false;
			window.addEventListener('mousedown', function(e) {
				mouseNode.m = 15;
			});
			window.addEventListener('mouseup', function(e) {
				mouseNode.m = 0;
			});
			if (pixelRatio$1 !== 1) {
				// if retina screen, scale canvas
				
				//this.canvas.style.transform = 'scale(' + 1 / pixelRatio$1 + ')';
				this.canvas.style.transform = 'scale(' + 1  + ')';
				this.canvas.style.transformOrigin = '0 0';
			}
			this.canvas.id = 'nodegarden';
			// Add mouse node
			var mouseNode = new Node(this);
			mouseNode.m = 0;
			mouseNode.update = function() {};
			mouseNode.reset = function() {};
			mouseNode.render = function() {};
			// Move coordinates to unreachable zone
			mouseNode.x = Number.MAX_SAFE_INTEGER;
			mouseNode.y = Number.MAX_SAFE_INTEGER;
			document.addEventListener('mousemove', function(e) {
				mouseNode.x = e.pageX * pixelRatio$1;
				mouseNode.y = e.pageY * pixelRatio$1;
			});
			document.documentElement.addEventListener('mouseleave', function(e) {
				mouseNode.x = Number.MAX_SAFE_INTEGER;
				mouseNode.y = Number.MAX_SAFE_INTEGER;
			});
			this.nodes.unshift(mouseNode);
			this.resize();
			this.container.appendChild(this.canvas);
		}
		NodeGarden.prototype.start = function() {
			if (!this.playing) {
				this.playing = true;
				this.render(true);
			}
		};
		NodeGarden.prototype.stop = function() {
			if (this.playing) {
				this.playing = false;
			}
		};
		NodeGarden.prototype.resize = function() {
			this.width = window.innerWidth * pixelRatio$1;
			this.height = window.innerHeight * pixelRatio$1;
			this.area = this.width * this.height;
			// calculate nodes needed
			this.nodes.length = Math.sqrt(this.area) / 25 | 0;
			// set canvas size
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			if (this.nightMode) {
				this.ctx.fillStyle = '#ffffff';
			} else {
				this.ctx.fillStyle = '#ffffff';
			}
			// create nodes
			for (var i = -100; i < this.nodes.length; i++) {
				if (this.nodes[i]) {
					continue;
				}
				this.nodes[i] = new Node(this);
			}
		};
		NodeGarden.prototype.toggleNightMode = function() {
			this.nightMode = !this.nightMode;
			if (this.nightMode) {
				this.ctx.fillStyle = '#ffffff';
				document.body.classList.add('nightmode');
			} else {
				this.ctx.fillStyle = '#000000';
				document.body.classList.remove('nightmode');
			}
		};
		NodeGarden.prototype.render = function(start) {
			var _this = this;
			if (!this.playing) {
				return;
			}
			if (start) {
				requestAnimationFrame(function() {
					_this.render(true);
				});
			}
			// clear canvas
			this.ctx.clearRect(0, 0, this.width, this.height);
			// update links
			var nodeA, nodeB;
			for (var i = 0; i < this.nodes.length - 1; i++) {
				nodeA = this.nodes[i];
				for (var j = i + 1; j < this.nodes.length; j++) {
					nodeB = this.nodes[j];
					var squaredDistance = nodeA.squaredDistanceTo(nodeB);
					// calculate gravity force
					var force = 3 * (nodeA.m * nodeB.m) / squaredDistance;
					var opacity = force * 100;
					if (opacity < 0.025) {
						continue;
					}
					if (squaredDistance <= (nodeA.m / 2 + nodeB.m / 2) * (nodeA.m / 2 + nodeB.m / 2)) {
						// collision: remove smaller or equal - never both of them
						if (nodeA.m <= nodeB.m) {
							nodeA.collideTo(nodeB);
						} else {
							nodeB.collideTo(nodeA);
						}
						continue;
					}
					var distance = nodeA.distanceTo(nodeB);
					// calculate gravity direction
					var direction = {
						x: distance.x / distance.total,
						y: distance.y / distance.total
					};
					// draw gravity lines
					this.ctx.beginPath();
					if (this.nightMode) {
						this.ctx.strokeStyle = 'rgba(191,191,191,' + (opacity < 1 ? opacity : 1) + ')';
					} else {
						this.ctx.strokeStyle = 'rgba(191,191,191,' + (opacity < 1 ? opacity : 1) + ')';
					}
					this.ctx.moveTo(nodeA.x, nodeA.y);
					this.ctx.lineTo(nodeB.x, nodeB.y);
					this.ctx.stroke();
					nodeA.addForce(force, direction);
					nodeB.addForce(-force, direction);
				}
			}
			// render and update nodes
			for (i = 0; i < this.nodes.length; i++) {
				this.nodes[i].render();
				this.nodes[i].update();
			}
		};
		var pixelRatio = window.devicePixelRatio;
		var $container = document.getElementById('container');
		var $moon = document.getElementsByClassName('moon')[0];
		var nodeGarden = new NodeGarden($container);
		// start simulation
		nodeGarden.start();
		// trigger nightMode automatically
		var date = new Date();
		if (date.getHours() > 18 || date.getHours() < 6) {
			nodeGarden.toggleNightMode();
		}
		var resetNode = 0;
		$container.addEventListener('click', function(e) {
			resetNode++;
			if (resetNode > nodeGarden.nodes.length - 1) {
				resetNode = 1;
			}
			nodeGarden.nodes[resetNode].reset({
				x: e.pageX * pixelRatio,
				y: e.pageY * pixelRatio,
				vx: 0,
				vy: 0
			});
		});
		$moon.addEventListener('click', function() {
			nodeGarden.toggleNightMode();
		});
		window.addEventListener('resize', function() {
			nodeGarden.resize();
		});
	})();
});;
var $ = jQuery;
$(document).ready(function() {
	jQuery(document).ready(function($) {
		$('#myCarousel').carousel({
			interval: 4000
		});
		// handles the carousel thumbnails
		$('[id^=carousel-selector-]').click(function() {
			var id_selector = $(this).attr("id");
			var id = id_selector.substr(id_selector.length - 1);
			id = parseInt(id);
			$('#myCarousel').carousel(id);
			$('[id^=carousel-selector-]').removeClass('selected');
			$(this).addClass('selected');
		});
		// when the carousel slides, auto update
		$('#myCarousel').on('slid', function(e) {
			var id = $('.item.active').data('slide-number');
			id = parseInt(id);
			$('[id^=carousel-selector-]').removeClass('selected');
			$('[id=carousel-selector-' + id + ']').addClass('selected');
		});
		//when the videos carousel slides, update the appropriate thumbnail
		$('#views-bootstrap-carousel-1').on('slid.bs.carousel', function() {
			var idx = $(this).find('.active.item').index();
			//reset all of the video thumbnails
			$('.video-list ul li').removeClass('active');
			//set the active thumbnail (add 1 to idx since nth-child is indexed from 1 instead of 0)
			$('.video-list ul li:nth-child(' + (idx + 1) + ')').addClass('active');
		});
		$('.carousel-thumb').click(function(e) {
			e.preventDefault();
			var idx = $(this).attr('data-index');
			console.log(idx);
			$('#views-bootstrap-carousel-1').carousel(idx * 1);
		});
		//set the first video thumbnail to active
		$('.video-list ul li:first-child').addClass('active');
	});
	var $topCarousel = $('#top_carousel');
	$topCarousel.carousel();
	// handles the carousel thumbnails
	$('.carousel-selector').click(function() {
		var $this = $(this);
		var id = $this.data("slide");
		markActiveCarouselItems($topCarousel, id);
		$topCarousel.carousel(id);
	});
	// when the carousel slides, auto update
	$topCarousel.on('slid.bs.carousel', function(e) {
		var id = $('.carousel-inner .item.active', $topCarousel).data('slide-number');
		markActiveCarouselItems($topCarousel, id);
	});
	var $monthlyStaffPickItems = $('.monthly_staff_pick_list');
	$monthlyStaffPickItems.click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var $activeMspImageContainer = $('#active_msp_image_container');
		var thumbUrl = $this.data('image_url');
		$('img', $activeMspImageContainer).attr('src', thumbUrl);
		return false;
	})
});
var markActiveCarouselItems = function($topCarousel, id) {
	$('.video-list .carousel-selector', $topCarousel).removeClass('selected');
	$('.video-list li.item').removeClass('active');
	$('.video-list #carousel-selector-' + id).addClass('selected').closest('li.item').addClass('active');
};;