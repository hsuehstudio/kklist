import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { 
	Progress,
	Alert,
	Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption,
	Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
	ListGroup, ListGroupItem,
	Breadcrumb, BreadcrumbItem
} from "reactstrap";

let _setting = {
	url: "https://api.kkbox.com/v1.1/",
	song: "https://kklist.000webhostapp.com/song.php",
	token: "uPL7OaJCr5ZicIQ4fPbudg==",
	delay: 30,
	max: 10
},
_timer = {
	progress: null,
	player: null
},
_storage = window.localStorage,
_favorite = _storage.getItem( "favorite" ) ? JSON.parse( _storage.getItem( "favorite" ) ) : [],
_playlist = _storage.getItem( "playlist" ) ? JSON.parse( _storage.getItem( "playlist" ) ) : [],
_categorie = _storage.getItem( "categorie" ) ? _storage.getItem( "categorie" ) : null,
_id = _storage.getItem( "id" ) ? _storage.getItem( "id" ) : null,
_sound = new Audio( "/sound.mp3" ),
_slides = [
	{
		src: "images/banner-1.jpg",
		header: "快速創建歌單",
		altText: "沒時間又想建立喜歡的歌單",
		caption: "沒時間又想建立喜歡的歌單"
	},
	{
		src: "images/banner-2.jpg",
		header: "二十多種曲風",
		altText: "綜合、華語、西洋、韓語、日語...等",
		caption: "綜合、華語、西洋、韓語、日語...等"
	},
	{
		src: "images/banner-3.jpg",
		header: "輕鬆匯出清單",
		altText: "將喜愛清單匯出成文字檔，以利於用其他工具轉換成Apple Music或Spotify的歌單",
		caption: "將喜愛清單匯出成文字檔，以利於用其他工具轉換成Apple Music或Spotify的歌單"
	}
];

class Index extends Component
{
	constructor( props )
	{
		super( props );
		this.state = {
			categories: [],
			activeIndex: 0
		}
		this.next = this.next.bind( this );
		this.previous = this.previous.bind( this );
		this.goToIndex = this.goToIndex.bind( this );
		this.onExiting = this.onExiting.bind( this );
		this.onExited = this.onExited.bind( this );
	};

	componentWillMount()
	{
		fetch( _setting[ "url" ] + "new-release-categories?territory=TW", {
			method: "GET",
			headers: { "Authorization": "Bearer " + _setting[ "token" ] }
		})
		.then( res => res.json() )
		.then( response => this.setState({ categories: response[ "data" ] }) );
	};

	next()
	{
		if ( this.animating ) return;
		const nextIndex = this.state.activeIndex === _slides.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	};

	previous()
	{
		if ( this.animating ) return;
		const nextIndex = this.state.activeIndex === 0 ? _slides.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	};

	goToIndex( newIndex )
	{
		if ( this.animating ) return;
		this.setState({ activeIndex: newIndex });
	};

	onExiting()
	{
		this.animating = true;
	};

	onExited()
	{
		this.animating = false;
	};

