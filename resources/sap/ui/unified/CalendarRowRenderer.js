/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Lib","sap/ui/core/date/UniversalDate","sap/ui/unified/CalendarAppointment","sap/ui/unified/CalendarLegendRenderer","sap/ui/Device","sap/ui/unified/library","sap/ui/core/InvisibleText","sap/ui/core/date/UI5Date","sap/ui/unified/calendar/RecurrenceUtils","sap/base/Log","sap/ui/core/IconPool"],function(e,t,a,n,i,r,s,o,l,p,d){"use strict";var g=s.CalendarDayType;var c=s.CalendarIntervalType;var v=s.CalendarAppointmentVisualization;var f=s.CalendarAppointmentHeight;var u={apiVersion:2};u.render=function(e,t){var a=t.getTooltip_AsString();var n=t.getAppointmentsVisualization();var i=this.getLegendItems(t);e.openStart("div",t);e.class("sapUiCalendarRow");if(!r.system.phone&&t.getAppointmentsReducedHeight()){e.class("sapUiCalendarRowAppsRedHeight")}if(n!=v.Standard){e.class("sapUiCalendarRowVis"+n)}if(a){e.attr("title",a)}var s=t.getWidth();if(s){e.style("width",s)}var o=t.getHeight();if(o){e.style("height",o)}e.openEnd();this.renderAppointmentsRow(e,t,i);e.close("div")};u.renderAppointmentsRow=function(e,t,a){var n=t.getId();e.openStart("div",n+"-Apps");e.class("sapUiCalendarRowApps");e.attr("role","list");e.openEnd();this.renderBeforeAppointments(e,t);this.renderAppointments(e,t,a);this.renderAfterAppointments(e,t);e.close("div")};u.renderBeforeAppointments=function(e,t){};u.renderAfterAppointments=function(e,t){};u.renderResizeHandle=function(e,t,a){};u.renderAppointments=function(e,t,n){var i=t._getVisibleAppointments();var r=t._getVisibleIntervalHeaders();var s=t._getStartDate();var o=[];var l=0;var p=0;var d=[];var g=0;var v=0;var f=t.getIntervals();var u=t.getIntervalType();var A=100/f;var C=0;var I=new a(s);var T=false;var h=false;switch(u){case c.Hour:o=t.getNonWorkingHours()||[];l=s.getUTCHours();p=24;break;case c.Day:case c.Week:case c.OneMonth:case"OneMonth":o=t._getNonWorkingDays();l=s.getUTCDay();p=7;d=t.getNonWorkingHours()||[];g=s.getUTCHours();v=24;break;case c.Month:d=t._getNonWorkingDays();g=s.getUTCDay();v=7;break;default:break}if(t._isOneMonthsRowOnSmallSizes()){this.renderSingleDayInterval(e,t,i,n,r,o,l,p,d,g,v,true,true)}else{for(C=0;C<f;C++){if(h){T=true}else{T=false}h=false;switch(u){case c.Hour:I.setUTCHours(I.getUTCHours()+1);if(I.getUTCHours()==0){h=true}break;case c.Day:case c.Week:case c.OneMonth:case"OneMonth":I.setUTCDate(I.getUTCDate()+1);if(I.getUTCDate()==1){h=true}break;case c.Month:g=I.getUTCDay();I.setUTCMonth(I.getUTCMonth()+1);if(I.getUTCMonth()==0){h=true}break;default:break}this.renderInterval(e,t,C,A,r,o,l,p,d,g,v,T,h)}this.renderIntervalHeaders(e,t,A,r,f);if(!(t._getRelativeInfo&&t._getRelativeInfo().bIsRelative)){e.openStart("div",t.getId()+"-Now");e.class("sapUiCalendarRowNow");e.openEnd();e.close("div")}for(C=0;C<i.length;C++){var m=i[C];this.renderAppointment(e,t,m,n)}e.openStart("div",t.getId()+"-DummyApp");e.class("sapUiCalendarApp");e.class("sapUiCalendarAppTitleOnly");e.class("sapUiCalendarAppDummy");e.class("sapUiCalendarAppHeight1");e.openEnd();e.close("div")}};u.writeCustomAttributes=function(e,t){};u.renderInterval=function(e,t,n,i,r,s,o,d,g,v,f,u,A){const C=t.getStartDate();const I=l.getInstance(C);I.setHours(n+o,0,0,0);var T=t.getId()+"-AppsInt"+n;var h;var m=t.getShowIntervalHeaders()&&(t.getShowEmptyIntervalHeaders()||r.length>0);var U=t.getStartDate().getMonth();var S=l.getInstance(t.getStartDate().getFullYear(),U+1,0).getDate();const R=t.getIntervalType()!==c.Hour?[]:t.getNonWorkingPeriods().filter(e=>{if(!e.isRecurring()){return e.hasNonWorkingAtDate(C)}const t=p.hasOccurrenceOnDate.bind(e);return t(C)});const y=R.filter(e=>e.hasNonWorkingAtHour(I));e.openStart("div",T);e.class("sapUiCalendarRowAppsInt");e.style("width",i+"%");if(n>=S&&(t.getIntervalType()===c.OneMonth||t.getIntervalType()==="OneMonth")){e.class("sapUiCalItemOtherMonth")}if(t._isNonWorkingInterval(n,s,o,d)){e.class("sapUiCalendarRowAppsNoWork")}if(!m){e.class("sapUiCalendarRowAppsIntNoHead")}if(u){e.class("sapUiCalendarRowAppsIntFirst")}if(A){e.class("sapUiCalendarRowAppsIntLast")}this.writeCustomAttributes(e,t);e.openEnd();if(y.length){p.getWorkingAndNonWorkingSegments(I,y).forEach(t=>{if(t.type==="working"){this.renderWorkingParts(e,t.duration)}else{this.renderNonWorkingParts(e,t.duration)}})}if(m){e.openStart("div");e.class("sapUiCalendarRowAppsIntHead");e.openEnd();e.close("div")}if(t.getShowSubIntervals()){var b=t.getIntervalType();var w=0;switch(b){case c.Hour:w=4;break;case c.Day:case c.Week:case c.OneMonth:case"OneMonth":w=24;break;case c.Month:var E=t._getStartDate();var D=new a(E);D.setUTCMonth(D.getUTCMonth()+n+1,0);w=D.getUTCDate();D.setUTCDate(1);o=D.getUTCDay();break;default:break}var _=100/w;for(h=0;h<w;h++){e.openStart("div");e.class("sapUiCalendarRowAppsSubInt");e.style("width",_+"%");if(t._isNonWorkingInterval(h,g,v,f)){e.class("sapUiCalendarRowAppsNoWork")}e.openEnd();e.close("div")}}e.close("div")};u.renderIntervalHeaders=function(e,t,a,n,i){var r=t.getShowIntervalHeaders()&&(t.getShowEmptyIntervalHeaders()||n.length>0);if(r){for(var s=0;s<n.length;s++){var o=n[s],l,p;if(t._bRTL){p=a*o.interval;l=a*(i-o.last-1)}else{l=a*o.interval;p=a*(i-o.last-1)}this.renderIntervalHeader(e,t,o,t._bRTL,l,p)}}};u.renderIntervalHeader=function(e,t,a,n,i,r){var s=a.appointment.getId(),o={role:"listitem",labelledby:{value:s+"-Descr",append:true}},l;var p=t._calculateAppoitnmentVisualCue(a.appointment);e.openStart("div",a.appointment);e.class("sapUiCalendarRowAppsIntHead");if(i!==undefined){e.style("left",i+"%")}if(r!==undefined){e.style("right",r+"%")}e.class("sapUiCalendarRowAppsIntHeadFirst");if(a.appointment.getSelected()){e.class("sapUiCalendarRowAppsIntHeadSel")}if(a.appointment.getTentative()){e.class("sapUiCalendarRowAppsIntHeadTent")}var d=a.appointment.getTooltip_AsString();if(d){e.attr("title",d)}var c=a.appointment.getType();var v=a.appointment.getColor();if(!v&&c&&c!=g.None){e.class("sapUiCalendarRowAppsIntHead"+c)}if(v){if(n){e.style("border-right-color",v)}else{e.style("border-left-color",v)}}e.accessibilityState(a.appointment,o);e.openEnd();e.openStart("div");e.class("sapUiCalendarIntervalHeaderCont");if(v){e.style("background-color",a.appointment._getCSSColorForBackground(v))}e.openEnd();if(p.appTimeUnitsDifRowStart>0){e.icon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null,role:"img"})}var f=a.appointment.getIcon();if(f){var u=["sapUiCalendarRowAppsIntHeadIcon"];var A={};A["id"]=s+"-Icon";A["title"]=null;A["alt"]=null;A["role"]="presentation";e.icon(f,u,A)}var C=a.appointment.getTitle();if(C&&!a.appointment.getCustomContent().length){e.openStart("span",s+"-Title");e.class("sapUiCalendarRowAppsIntHeadTitle");e.openEnd();e.text(C);e.close("span")}var I=a.appointment.getText();if(I&&!a.appointment.getCustomContent().length){e.openStart("span",s+"-Text");e.class("sapUiCalendarRowAppsIntHeadText");e.openEnd();e.text(I);e.close("span")}if(p.appTimeUnitsDifRowEnd>0){e.icon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null,role:"img"})}l=t._oRb.getText("CALENDAR_START_TIME")+": "+t._oFormatAria.format(a.appointment.getStartDate())+"; "+t._oRb.getText("CALENDAR_END_TIME")+": "+t._oFormatAria.format(a.appointment.getEndDate());if(c&&c!==g.None){l+="; "+this.getAriaTextForType(c,this.getLegendItems(t))}e.openStart("span",s+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(l);e.close("span");e.close("div");e.close("div")};u.renderAppointment=function(e,t,a,n,i){var r=a.appointment;var s=r.getTooltip_AsString();var l=r.getType();var p=r.getColor();var d=r.getTitle();var c=r.getText();var u=r.getDescription();var A=r.getIcon();var C=r.getId();var I=t._getAppointmentReducedHeight(a);var T=r.getSelected();var h={role:"listitem",labelledby:{value:`${o.getStaticId("sap.m","ACC_CTR_TYPE_LISTITEM")} ${o.getStaticId("sap.ui.unified","APPOINTMENT")} ${C.concat("-Descr")}`,append:true},describedby:{value:T?o.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED"):"",append:true},selected:null};var m=t._getAppointmentRowCount(a,I);var U=t.getAriaLabelledBy();var S=t._calculateAppoitnmentVisualCue(r);if(U.length>0){h["labelledby"].value=h["labelledby"].value+" "+U.join(" ")}if(d&&!r.getCustomContent().length){h["labelledby"].value=h["labelledby"].value+" "+C+"-Title"}if(c&&!r.getCustomContent().length){h["labelledby"].value=h["labelledby"].value+" "+C+"-Text"}e.openStart("div",r);e.class("sapUiCalendarApp");e.class("sapUiCalendarAppHeight"+m);if(T){e.class("sapUiCalendarAppSel")}if(r.getTentative()){e.class("sapUiCalendarAppTent");h["labelledby"].value=h["labelledby"].value+" "+o.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(m===1){e.class("sapUiCalendarAppTitleOnly")}if(A){e.class("sapUiCalendarAppWithIcon")}if(!i){if(t._bRTL){e.style("right",a.begin+"%");e.style("left",a.end+"%")}else{e.style("left",a.begin+"%");e.style("right",a.end+"%")}}e.attr("data-sap-level",a.level);if(t._sFocusedAppointmentId==C){e.attr("tabindex","0")}else{e.attr("tabindex","-1")}if(s){e.attr("title",s)}if(!p&&l&&l!=g.None){e.class("sapUiCalendarApp"+l)}if(p){if(t._bRTL){e.style("border-right-color",p)}else{e.style("border-left-color",p)}}e.accessibilityState(r,h);e.openEnd();e.openStart("div");e.class("sapUiCalendarAppCont");if(p&&t.getAppointmentsVisualization()===v.Filled){e.style("background-color",r._getCSSColorForBackground(p))}e.openEnd();if(r.getCustomContent().length){r.getCustomContent().forEach(function(t){e.renderControl(t)})}else{if(S.appTimeUnitsDifRowStart>0){e.icon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null,role:"img"})}if(A){var R=["sapUiCalendarAppIcon"];var y={};y["id"]=C+"-Icon";y["title"]=null;y["alt"]=null;y["role"]="presentation";e.icon(A,R,y)}e.openStart("div");e.class("sapUiCalendarAppTitleWrapper");e.openEnd();if(d){e.openStart("span",C+"-Title");e.class("sapUiCalendarAppTitle");e.openEnd();e.text(d);e.close("span")}if(c&&a.size!==f.HalfSize){e.openStart("span",C+"-Text");e.class("sapUiCalendarAppText");e.openEnd();e.text(c);e.close("span")}if(u&&a.size!==f.HalfSize&&(a.size!==f.Regular||!c)){e.openStart("span",C+"-Info");e.class("sapUiCalendarAppDescription");e.openEnd();e.text(u);e.close("span")}e.close("div");if(S.appTimeUnitsDifRowEnd>0){e.icon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null,role:"img"})}}var b=t._oRb.getText("CALENDAR_START_TIME")+": "+t._oFormatAria.format(r.getStartDate());b=b+"; "+t._oRb.getText("CALENDAR_END_TIME")+": "+t._oFormatAria.format(r.getEndDate());if(t._getRelativeInfo&&t._getRelativeInfo().bIsRelative){var w=t._getRelativeInfo();b=t._oRb.getText("CALENDAR_START_TIME")+": "+w.intervalLabelFormatter(w._getIndexFromDate(r.getStartDate()));b=b+"; "+t._oRb.getText("CALENDAR_END_TIME")+": "+w.intervalLabelFormatter(w._getIndexFromDate(r.getEndDate()))}if(l&&l!=g.None){b=b+"; "+this.getAriaTextForType(l,n)}e.openStart("span",C+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(b);e.close("span");e.close("div");this.renderResizeHandle(e,t,r);e.close("div")};u.renderSingleDayInterval=function(i,r,s,o,p,d,g,v,f,u,A,C,I){var T=1,h=100,m=r.getId()+"-AppsInt"+T,U,S=r.getShowIntervalHeaders()&&(r.getShowEmptyIntervalHeaders()||p.length>0),R=l.getInstance(r.getStartDate()),y=R.getMonth(),b=l.getInstance(R.getFullYear(),y+1,0).getDate(),w,E=r._getPlanningCalendar(),D,_,N=[];R.setHours(0,0,0,0);D=s.concat(r.getIntervalHeaders().filter(function(e){var t=e.getStartDate().getTime(),a=e.getEndDate().getTime(),n=R.getTime(),i=n+1e3*60*60*24;return!(t>=i||a<=n)}).map(function(e){return{appointment:e,isHeader:true}})).sort(n._getComparer(R));if(E){N=E._getSelectedDates()}i.openStart("div",m);i.class("sapUiCalendarRowAppsInt");i.class("sapUiCalendarMonthRowAppsS");i.style("width",h+"%");if(T>=b&&(r.getIntervalType()===c.OneMonth||r.getIntervalType()==="OneMonth")){i.class("sapUiCalItemOtherMonth")}if(r._isNonWorkingInterval(T,d,g,v)){i.class("sapUiCalendarRowAppsNoWork")}if(!S){i.class("sapUiCalendarRowAppsIntNoHead")}if(C){i.class("sapUiCalendarRowAppsIntFirst")}if(I){i.class("sapUiCalendarRowAppsIntLast")}i.openEnd();if(S){i.openStart("div");i.class("sapUiCalendarRowAppsIntHead");i.openEnd();i.close("div")}if(N.length>0){var H=0,k=D.length;if(E.getRows()[0]._calculateVisibleAppointments){var x=E.getRows()[0]._calculateVisibleAppointments(N,D);H=x.iStart;k=x.iEnd}for(U=H;U<k;U++){_=D[U];i.openStart("div");i.class("sapUiCalendarAppContainer");i.openEnd();i.openStart("div");i.class("sapUiCalendarAppContainerLeft");i.openEnd();i.openStart("div");i.class("sapUiCalendarAppStart");i.openEnd();i.text(_.appointment._getDateRangeIntersectionText(R).start);i.close("div");i.openStart("div");i.class("sapUiCalendarAppEnd");i.openEnd();i.text(_.appointment._getDateRangeIntersectionText(R).end);i.close("div");i.close("div");i.openStart("div");i.class("sapUiCalendarAppContainerRight");i.openEnd();if(_.isHeader){this.renderIntervalHeader(i,r,_)}else{this.renderAppointment(i,r,_,o,true)}i.close("div");i.close("div")}}if(s.length===0||N.length===0){i.openStart("div");i.class("sapUiCalendarNoApps");i.openEnd();var M=e.getElementById(r.getAssociation("row"));w=M.getNoAppointmentsText()?M.getNoAppointmentsText():t.getResourceBundleFor("sap.m").getText("PLANNINGCALENDAR_ROW_NO_APPOINTMENTS");i.text(w);i.close("div")}if(!(r._getRelativeInfo&&r._getRelativeInfo().bIsRelative)){i.openStart("div",r.getId()+"-Now");i.class("sapUiCalendarRowNow");i.openEnd()}i.close("div");i.openStart("div",r.getId()+"-DummyApp");i.class("sapUiCalendarApp");i.class("sapUiCalendarAppTitleOnly");i.class("sapUiCalendarAppDummy");i.style("margin","0");i.style("height","0px");i.openEnd();i.close("div");if(r.getShowSubIntervals()){var L=r.getIntervalType();var W=0;switch(L){case c.Hour:W=4;break;case c.Day:case c.Week:case c.OneMonth:case"OneMonth":W=24;break;case c.Month:var O=new a(R);O.setUTCMonth(O.getUTCMonth()+T+1,0);W=O.getUTCDate();O.setUTCDate(1);g=O.getUTCDay();break;default:break}var F=100/W;for(U=0;U<W;U++){i.openStart("div");i.class("sapUiCalendarRowAppsSubInt");i.style("width",F+"%");if(r._isNonWorkingInterval(U,f,u,A)){i.class("sapUiCalendarRowAppsNoWork")}i.openEnd();i.close("div")}}i.close("div")};u.getLegendItems=function(t){var a=[],n,i=t.getLegend();if(i){n=e.getElementById(i);if(n){a=n.getItems()}else{d.error("CalendarLegend with id '"+i+"' does not exist!",t)}}return a};u.renderWorkingParts=function(e,t){const a=t/60*100;e.openStart("div");e.style("width",`${a}%`);e.style("height","inherit");e.style("display","inline-block");e.openEnd();e.close("div")};u.renderNonWorkingParts=function(e,t){const a=t/60*100;e.openStart("div");e.style("width",`${a}%`);e.class("sapUiCalendarRowAppsNoWork");e.style("height","inherit");e.style("display","inline-block");e.openEnd();e.close("div")};u.getAriaTextForType=function(e,t){var a,n,r,s;if(t&&t.length){for(var s=0;s<t.length;s++){r=t[s];if(r.getType()===e){a=r.getText();break}}}if(!a){n=i.getTypeAriaText(e);if(n){a=n.getText()}}return a};return u},true);
//# sourceMappingURL=CalendarRowRenderer.js.map