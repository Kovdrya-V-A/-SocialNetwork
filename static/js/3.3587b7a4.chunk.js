(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{304:function(e,s,r){"use strict";r.r(s);var o=r(14),n=r(15),t=r(17),a=r(16),c=r(1),l=r.n(c),i=r(10),u=r(137),g=r(70),h=r.n(g),p=r(21),d=r(138),j=r(139),f=r(136),P=r(12),b=r(0),m=function(e){return Object(b.jsxs)("div",{className:h.a.user,children:[Object(b.jsx)("div",{className:h.a.userAva,children:Object(b.jsx)("img",{src:null!=e.img?e.img:f.a,alt:"userAva"})}),Object(b.jsxs)("div",{className:h.a.userInfo,children:[Object(b.jsx)(P.b,{className:h.a.userLink,to:"/AuthUser/UserPage/"+e.id,children:e.name}),Object(b.jsx)("button",{disabled:e.setIsWroteInProgress.some((function(s){return s===e.id})),onClick:function(){e.onMessage(e.id)},className:"".concat(h.a.toMessageButton," ").concat(h.a.button),children:"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c"}),e.followed?Object(b.jsx)("button",{disabled:e.followingInProgress.some((function(s){return s===e.id})),onClick:function(){return e.onUnfollow(e.id)},className:"".concat(h.a.unfollowButton," ").concat(h.a.button),children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"}):Object(b.jsx)("button",{disabled:e.followingInProgress.some((function(s){return s===e.id})),onClick:function(){return e.onFollow(e.id)},className:"".concat(h.a.followButton," ").concat(h.a.button),children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"}),e.followed?Object(b.jsx)("div",{className:h.a.followedStatus,children:Object(b.jsx)("p",{children:"\u0412\u0430\u0448 \u0434\u0440\u0443\u0433"})}):null]})]})},I=function(e){var s=e.usersData.map((function(s){return Object(b.jsx)(m,{id:s.id,img:s.img,name:s.name,followed:s.followed,setIsWroteInProgress:e.setIsWroteInProgress,onMessage:e.onMessage,followingInProgress:e.followingInProgress,onUnfollow:e.onUnfollow,onFollow:e.onFollow},s.id)}));return Object(b.jsx)("div",{className:h.a.usersList,children:e.usersData.length>0?s:Object(b.jsx)("h2",{children:"\u0422\u0430\u043a\u043e\u0439 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d"})})},w=r(80),O=function(e){if(e.isWrote&&e.currentDialogId)return Object(b.jsx)(p.a,{to:"/AuthUser/DialogsPage/"+e.currentDialogId});return Object(b.jsxs)("div",{className:h.a.usersPage,children:[Object(b.jsx)(x,{searchUsersInProgress:e.searchUsersInProgress,onSubmit:function(s){e.onSearchUsers(s.searchText?s.searchText:"")}}),Object(b.jsxs)("div",{className:h.a.usersListBar,children:[Object(b.jsx)("h2",{children:"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439:"}),Object(b.jsx)(I,{usersData:e.usersData,setIsWroteInProgress:e.setIsWroteInProgress,onMessage:e.onMessage,followingInProgress:e.followingInProgress,onUnfollow:e.onUnfollow,onFollow:e.onFollow})]}),Object(b.jsx)("div",{className:h.a.selectingPageMenu,children:Object(b.jsx)(w.a,{totalCount:e.totalUsersCount,pageSize:e.pageSize,currentPage:e.currentPage,setCurrentPage:e.onSetCurrentPage})})]})},x=Object(j.a)({form:"searchUsers"})((function(e){return Object(b.jsxs)("form",{className:h.a.searchUsersForm,onSubmit:e.handleSubmit,children:[Object(b.jsx)("div",{className:h.a.searchTextArea,children:Object(b.jsx)(d.a,{className:h.a.inputSearchText,name:"searchText",component:"textarea"})}),Object(b.jsx)("div",{className:h.a.searchButtonWrap,children:Object(b.jsx)("button",{disabled:e.searchUsersInProgress,className:h.a.searchButton,children:"Search"})})]})})),U=l.a.memo(O),C=r(11),S=r(33),k=function(e){Object(t.a)(r,e);var s=Object(a.a)(r);function r(){var e;Object(o.a)(this,r);for(var n=arguments.length,t=new Array(n),a=0;a<n;a++)t[a]=arguments[a];return(e=s.call.apply(s,[this].concat(t))).onSearchUsers=function(s){e.props.searchUsersThunkCreator(e.props.currentPage,e.props.pageSize,s)},e.onUnfollow=function(s){e.props.unFollowThunkCreator(s)},e.onFollow=function(s){e.props.followThunkCreator(s)},e.onSetCurrentPage=function(s){e.props.setCurrentPageThunkCreator(s,e.props.pageSize)},e.onMessage=function(s){e.props.goToDialogThunkCreator(s)},e}return Object(n.a)(r,[{key:"componentDidMount",value:function(){this.props.setUsersThunkCreator(this.props.currentPage,this.props.pageSize)}},{key:"componentWillUnmount",value:function(){this.props.setIsWrote(!1)}},{key:"render",value:function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(U,{onSetCurrentPage:this.onSetCurrentPage,totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,usersData:this.props.usersData,isWrote:this.props.isWrote,onUnfollow:this.onUnfollow,onFollow:this.onFollow,onMessage:this.onMessage,onSearchUsers:this.onSearchUsers,currentDialogId:this.props.currentDialogId,followingInProgress:this.props.followingInProgress,setIsWroteInProgress:this.props.setIsWroteInProgress,searchUsersInProgress:this.props.searchUsersInProgress})})}}]),r}(l.a.Component);s.default=Object(C.d)(Object(i.b)((function(e){return{usersData:e.usersPage.usersData,pageSize:e.usersPage.pageSize,totalUsersCount:e.usersPage.totalUsersCount,currentPage:e.usersPage.currentPage,isFetching:e.usersPage.isFetching,isWrote:e.usersPage.isWrote,currentDialogId:e.dialogsPage.currentDialogId,followingInProgress:e.usersPage.followingInProgress,setIsWroteInProgress:e.usersPage.setIsWroteInProgress,searchUsersInProgress:e.usersPage.searchUsersInProgress}}),{setIsWrote:u.f,setUsersThunkCreator:u.g,searchUsersThunkCreator:u.d,unFollowThunkCreator:u.h,followThunkCreator:u.b,setCurrentPageThunkCreator:u.e,goToDialogThunkCreator:u.c}),S.a)(k)}}]);
//# sourceMappingURL=3.3587b7a4.chunk.js.map