	render()
	{
		const { activeIndex } = this.state;
		const slides = _slides.map( item => {
			return (
				<CarouselItem onExiting={ this.onExiting }  onExited={ this.onExited } key={ item.src }>
					<img src={ item.src } alt={ item.altText } />
					<CarouselCaption className="d-block d-md-block" captionText={ item.caption } captionHeader={ item.header } />
				</CarouselItem>
			);
		});
		const categories = this.state.categories.map( ( item, index ) => <ListGroupItem tag="a" href={ "/list/" + item.id } key={ index }>{ item.title }</ListGroupItem> );
		return (
			<div>
				<Carousel activeIndex={ activeIndex } next={ this.next } previous={ this.previous }>
					<CarouselIndicators items={ _slides } activeIndex={ activeIndex } onClickHandler={ this.goToIndex } />
					{ slides }
					<CarouselControl direction="prev" directionText="Previous" onClickHandler={ this.previous } />
					<CarouselControl direction="next" directionText="Next" onClickHandler={ this.next } />
				</Carousel>
				<div className="container marketing">
					<h3 className="pb-3 mb-4 border-bottom">有以下困惱嗎？</h3>
					<div className="row">
						<div className="col-lg-4 col-md-4">
							<img className="rounded-circle" width="140" height="140" src="images/mic.jpg" alt="" />
							<h4>KTV點歌</h4>
							<p>想找適合自己的歌唱，而茫茫歌海中如何挑選</p>
						</div>
						<div className="col-lg-4 col-md-4">
							<img className="rounded-circle" width="140" height="140" src="images/run.jpg" alt="" />
							<h4>慢跑健身</h4>
							<p>運動過程中想聽歌，但找不到自己喜歡的歌單</p>
						</div>
						<div className="col-lg-4 col-md-4">
							<img className="rounded-circle" width="140" height="140" src="images/dj.jpg" alt="" />
							<h4>DJ放歌</h4>
							<p>覺得自己腦袋音樂量不足夠，苦無時間慢慢聽</p>
						</div>
					</div>
					<h3 className="pb-3 mb-4 border-bottom">快選分類</h3>
					<ListGroup>
						{ categories }
					</ListGroup>
					<br />
					<h3 className="pb-3 mb-4 border-bottom">特色</h3>
					<div className="row featurette">
						<div className="col-md-3">
							<h4>快速輪播</h4>
							<p>可以自定輪播時間，最久30秒換歌，搭車也可以輕鬆挑歌</p>
						</div>
						<div className="col-md-3">
							<h4>支援手機</h4>
							<p>走到哪聽到哪，選歌超Easy</p>
						</div>
						<div className="col-md-3">
							<h4>無需註冊</h4>
							<p>英國報導平均每個人一生中花費1年的時間在註冊、登入跟猜自己的密碼</p>
						</div>
						<div className="col-md-3">
							<h4>簡易匯出</h4>
							<p>將喜愛清單匯出成文字檔，以利於其他工具轉換成<a href="https://www.kkbox.com/" target="_blank" rel="noopener noreferrer">KKBox</a>、<a href="https://www.apple.com/tw/music/" target="_blank" rel="noopener noreferrer">Apple Music</a>或<a href="https://www.spotify.com/tw/" target="_blank" rel="noopener noreferrer">Spotify</a>...等歌單</p>
						</div>
					</div>
					<hr className="featurette-divider" />
				</div>
			</div>
		);
	};
};

class Player extends Component
{
	constructor( props )
	{
		super( props );
		if ( _id ) {
			this.props.history.push( "/list/" + _id );
		} else {
			this.props.history.push( "/categories" );
		}
	};

	render()
	{
		return ( <div></div> );
	};
}

class Categories extends Component
{
	constructor( props )
	{
		super( props );
		this.state = {
			categories: []
		}
	};

	componentWillMount()
	{
		this.clear();
		fetch( _setting[ "url" ] + "new-release-categories?territory=TW", {
			method: "GET",
			headers: { "Authorization": "Bearer " + _setting[ "token" ] }
		})
		.then( res => res.json() )
		.then( response => this.setState({ categories: response[ "data" ] }) );
	};

	clear()
	{
		_categorie = "";
		_playlist = [];
		_id = null;
		_storage.removeItem( "id" );
		_storage.removeItem( "playlist" );
		_storage.removeItem( "categorie" );
	}

	render()
	{
		const categories = this.state.categories.map( ( item, index ) =>
			<ListGroupItem tag="a" href={ "/list/" + item.id } key={ index }>{ item.title }</ListGroupItem>
		);
		return (
			<div className="container">
				<Breadcrumb>
					<BreadcrumbItem active>目錄</BreadcrumbItem>
				</Breadcrumb>
				<ListGroup>
					{ categories }
				</ListGroup>
				<div className="text-right">
					<br />
					<button onClick={ () => this.props.history.goBack() } className="btn btn-outline-primary">返回</button>
				</div>
			</div>
		);
	};
};

class List extends Component
{
	constructor( props )
	{
		super( props );
		this.state = { 
			list: [],
			playlist: [],
			categorie: "",
			progress: 0,
			loading: true,
			// Curent
			mode: "player",
			player: "stop",
			favorite: false,
			index: 0,
			item: null
		};
		this.id = props.match.params.id;
		this.progress = this.progress.bind( this );
	};

	componentWillUnmount()
	{
		this.pause();
	};

	componentWillMount()
	{
		this.getData();
		this.pause();
	};

