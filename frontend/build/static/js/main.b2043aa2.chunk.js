(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{39:function(e,t,s){},71:function(e,t,s){},74:function(e,t,s){},75:function(e,t,s){},76:function(e,t,s){"use strict";s.r(t);var n=s(1),c=s.n(n),i=s(33),a=s.n(i),r=(s(39),s(2));var o=s(17),u=Object(o.io)("/questions"),j=(Object(o.io)("/answers"),s(71),s(0)),l=function(e){var t=e.question,s=Object(n.useState)(!1),c=Object(r.a)(s,2),i=c[0],a=c[1],o=i?"asker__answers asker__answers_active":"asker__answers",u=t.answers_list.map((function(e){return Object(j.jsxs)("div",{className:"answers_info",children:[Object(j.jsxs)("div",{className:"answers_author",children:["Author ",e.answerer_id,":"]}),Object(j.jsx)("div",{className:"answers_text",children:e.answer_text})]})}));return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("div",{className:"asker_question",onClick:function(){a((function(e){return!e}))},children:[Object(j.jsx)("p",{className:"asker_question-header",children:t.question_text}),Object(j.jsx)("p",{className:"asker_question-amount",children:t.answers_list.length})]}),Object(j.jsx)("div",{className:o,children:u})]})},d=function(){var e=Object(n.useState)(""),t=Object(r.a)(e,2),s=t[0],c=t[1],i=Object(n.useState)([]),a=Object(r.a)(i,2),o=a[0],d=a[1],_=o.map((function(e){return Object(j.jsx)(l,{question:e})}));return Object(n.useEffect)((function(){u.on("create_question_success",(function(e){u.emit("get_questions_by_session_id")})),u.on("no_active_questions",(function(e){d([])})),u.on("success_get_questions_by_session_id",(function(e){"success"===e.status&&d(e.data)})),u.on("answer_created",(function(){u.emit("get_questions_by_session_id")}))}),[]),Object(j.jsxs)("div",{className:"ask_block",children:[Object(j.jsx)("div",{className:"ask_form",children:Object(j.jsxs)("form",{className:"form",onSubmit:function(e){return function(e){e.preventDefault();var t={session:u.id,question:s};s&&u.emit("create_question",t)}(e)},children:[Object(j.jsx)("input",{className:"input",value:s,onChange:function(e){c(e.target.value)}}),Object(j.jsx)("button",{className:"ask_button",children:"Ask"})]})}),Object(j.jsxs)("div",{className:"ask_select",children:[Object(j.jsxs)("select",{className:"ask_filter",children:[Object(j.jsx)("option",{children:"Filter"}),Object(j.jsx)("option",{children:"1"}),Object(j.jsx)("option",{children:"1"}),Object(j.jsx)("option",{children:"1"})]}),Object(j.jsxs)("span",{children:["Total number of questions: ",o.length]})]}),Object(j.jsx)("div",{className:"asker_questions",children:_})]})},_=s(34),b=s.n(_),m=function(e){var t=e.question,s=Object(n.useState)(!1),c=Object(r.a)(s,2),i=c[0],a=c[1],o=Object(n.useState)(""),l=Object(r.a)(o,2),d=l[0],_=l[1],m=i?"askme__btn item-group__btn":"askme__btn item-group__btn item-group__btn_active",f=i?"item-group__answer-form item-group__answer-form_active":"item-group__answer-form";return Object(n.useEffect)((function(){u.on("answer_created",(function(){u.emit("get_active_questions")}))}),[]),Object(j.jsxs)("div",{className:"item-group answer__item-group",children:[Object(j.jsxs)("div",{className:"item-group__header",children:[Object(j.jsxs)("div",{className:"item-group__header-top",children:[Object(j.jsx)("div",{className:"item-group__title",children:t.question_text}),Object(j.jsx)("div",{className:"item-group__time",children:b()(t.created_at).fromNow()})]}),Object(j.jsxs)("div",{className:"item-group__header-bottom",children:["Number of answers: ",t.answers_list.length]})]}),Object(j.jsxs)("div",{className:"item-group__content",children:[Object(j.jsx)("button",{className:m,onClick:function(){return a((function(e){return!e}))},children:"Answer question"}),Object(j.jsxs)("div",{className:f,children:[Object(j.jsxs)("div",{className:"input-group input-group_text",children:[Object(j.jsx)("textarea",{id:"answerText",className:"item-group__form-input",placeholder:"Write your answer here",value:d,onChange:function(e){_(e.target.value)}}),Object(j.jsx)("button",{className:"askme__btn submit-btn",onClick:function(){if(""!==d&&d.length>3){var e={question_id:t.id,answer_text:d,answerer_id:3};u.emit("add_answer",e),_("")}else alert("Answer can not be empty!")},children:"Answer"})]}),Object(j.jsx)("div",{className:"input-group",children:Object(j.jsx)("button",{className:"askme__btn dismiss-btn",onClick:function(){a((function(e){return!e})),_("")},children:"Dismiss"})})]})]})]},t.id)},f=(s(74),function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),s=(t[0],t[1],Object(n.useState)([])),c=Object(r.a)(s,2),i=c[0],a=c[1];Object(n.useEffect)((function(){return u.on("connect",(function(){u.send("User ".concat(u.id," has connected"))})),u.on("create_question_success",(function(){u.emit("get_active_questions")})),u.on("asker_leave",(function(){u.emit("get_active_questions")})),u.on("success_active_questions",(function(e){"success"===e.status&&(a(e.data),console.log(e.data))})),u.on("question_create_success",(function(e){u.emit("get_active_questions"),console.log(e)})),u.emit("get_active_questions"),function(){}}),[]);var o=i.map((function(e){return Object(j.jsx)(m,{question:e})}));return Object(j.jsxs)("div",{className:"answer",children:[Object(j.jsxs)("div",{className:"answer__header",children:[Object(j.jsxs)("div",{className:"answer_header-row",children:[Object(j.jsx)("div",{className:"answer__window-title",children:"Answerer window"}),Object(j.jsx)("div",{className:"answer__username",children:u.id})]}),Object(j.jsx)("div",{className:"answer_header-row",children:Object(j.jsxs)("div",{className:"answer__question-count",children:["Active questions: ",Object(j.jsx)("b",{children:i.length})]})})]}),Object(j.jsx)("div",{className:"answer__content",children:o})]})}),O=(s(75),function(){var e=Object(n.useState)(!0),t=Object(r.a)(e,2),s=t[0],c=t[1];!function(e){var t=Object(n.useRef)(e);Object(n.useEffect)((function(){t.current=e}),[e]),Object(n.useEffect)((function(){var e=function(e){var s;if("function"===typeof t.current&&(s=t.current(e)),e.defaultPrevented&&(e.returnValue=""),"string"===typeof s)return e.returnValue=s,s};return window.addEventListener("beforeunload",e),function(){window.removeEventListener("beforeunload",e)}}),[])}((function(e){e.preventDefault()}));return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("button",{onClick:function(){c(!s)},children:"Change Page"}),s?Object(j.jsx)(d,{}):Object(j.jsx)(f,{})]})});a.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(O,{})}),document.getElementById("root"))}},[[76,1,2]]]);
//# sourceMappingURL=main.b2043aa2.chunk.js.map