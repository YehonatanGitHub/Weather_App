(window.webpackJsonpweather_app=window.webpackJsonpweather_app||[]).push([[0],{39:function(e,t,a){e.exports=a(74)},66:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),s=a(12),o=a.n(s),c=a(13),i=a(4),r=a(14),m=a(15),d=a(18),h=a(16),u=a(17),f=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).setRedirect=function(e,t){a.setState({redirect:!0}),console.log(t);var l=a.state.favorites,n=l.findIndex(function(e){return e.cityId===t});l[n].fromFavorits=1,console.log("this is the new arr",l),console.log("arr location",n),localStorage.setItem("listOfFollowers",JSON.stringify(l))},a.renderRedirect=function(){if(a.state.redirect)return n.a.createElement(i.a,{to:"/"})},a.state={redirect:!1,favorites:[],message:"",localStorageEmpty:!0},a}return Object(u.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("listOfFollowers"));console.log("getLocalStorage",e),this.setState({favorites:e}),void 0===e||null===e||0===e.length?(this.setState({localStorageEmpty:!1}),this.setState({message:"No cities have been selected as favorite. please go to the Home page to add some"})):this.setState({message:""})}},{key:"render",value:function(){var e,t=this;this.state.localStorageEmpty&&(e=n.a.createElement("div",{className:"card-deck",style:{maxWidth:"100%"}},this.state.favorites.map(function(e,a){return console.log("map favorites ",t.state.favorites),n.a.createElement("div",{key:e.cityId},t.renderRedirect(),n.a.createElement("button",{className:"card text-white bg-info",onClick:function(a){return t.setRedirect(a,e.cityId)},id:e.cityId},n.a.createElement("div",{className:"card-body text-center"},n.a.createElement("p",{className:"card-text"},e.defaultCity),n.a.createElement("p",{className:"card-text"},e.cityMaxTemp+"\xb0 c"),n.a.createElement("p",{className:"card-text"},e.cityPhrase))))})));return n.a.createElement("div",null,n.a.createElement("div",{className:"row justify-content-center",style:{marginTop:"50px",maxWidth:"100%"}},n.a.createElement("h3",{style:{color:"red"}},this.state.message),e))}}]),t}(n.a.Component),y=a(5),g=a(23),v=a.n(g),p=a(78),S=a(76),b=a(77),E=(a(66),function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).handleClickModal=function(t,a){e.setState({defaultCity:a.LocalizedName}),e.setState({cityId:parseInt(a.Key,10)},function(){console.log("check this",this.state.cityId),this.changeCityUi()}.bind(Object(y.a)(e))),e.toggleModal(),e.setState({search:""});var l=JSON.parse(localStorage.getItem("listOfFollowers"));console.log("listOfFollowers",l),l.find(function(e){return e.cityId===parseInt(a.Key,10)})?e.setState({followBotton:!0}):e.setState({followBotton:!1})},e.state={apiKey:"vFpvo92SL4z6aJsThIdkQDJZe1oOnEO3",fiveDays:[],cityPhrase:"",defaultCity:"Tel Aviv",cityMaxTemp:"",search:"",cityId:"",modalIsOpen:!1,citySearchResArr:[],followBotton:!1,listOfFollowers:[]},e.getDayOfWeek=e.getDayOfWeek.bind(Object(y.a)(e)),e.handleInputChange=e.handleInputChange.bind(Object(y.a)(e)),e.handleClickSearch=e.handleClickSearch.bind(Object(y.a)(e)),e.toggleModal=e.toggleModal.bind(Object(y.a)(e)),e.handleClickModal=e.handleClickModal.bind(Object(y.a)(e)),e.followOnOff=e.followOnOff.bind(Object(y.a)(e)),e}return Object(u.a)(t,e),Object(m.a)(t,[{key:"componentDidUpdate",value:function(e){e.cityId!==this.state.cityId&&this.state.cityId&&this.changeCityUi()}},{key:"componentDidMount",value:function(){var e=this,t=JSON.parse(localStorage.getItem("listOfFollowers"));if(console.log("result from find serach array",t),void 0===t||null===t||0===t.length)this.setState({cityId:215854}),this.setState({defaultCity:"Tel Aviv"}),setTimeout(function(){e.changeCityUi()},1e3);else{var a=t.find(function(e){return 1===e.fromFavorits});if(console.log("result from find serach array",a),a){this.setState({cityId:a.cityId}),this.setState({defaultCity:a.defaultCity}),this.setState({followBotton:!0});var l=t.findIndex(function(e){return e.cityId===a.cityId});t[l].fromFavorits=0,console.log("find in array setCity",a),console.log("find in array tempArr ",t),console.log("in if cityId",this.state.cityId),localStorage.setItem("listOfFollowers",JSON.stringify(t)),setTimeout(function(){e.changeCityUi()},1e3)}else t.find(function(e){return 215854===e.cityId})&&(this.setState({cityId:215854}),this.setState({defaultCity:"Tel Aviv"}),this.setState({followBotton:!0}),setTimeout(function(){e.changeCityUi()},1e3))}}},{key:"changeCityUi",value:function(){var e=this,t="https://dataservice.accuweather.com/forecasts/v1/daily/5day/".concat(this.state.cityId,"?apikey=").concat(this.state.apiKey,"&language=en-us&details=false&metric=true");v()({method:"get",url:"https://cors-anywhere.herokuapp.com/".concat(t),headers:{Origin:"".concat(t)}}).then(function(t){var a=t.data.DailyForecasts;e.setState({fiveDays:a});var l=a[0].Day.IconPhrase;e.setState({cityPhrase:l});var n=a[0].Temperature.Maximum.Value;e.setState({cityMaxTemp:n}),console.log("changeCityUi"),console.log("this.state.cityId",e.state.cityId),console.log("cityMaxTemp",n)})}},{key:"getDayOfWeek",value:function(e){var t=new Date(e).getDay();return isNaN(t)?null:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][t]}},{key:"handleSubmint",value:function(e){e.preventDefault()}},{key:"handleInputChange",value:function(e){e.preventDefault(),this.setState({search:e.target.value})}},{key:"handleClickSearch",value:function(e){var t=this;e.preventDefault();var a="https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=".concat(this.state.apiKey,"&q=").concat(this.state.search,"&language=en-us/cors-anywhere.html");v()({method:"get",url:"https://cors-anywhere.herokuapp.com/".concat(a),headers:{Origin:"".concat(a)}}).then(function(e){var a=e.data;(console.log("citySearchRes"),console.log(a),1===a.length)?(console.log("citySearchRes[0].Key",a[0].Key),t.setState({defaultCity:a[0].LocalizedName}),t.setState({cityId:parseInt(a[0].Key,10)}),JSON.parse(localStorage.getItem("listOfFollowers")).find(function(e){return e.cityId===parseInt(a[0].Key,10)})?t.setState({followBotton:!0}):t.setState({followBotton:!1}),t.changeCityUi(),t.setState({search:""})):0===a.length?(alert("no city found please try another"),t.setState({search:""})):(t.toggleModal(),t.setState({citySearchResArr:a}),console.log("this.state.cityId",t.state.cityId))})}},{key:"toggleModal",value:function(){this.setState({modalIsOpen:!this.state.modalIsOpen})}},{key:"followOnOff",value:function(){var e=this;if(!0===this.state.followBotton){var t=JSON.parse(localStorage.getItem("listOfFollowers"));console.log(t);var a=t.findIndex(function(t){return t.cityId===e.state.cityId});console.log(a),t.splice(a,1),console.log(t),localStorage.setItem("listOfFollowers",JSON.stringify(t)),this.setState({followBotton:!1})}else if(!1===this.state.followBotton)if(null===JSON.parse(localStorage.getItem("listOfFollowers"))){console.log("local is null");var l=[{fromFavorits:0,cityId:this.state.cityId,defaultCity:this.state.defaultCity,cityMaxTemp:this.state.cityMaxTemp,cityPhrase:this.state.cityPhrase}];this.setState({followBotton:!0}),localStorage.setItem("listOfFollowers",JSON.stringify(l)),console.log("this.state.cityId newFollower",l)}else{var n=JSON.parse(localStorage.getItem("listOfFollowers"));console.log("temp",n);var s={fromFavorits:0,cityId:this.state.cityId,defaultCity:this.state.defaultCity,cityMaxTemp:this.state.cityMaxTemp,cityPhrase:this.state.cityPhrase};n.push(s),console.log("temp2",n),console.log("this.state.cityId newFollower2",s),localStorage.setItem("listOfFollowers",JSON.stringify(n)),this.setState({followBotton:!0})}}},{key:"render",value:function(){var e=this,t={width:"45px",height:"45px",lineHeight:"45px",textAlign:"center",padding:0,borderRadius:"50%",fontWeight:"bold"},a={paddingLeft:"25px",paddingRight:"25px"},l={width:"115px"};return n.a.createElement("div",{className:"main"},n.a.createElement(p.a,{isOpen:this.state.modalIsOpen},n.a.createElement(S.a,{toggle:this.toggleModal.bind(this)},"We found more than one result. Please select from list:"," "),n.a.createElement(b.a,null,this.state.citySearchResArr.map(function(t){return console.log("city.LocalizedName",t.LocalizedName),n.a.createElement("p",{onClick:function(a){return e.handleClickModal(a,t)},id:t.Key,key:t.Key,className:"list-group-item list-group-item-action"},t.LocalizedName,", ",t.AdministrativeArea.LocalizedName,","," ",t.Country.LocalizedName)}))),n.a.createElement("div",{className:"container"},n.a.createElement("br",null),n.a.createElement("div",{className:"row justify-content-center"},n.a.createElement("div",{className:"col-12 col-md-10 col-lg-8"},n.a.createElement("form",{className:"card card-sm",onSubmit:this.handleSubmint},n.a.createElement("div",{className:"card-body row no-gutters align-items-center",style:{padding:"7px"}},n.a.createElement("div",{className:"col-auto"},n.a.createElement("i",{className:"fas fa-search h4 text-body"})),n.a.createElement("div",{className:"col"},n.a.createElement("input",{className:"form-control form-control-lg form-control-borderless",type:"search",placeholder:"Search For A City",value:this.state.search,name:"search",onChange:this.handleInputChange})),n.a.createElement("div",{className:"col-auto"},n.a.createElement("button",{className:"btn btn-lg btn-success",onClick:this.handleClickSearch,style:{marginLeft:"6px"}},"Search"))))))),n.a.createElement("div",{className:"container"},n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("div",{className:"container",style:{paddingRight:"7px",paddingLeft:"7px",border:"6px solid #ffffff",borderRadius:"16px",backgroundColor:"#dddddd9c"}},n.a.createElement("br",null),n.a.createElement("div",{className:"row",style:{marginLeft:"2%",marginRight:"0%"}},n.a.createElement("div",{className:"col-sm-6"},n.a.createElement("h2",null,this.state.defaultCity),n.a.createElement("h5",null,this.state.cityMaxTemp+"\xb0 c")),n.a.createElement("div",{className:"col-sm-6 "},n.a.createElement("button",{id:this.state.cityId,style:t,className:this.state.followBotton?"btn btn-success btn-circle btn-circle-sm m-1 float-right ml-auto":"btn btn-secondary btn-circle btn-circle-sm m-1 float-right ml-auto",onClick:this.followOnOff},n.a.createElement("i",{className:"fa fa-check",style:t})),n.a.createElement("span",{className:"favorite_text"},this.state.followBotton?"Click to Remove from Favorites":"Click to Add to Favorites"))),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("div",{className:"row justify-content-center"},n.a.createElement("div",{className:"col-sm-3"},n.a.createElement("h4",{className:"justify-content-center"},this.state.cityPhrase))),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("div",{className:"row justify-content-center"},n.a.createElement("div",{className:"card-deck"},this.state.fiveDays.map(function(t,s){return console.log("map 5 days ",e.state.cityPhrase),n.a.createElement("div",{className:"card text-white bg-info",style:l,key:s},n.a.createElement("div",{className:"card-body text-center",style:a},n.a.createElement("h5",{className:"card-text"},e.getDayOfWeek(new Date(t.Date).toLocaleDateString())),n.a.createElement("h6",{className:"card-text"},t.Temperature.Maximum.Value+"\xb0 c")))}))),n.a.createElement("br",null))))}}]),t}(n.a.Component));var I=function(e){return n.a.createElement(c.a,null,n.a.createElement("div",null,n.a.createElement("nav",{className:"navbar navbar-expand-sm bg-dark navbar-dark"},n.a.createElement("ul",{class:"navbar-nav"},n.a.createElement("li",{class:"nav-item "},n.a.createElement(c.b,{to:"/",className:"nav-link"},n.a.createElement("h2",null,"Weather App")))),n.a.createElement("ul",{className:"navbar-nav ml-auto"},n.a.createElement("li",{className:"nav-item"},n.a.createElement(c.b,{to:"/",className:"nav-link"},"Home")),n.a.createElement("li",{className:"nav-item"},n.a.createElement(c.b,{to:"/favorites/",className:"nav-link"},"Favorites")))),n.a.createElement(i.b,{path:"/",exact:!0,component:E}),n.a.createElement(i.b,{path:"/favorites/",exact:!0,component:f})))};var N=function(){return n.a.createElement("div",null,n.a.createElement(I,null))};o.a.render(n.a.createElement(N,null),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.3975daeb.chunk.js.map