	goBack()
	{
		let index = this.state[ "index" ];
		if ( index !== 0 ) {
			index--;
			this.setState({ index: index }, () => this.selectData( index ) );
		} else {
			this.selectData( index );
		}
	};

	goNext()
	{
		let index = this.state[ "index" ];
		if ( index !== _setting[ "max" ] - 1 && index !== this.state[ "playlist" ].length - 1 ) {
			index++;
			this.setState({ index: index }, () => this.selectData( index ) );
		} else {
			this.selectData(0);
		}
	};

	play()
	{
		this.setState({ player: "locked" });
		clearTimeout( _timer[ "player" ] );
		_sound.play();
		_sound.pause();
		fetch( _setting[ "song" ] + "?media=kkbox&id=" + this.state[ "item" ][ "id" ], { method: "GET" })
		.then( res => res.text() )
		.then( response => {
			_sound.pause();
			_sound.setAttribute( "src", response );
			_sound.load();
			_sound.play();
			this.setState({ player: "play" });
			this.progress();
			if ( this.id !== "/favorite" && this.state[ "index" ] === ( _setting[ "max" ] - 1 ) ) _timer[ "player" ] = setTimeout( function() { this.pause(); this.clear(); this.start( true ); this.play(); }.bind( this ), _setting[ "delay" ] * 1000 );
			else _timer[ "player" ] = setTimeout( function() { this.goNext() }.bind( this ), _setting[ "delay" ] * 1000 );
		});
	};

	pause()
	{
		clearTimeout( _timer[ "player" ] );
		clearTimeout( _timer[ "progress" ] );
		this.setState({ player: "stop", progress: 0 });
		_sound.pause();
	};

	progress()
	{
		clearTimeout( _timer[ "progress" ] );
		let progress = this.state[ "progress" ];
		progress++;
		this.setState({ progress: progress }, () => { _timer[ "progress" ] = setTimeout( this.progress, 1000 ); });
	}

	selectMode()
	{
		if ( this.state[ "mode" ] === "text" ) this.setState({ mode: "player" });
		if ( this.state[ "mode" ] === "player" ) {
			this.pause();
			this.setState({ mode: "text" });
		} 
	};

	selectData( index )
	{
		if ( this.state[ "player" ] === "play" ) {
			this.pause(); 
			this.setState({ 
				item: this.state[ "playlist" ][ index ],
				index: index
			}, this.play );
		} else {
			this.pause(); 
			this.setState({
				item: this.state[ "playlist" ][ index ],
				index: index
			});
		}
	};

	favoriteIndex( id )
	{
		return _favorite.findIndex( item => item[ "id" ] === id );
	};

	favorite()
	{
		let index = this.favoriteIndex( this.state.item[ "id" ] );
		if ( index >= 0 ) {
			if ( this.props.location.pathname === "/favorite" ) {
				_favorite.splice( index, 1 );
				_storage.setItem( "favorite", JSON.stringify( _favorite ) );
				if ( ( _favorite.length - 1 ) < this.state.index ) {
					this.setState({
						item: _favorite[ _favorite.length - 1 ],
						index: _favorite.length - 1
					}, 
					() => { 
						if ( this.state[ "player" ] === "play" && _favorite.length > 0 ) { this.pause(); this.play(); }
						else { this.pause(); }
					});
				} else {
					this.setState({ item: _favorite[ this.state.index ] }, () => { if ( this.state[ "player" ] === "play" ) { this.pause(); this.play(); } else { this.pause(); } });
				}
			} else {
				_favorite.splice( index, 1 );
				this.setState({ index: this.state.index });
				_storage.setItem( "favorite", JSON.stringify( _favorite ) );
			}
		} else {
			_favorite.push( this.state.item );
			this.setState({ index: this.state.index });
			_storage.setItem( "favorite", JSON.stringify( _favorite ) );
		}
	};

	getData()
	{
		this.pause();
		this.setState({ loading: true });
		if ( this.props.location.pathname === "/favorite" ) {
			this.setState({ 
				list: _favorite,
				playlist: _favorite
			}, this.start );
		} else {
			fetch( _setting[ "url" ] + "new-release-categories/" + this.id + "?territory=TW", {
				method: "GET",
				headers: { "Authorization": "Bearer " + _setting[ "token" ] }
			})
			.then( res => res.json() )
			.then( response => {
				const max = response[ "albums" ][ "data" ].length;
				let count = 0;
				response[ "albums" ][ "data" ].map( ( item, index ) => {
					fetch( _setting[ "url" ] + "albums/" + item.id + "/tracks?territory=TW", {
						method: "GET",
						headers: { "Authorization": "Bearer " + _setting[ "token" ] }
					})
					.then( res => res.json() )
					.then(
						( response2 ) => {
							response2[ "data" ].map( ( item2, index2 ) => {
								let available = false;
								available = response2[ "data" ][ index2 ][ "available_territories" ].findIndex( item3  => ( item3 === "TW" ) );
								if ( available < 0 ) {
									delete response2[ "data" ][ index2 ];
								} else {
									response2[ "data" ][ index2 ][ "artist" ] = response[ "albums" ][ "data" ][ index ][ "artist" ];
									response2[ "data" ][ index2 ][ "images" ] = response[ "albums" ][ "data" ][ index ][ "images" ];
								}
								return true;
							});
							this.setState({ 
								list: this.state.list.concat( response2[ "data" ] ),
								playlist: this.state.list.concat( response2[ "data" ] ),
							});
							count++;
							if ( max === count ) {
								this.setState({ categorie: response[ "title" ] });
								if ( _playlist.length > 0 && response[ "title" ] === _categorie ) {
									this.setState({ playlist: _playlist }, this.start );
								} else {
									this.start( true );
								}
							}
						}
					);
					return true;
				});
			});		
		}
	}

	clear()
	{
		_categorie = "";
		_playlist = [];
		_id = null;
		_storage.removeItem( "id" );
		_storage.removeItem( "playlist" );
		_storage.removeItem( "categorie" );
	};

	start( reset )
	{
		let list = this.state.list,
			playlist = [];
		if ( reset ) {
			list.sort( () => { return Math.random() > 0.5 ? -1 : 1; });
			playlist = list.slice( 0, _setting[ "max" ] );
			_storage.setItem( "id", this.id );
			_storage.setItem( "categorie", this.state.categorie );
			_storage.setItem( "playlist", JSON.stringify( playlist ) );
		} else {
			playlist = this.state.playlist;
		}
		this.setState({ 
			playlist: playlist,
			loading: false,
			item: playlist[0],
			index: 0
		});
	};

	render()
	{
		let list;
		if ( this.state[ "mode" ] === "text" ) {
			list = this.state[ "playlist" ].map( ( item, index ) => { return ( <div key={ index }>{ item[ "artist" ][ "name" ] } - { item[ "name" ] }</div> ); } );
		} else {
			list = this.state[ "playlist" ].map( ( item, index ) => {
				if ( index === this.state[ "index" ] ) {
					return ( <ListGroupItem key={ index } onClick={ () => { if ( this.state[ "player" ] === "stop" ) { this.play(); } else if ( this.state[ "player" ] === "play" ) { this.pause(); } } } active>{ item[ "artist" ][ "name" ] } - { item[ "name" ] }</ListGroupItem> );
				} else {
					return ( <ListGroupItem key={ index } onClick={ () => this.selectData( index ) }>{ item[ "artist" ][ "name" ] } - { item[ "name" ] }</ListGroupItem> );
				}
			});
		}
		if ( this.state[ "loading" ] ) {
			return ( 
				<div className="container">
	 				<Alert color="warning">讀取中</Alert>
				</div>
			);
		} else if ( this.state[ "playlist" ].length <= 0 ) {
			return ( 
				<div className="container">
					<Breadcrumb>
						<BreadcrumbItem active><Link to="/categories">目錄</Link></BreadcrumbItem>
						<BreadcrumbItem active>{ this.props.location.pathname === "/favorite" ? "喜愛清單" : this.state[ "categorie" ] }</BreadcrumbItem>
					</Breadcrumb>
					<Alert color="warning">尚無任何資料</Alert>
					<div className="text-right">
						<br />
						<button onClick={ () => this.props.history.goBack() } className="btn btn-outline-primary">返回</button>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className="container">
						<Breadcrumb>
							<BreadcrumbItem active><Link to="/categories">目錄</Link></BreadcrumbItem>
							<BreadcrumbItem>{ this.props.location.pathname === "/favorite" ? "喜愛清單" : this.state[ "categorie" ] }</BreadcrumbItem>
						</Breadcrumb>
						<div style={ this.state[ "mode" ] === "text" ? { display: "none" } : { display: "" } } className="text-center">
							<img src={ this.state[ "item" ][ "images" ][0][ "url" ] } className={ this.state[ "player" ] === "play" ? "rounded light" :  "rounded animated flipInX" } alt="" />
							<h3>{ this.state[ "item" ][ "name" ] }</h3>
							<h6>{ this.state[ "item" ][ "artist" ][ "name" ] }</h6>
							<div className="btn-group">
								<button disabled={ this.state[ "player" ] === "locked" ? "disabled" : "" } onClick={ () => this.goBack() } className="btn btn-dark"><i className="fas fa-step-backward"></i></button>
								<button disabled={ this.state[ "player" ] === "locked" ? "disabled" : "" } className="btn btn-dark" onClick={ () => { if ( this.state[ "player" ] === "play" ) { this.pause(); } else if ( this.state[ "player" ] === "stop" ) { this.play() } } }><i className={ this.state[ "player" ] === "play" ? "fas fa-stop" :  "fas fa-play" }></i></button>
								<button disabled={ this.state[ "player" ] === "locked" ? "disabled" : "" } onClick={ () => this.goNext() } className="btn btn-dark"><i className="fas fa-step-forward"></i></button>
								<button disabled={ this.state[ "player" ] === "locked" ? "disabled" : "" } className="btn btn-dark" onClick={ () => this.favorite() }><i className={ this.favoriteIndex( this.state.item[ "id" ] ) >= 0 ? "fas fa-heart" :  "far fa-heart" }></i></button>
							</div>
						</div>
						<br />
						<Progress value={ this.state[ "progress" ] } striped bar max={ _setting[ "delay" ] } className="prgress-sm fixed-bottom no-radius"/>
						<div style={ this.state[ "loading" ] ? { display: "none" } : { display: "" } }>
							<ListGroup>
								{ list }
							</ListGroup>
						</div>
						<div className="more text-right">
							<br />
							<div className="btn-group">
								<button onClick={ () => this.selectMode() } className="btn btn-outline-primary">{ this.state[ "mode" ] === "text" ? "播放器模式" : "文字模式" }</button>
								<button onClick={ () => { this.clear(); this.getData() } } className="btn btn-outline-primary" style={ this.props.location.pathname === "/favorite" ? { display: "none" } : { display: "" } }>更多</button>
								<button onClick={ () => this.props.history.goBack() } className="btn btn-outline-primary">返回</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
	};
};

class App extends Component
{
	constructor( props )
	{
		super( props );
		this.state = { 
			delay: _setting[ "delay" ],
			collapsed: true,
			message: "成功加入我的清單",
			fadeIn: true
		};
		this.handleChange = this.handleChange.bind( this );
		this.toggleNavbar = this.toggleNavbar.bind( this );
	};

	handleChange( event )
	{
		this.setState({ delay: event.target.value });
	};

	toggleNavbar()
	{
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {
		return (
			<Router>
				<div>
					<header>
						<Navbar color="dark" dark className="fixed-top">
							<NavbarBrand href="/" className="mr-auto"><img src={ process.env.PUBLIC_URL + "/images/logo.png" } width="100" alt="" /></NavbarBrand>
							<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
							<Collapse isOpen={!this.state.collapsed} navbar>
								<Nav navbar>
									<NavItem>
										<NavLink href="/index">首頁</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="/player">播放器</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="/favorite">喜愛清單</NavLink>
									</NavItem>
								</Nav>
							</Collapse>
						</Navbar>
					</header>
					<main>
						<Route exact path="/" component={ Index } />
						<Route path="/index" component={ Index } />
						<Route path="/categories" component={ Categories } />
						<Route path="/list/:id" component={ List } />
						<Route path="/player" component={ Player }  />
						<Route path="/favorite" component={ List } />
					</main>
					<footer className="container">
						<p>powered by <a href="https://www.kkbox.com">KKBOX</a></p>
					</footer>
				</div>
			</Router>
		)
	};
};

export default App;