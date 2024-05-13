﻿/*
    Button Editor Plugin
*/

(function () {
    if(typeof _cb === 'undefined') return;

    var html = '<div class="is-modal buttoneditorclassic" tabindex="-1" role="dialog" aria-modal="true" aria-hidden="true">' +
                    '<div class="is-modal-content" style="width:505px;height:620px;position: relative;display: flex;flex-direction: column;align-items: center;padding: 0px;">' +
                        '<div class="is-modal-bar is-draggable" style="background:'+_cb.styleTabsBackground+';position: absolute;top: 0;left: 0;width: 100%;z-index:1;line-height:32px;height:32px;">' + _cb.out('Button Editor') +
                            '<div class="is-modal-close" style="z-index:1;width:32px;height:32px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:32px;font-size: 12px;text-align:center;cursor:pointer;">&#10005;</div>' +
                        '</div>' +
                        '<iframe data-width="1440" style="width:100%;height:100%;max-width:1440px;border:none;border-top:32px solid transparent;margin:0;box-sizing:border-box;" src="about:blank"></iframe>' +
                    '</div>' +
                '</div>';

    _cb.addHtml(html);

    var html_button = '<button title="' + _cb.out('Edit Button') + '" data-title="' + _cb.out('Edit Button') + '" class="button-edit" style="display:none;"><svg class="is-icon-flex" style="width:12px;height:12px;"><use xlink:href="#ion-android-create"></use></svg></button>';
    
    var linkTool = document.querySelector('#divLinkTool');
    if(!linkTool) return; // in case builder is destroyed

    linkTool.insertAdjacentHTML('afterBegin', html_button); //add button to existing #divLinkTool
    
    var buttonEdit = linkTool.querySelector('.button-edit');

    //Extend onContentClick
    var oldget = _cb.opts.onContentClick;
    _cb.opts.onContentClick = function (e) {
        
        let elm = e.target;

        var elmDisplay = elm.style.display; //getStyle(elm, 'display');

        if(elm.className) {
            if(elm.className.indexOf('inline-block')!==-1) elmDisplay='inline-block';
        }

        if((elm.tagName.toLowerCase() === 'a' && (elmDisplay === 'inline-block' || elmDisplay === 'block'))) {


            buttonEdit.style.display = 'block';


        } else {

            buttonEdit.style.display = 'none';

        }

        if(oldget) {
            var ret = oldget.apply(this, arguments);
            return ret;
        }
    };

    buttonEdit.addEventListener('click', function(){
                
        var modal = document.querySelector('.is-modal.buttoneditorclassic');
        _cb.showModal(modal);

        _cb.saveForUndo(true); // checkLater = true

        var btnClose = modal.querySelector('.is-modal-close');
        btnClose.addEventListener('click', function(e){
            _cb.hideModal(modal);
        });

        // Update style
        modal.querySelector('.is-modal-bar').style.background = _cb.styleTabsBackground;

        // var scriptPath = _cb.getScriptPath();
        // modal.querySelector('iframe').src = scriptPath + 'plugins/buttoneditor/buttoneditor.html';

        iframe = modal.querySelector('iframe');
        doc = iframe.contentWindow.document;
        doc.open();
        doc.write(getHTML());
        doc.close();
    });

    var getStyle = function(element, property) {
        return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
    }

    function getHTML() {
        
        var pluginPath = _cb.opts.pluginPath + 'plugins/buttoneditor/';

        const html = `
<!DOCTYPE HTML>
<html> 
<head>
    <meta charset="utf-8">
    <title></title>
    <style>
        body {
            color: ${_cb.styleModalColor};
            margin:0;
            overflow-x:hidden;overflow-y:auto;
            font-family:sans-serif;
            font-size:13px;
            letter-spacing:1px;
            font-weight:300;
        }
        .container > div {
            text-align:center;
            font-size:24px;c
            ursor:pointer;margin: 0;
            display:inline-block;
            float:left;
            width:25%;
            height:80px;
            line-height:80px;
            border:#eee 1px solid;
            box-sizing:border-box;
        }
        .clearfix:before, .clearfix:after {content: " ";display: table;}
        .clearfix:after {clear: both;}
        .clearfix {*zoom: 1;}
        
        .inptext {
            width:90%;
            font-size:17px;
            letter-spacing:1px;
            border:none;
            padding:10px;
            border:rgba(127, 127, 127, 0.32) 1px solid;
        }
        button {
            width: 55px;
            height: 50px;
            line-height: 1;
            display: inline-block;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            cursor: pointer;
            background-color: ${_cb.styleButtonClassicBackground};
            color: ${_cb.styleButtonClassicColor};
            border: 1px solid transparent;
            font-family: sans-serif;
            letter-spacing: 1px;
            font-size: 11px;
            font-weight: normal;
            text-transform: uppercase;
            text-align: center;
            position: relative;
            border-radius: 0;
            transition: all ease 0.3s           
            }
        .inptext:focus {outline:none}
        button:focus {outline:none;}
        
        button.classic-primary {
            display: inline-block;
            width: auto;
            height: 50px;
            padding-left: 10px;
            padding-right: 10px;
            min-width: 135px;
            background-color: ${_cb.styleButtonClassicBackground};
        }
        button.classic-secondary {
            display: inline-block;
            width: auto;
            height: 50px;
            padding-left: 10px;
            padding-right: 10px;
            background: transparent;
        }
        select {
            font-size: 14px;
            letter-spacing: 1px;
            height: 50px;
            line-height: 1.7;
            color: #454545;
            border-radius: 0;
            border: none;
            background-color: #eee;
            width: auto;
            display: inline-block;
            background-image: none;
            -webkit-appearance: menulist;
            -moz-appearance: menulist;
            appearance: menulist;
            padding: 0 5px;
        }
        select:focus {outline:none}
        
        /*
            Tabs
        */
        .is-tabs.simple  {
            white-space:nowrap;
            padding:20px;padding-bottom:5px;padding-top: 10px;
            box-sizing:border-box;
            font-family: sans-serif;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;  
            background: ${_cb.styleTabsBackground};
        }
        .is-tabs.simple a {
            display: inline-block;
            float:left;
            padding: 3px 0 0 1px;
            color: ${_cb.styleTabItemColor};
            border-bottom: transparent 1px solid;
            
            margin: 0 16px 16px 0;
            text-decoration: none;
            transition: box-shadow ease 0.3s;
        }
        .is-tabs.simple a:hover {

        }
        .is-tabs.simple a.active {
            background: transparent;
            box-shadow: none;
            cursor:default;
            border-bottom: ${_cb.styleTabItemBorderBottomActive};
        }
        .is-tab-content.simple {display:none;padding:20px;}

        /* Overide */
        .is-tabs.simple {border-bottom:${_cb.styleSeparatorColor} 1px solid;padding-bottom:15px;}
        .is-tabs.simple a {margin: 0 16px 0 0;line-height:1.5}
        .is-tab-content {
            border:none;
            padding:20px;
            box-sizing:border-box;
            display:none;
            height: 100%;
            position: absolute;
            width: 100%;
            box-sizing: border-box;
            border-top: 50px solid transparent;
            top: 0px;
        }
        
        
        .is-button-remove {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 20px;
            height: 20px;
            background: rgba(95, 94, 94, 0.26);
            color: #fff;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            cursor: pointer;
            display:none;
        }
        #divMyButtonList {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            padding: 20px;
            border-top: transparent 90px solid;
            box-sizing: border-box;
            overflow: hidden;
            overflow-y: auto;
        }
        #divMyButtonList a {position:relative}
        #divMyButtonList a.active .is-button-remove {display:block;}
        #divButtonTemplates {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            padding: 20px;
            box-sizing: border-box;
            overflow: hidden;
            overflow-y: auto;
            opacity: 0.95;
        }
        
        /* Templates */
        #divMyButtonList > a, #divButtonTemplates > a {
            margin: 0px 13px 15px 0;
            padding: 10px 50px;
            font-size: 1rem;
            line-height: 2rem;
            border-radius: 0;
            letter-spacing: 3px;
            display: inline-block;
            font-weight: normal;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            white-space: nowrap;
            -webkit-transition: all 0.16s ease;
            transition: all 0.16s ease;
            text-decoration:none;
            color: #000;
        }     
        
        button.is-btn-color {
            width: 50px;
            height: 50px;
            padding: 0;
            background: ${_cb.styleButtonPickColorBackground};
            // border: rgba(0,0,0,0.09) 1px solid;
            border: ${_cb.styleButtonPickColorBorder};
        }

        .colored .is-tabs.simple {border-bottom:transparent 1px solid;}

        select {
            background: ${_cb.styleSelectBackground};
            color: ${_cb.styleSelectColor};
        }
        
        /* Scrollbar for modal */

        .dark * {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) auto;
        }
        .dark *::-webkit-scrollbar {
            width: 12px;
        }
        .dark *::-webkit-scrollbar-track {
            background: transparent;
        }
        .dark *::-webkit-scrollbar-thumb {
            background-color:rgba(255, 255, 255, 0.3);
        } 

        .colored-dark * {
            scrollbar-width: thin;
            scrollbar-color: rgb(100, 100, 100) auto;
        }
        .colored-dark *::-webkit-scrollbar {
            width: 12px;
        }
        .colored-dark *::-webkit-scrollbar-track {
            background: transparent;
        }
        .colored-dark *::-webkit-scrollbar-thumb {
            background-color:rgb(100, 100, 100);
        } 

        .colored * {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.4) auto;
        }
        .colored *::-webkit-scrollbar {
            width: 12px;
        }
        .colored *::-webkit-scrollbar-track {
            background: transparent;
        }
        .colored *::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.4);
        } 

        .light * {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.4) auto;
        }
        .light *::-webkit-scrollbar {
            width: 12px;
        }
        .light *::-webkit-scrollbar-track {
            background: transparent;
        }
        .light *::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.4);
        } 
    </style>
</head>
<body${_cb.styleDark?' class="dark"':''}${_cb.styleColored?' class="colored"':''}${_cb.styleColoredDark?' class="colored-dark"':''}${_cb.styleLight?' class="light"':''}>

<svg width="0" height="0" style="position:absolute;display:none;">
    <defs>
        <symbol viewBox="0 0 512 512" id="ion-ios-close-empty"><path d="M340.2 160l-84.4 84.3-84-83.9-11.8 11.8 84 83.8-84 83.9 11.8 11.7 84-83.8 84.4 84.2 11.8-11.7-84.4-84.3 84.4-84.2z"></path></symbol>               
        <symbol viewBox="0 0 512 512" id="ion-contrast"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm135.8 359.8C355.5 428 307 448 256 448V64c51 0 99.5 20 135.8 56.2C428 156.5 448 204.7 448 256c0 51.3-20 99.5-56.2 135.8z"></path></symbol>
    </defs>
 </svg>

<div class="is-tabs simple clearfix" data-group="button" style="position: absolute;top: 0;height: 51px;width: 100%;z-index: 1;">
    <a title="${_cb.out('Default')}" href="" data-content="divButtonDefault" class="active" data-lang>${_cb.out('Default')}</a>
    <a title="${_cb.out('Hover')}" href="" data-content="divButtonHover" data-lang>${_cb.out('Hover')}</a>
    <a title="${_cb.out('Saved')}" href="" data-content="divMyButtons" data-lang>${_cb.out('Saved')}</a>
    <a title="${_cb.out('Templates')}" href="" data-content="divTemplates" data-lang>${_cb.out('Templates')}</a>
</div>
<div id="divButtonDefault" class="is-tab-content" data-group="button" style="display:block">

    <div style="display:flex;margin:10px 0 0">
        <div style="width:160px">
            <label>${_cb.out('Background Color')}:<br />
                <button title="${_cb.out('Background Color')}" class="button-bgcolor is-btn-color" style="margin-top:10px"></button>
            </label>
        </div>
        <div style="width:170px;display:none;"> <!-- Remove the display none to enable button gradient -->
            <label>${_cb.out('Gradient')}:<br />
                <button title="${_cb.out('Gradient')}" class="button-gradient classic-primary" style="margin-top:10px">${_cb.out('Gradient')}</button>
            </label>
        </div>
        <div>
            <label>${_cb.out('Text Color')}:<br />
                <button title="${_cb.out('Text Color')}" class="button-textcolor is-btn-color" style="margin-top:10px"></button>
            </label>
        </div>
    </div>

    <div style="display:flex;margin:15px 0 0">
        <div style="width:160px">
            <label for="inpBorderWidth">${_cb.out('Border')}</label>:<br />
            <select id="inpBorderWidth" style="margin-top:10px">
                <option value="" data-lang>${_cb.out('Default')}</option>
                <option value="none" data-lang>${_cb.out('No Border')}</option>
                <option value="1px">1px</option>
                <option value="2px">2px</option>
                <option value="3px">3px</option>
                <option value="4px">4px</option>
            </select>
        </div>
        <div style="width:170px">
            <label>
                ${_cb.out('Border Color')}:<br />
                <button title="${_cb.out('Border Color')}" class="button-bordercolor is-btn-color" style="margin-top:10px"></button>
            </label>
            <button title="${_cb.out('Same as bg color')}" class="classic-primary same-as-bg" style="display:block;min-width:40px;margin:0;font-size:11px;height:30px;padding:0 8px;text-transform:none;">${_cb.out('Same as bg color')}</button>
        </div>
        <div>
            <label>${_cb.out('Border Radius')}</label>:<br />
            <button title="${_cb.out('Decrease')}" class="classic-primary border-radius-dec" style="min-width:55px;font-size:18px;margin-top:10px;float:left">-</button>
            <button title="${_cb.out('Increase')}" class="classic-primary border-radius-inc" style="min-width:55px;font-size:18px;margin-top:10px;">+</button>
        </div>
    </div>
    <div style="display:flex;margin:5px 0 25px">
        <div>
            <label>${_cb.out('Button Size')}</label>: <br />
            <button title="${_cb.out('xxs')}" class="classic-primary size-xxs" style="min-width:55px;margin-top:10px;">${_cb.out('xxs')}</button>
            <button title="${_cb.out('xs')}" class="classic-primary size-xs" style="min-width:55px;margin-top:10px;">${_cb.out('xs')}</button>
            <button title="${_cb.out('s')}" class="classic-primary size-s" style="min-width:55px;margin-top:10px;">${_cb.out('s')}</button>
            <button title="${_cb.out('m')}" class="classic-primary size-m" style="min-width:55px;margin-top:10px;">${_cb.out('m')}</button>
            <button title="${_cb.out('l')}" class="classic-primary size-l" style="min-width:55px;margin-top:10px;">${_cb.out('l')}</button>
            <button title="${_cb.out('xl')}" class="classic-primary size-xl" style="min-width:55px;margin-top:10px;">${_cb.out('xl')}</button>
            <button title="${_cb.out('xxl')}" class="classic-primary size-xxl" style="min-width:55px;margin-top:10px;">${_cb.out('xxl')}</button>
        </div>
    </div>
    <div style="display:flex;margin:20px 0 25px">
        <div style="width:145px">
            <label>${_cb.out('Font Size')}</label>: <br />
            <button title="${_cb.out('Decrease')}" class="classic-primary font-size-dec" style="min-width:55px;font-size:18px;margin-top:10px;float:left">-</button>
            <button title="${_cb.out('Increase')}" class="classic-primary font-size-inc" style="min-width:55px;font-size:18px;margin-top:10px;">+</button>
        </div>
        <div style="width:150px">
            <label>${_cb.out('Letter Spacing')}</label>: <br />
            <button title="${_cb.out('Decrease')}" class="classic-primary letter-spacing-dec" style="min-width:55px;font-size:18px;margin-top:10px;float:left">-</button>
            <button title="${_cb.out('Increase')}" class="classic-primary letter-spacing-inc" style="min-width:55px;font-size:18px;margin-top:10px;">+</button>
        </div>
        <div style="width:120px">
            <label>${_cb.out('Upper/lower')}: <br />
                <button title="${_cb.out('Upper/Lower')}" class="classic-primary textcase" style="margin-top:10px;min-width:55px;font-family: serif;font-size: 14px;text-transform: initial;">Aa</button>
            </label>
        </div>
        <div style="width:110px">
            <label for="inpFontWeight">${_cb.out('Weight')}</label>: <br />
            <select id="inpFontWeight" style="margin-top:10px">
                <option value=""></option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
                <option value="bold" data-lang>${_cb.out('Bold')}</option>
                <option value="normal" data-lang>${_cb.out('Normal')}</option>
            </select>

            <!--<button title="Bold" class="classic-primary fontweight" style="min-width:55px;margin-top:10px;font-family: serif;font-size: 14px;text-transform: initial;">B</button>-->
        </div>
    </div>
    
    <div style="display:flex;margin:15px 0 0">
        <button title="${_cb.out('Clear')}" class="input-clear classic-primary" data-lang>${_cb.out('Clear')}</button>
    </div>

</div>
<div id="divButtonHover" class="is-tab-content" data-group="button">

    <div style="display:flex;margin:10px 0 0">
        <div style="width:160px">
            <label>${_cb.out('Background Color')}:<br>
                <button title="${_cb.out('Background Color')}" class="buttonhover-bgcolor is-btn-color" style="margin-top:10px"></button>
            </label>
        </div>
        <div>
            <label>${_cb.out('Text Color')}:<br />
                <button title="${_cb.out('Text Color')}" class="buttonhover-textcolor is-btn-color" style="margin-top:10px"></button>
            </label>
        </div>
    </div>

    <div style="display:flex;margin:15px 0 25px">
        <div>
            <label>${_cb.out('Border Color')}:<br>
                <button title="${_cb.out('Border Color')}" class="buttonhover-bordercolor is-btn-color" style="margin-top:10px"></button>
            </label>
            <button title="${_cb.out('Same as bg color')}" class="classic-primary same-as-hoverbg" style="display:block;min-width:40px;margin:0;font-size:11px;height:30px;padding:0 8px;text-transform:none;">${_cb.out('Same as bg color')}</button>
        </div>
    </div>
    
    <div style="display:flex;margin:15px 0 0">
        <button title="${_cb.out('Clear')}" class="input-clearhover classic-primary" data-lang>${_cb.out('Clear')}</button>
    </div>

</div>
<div id="divMyButtons" class="is-tab-content" data-group="button" style="padding:0;">

    <div style="height:90px;padding:20px;box-sizing:border-box;position:absolute;top:0;left:0;z-index:1">
        <button title="${_cb.out('Save Current Button')}" class="input-save classic-primary" style="width:220px;" data-lang>${_cb.out('Save Current Button')}</button>
    </div>
    <div id="divMyButtonList" style="padding:1px 20px 10px;"></div>

</div>
<div id="divTemplates" class="is-tab-content" data-group="button" style="padding:0">

    <div id="divButtonTemplates"></div>

</div>

<script>

    var activeLink = parent._cb.activeLink;

    // https://stackoverflow.com/questions/1887104/how-to-get-the-background-color-of-an-element-using-javascript
    var getStyle = function(element, property) {
        return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
    };

    var appendHtml = function(parent, html) {parent.insertAdjacentHTML('beforeend', html);}

    var removeClass = function(element, classname) {
        if(!element) return;
        if(element.classList.length>0) {
            element.className = element.className.replace(classname, '');
        }
    }

    var addClass = function(element, classname) {
        if(!element) return;
        if(hasClass(element,classname)) return;
        if(element.classList.length===0) element.className = classname;
        else element.className = element.className + ' ' + classname;
        element.className = element.className.replace(/  +/g, ' ');
    }

    var hasClass = function(element, classname) {
        if(!element) return false;
        try{
            let s = element.getAttribute('class');
            return new RegExp('\\b'+ classname+'\\b').test(s);
        } catch(e) {
            0;
        }
    }

    // var elms = document.querySelectorAll('[data-lang]');
    // Array.prototype.forEach.call(elms, function(elm) {

    //     elm.innerText = parent._cb.out(elm.textContent);

    // });

    document.querySelector('#divButtonTemplates').innerHTML = '';
    var general = '<a style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 3-->' +
        '<a style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 24-->' +
        '<a style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(188, 188, 188); border-color: rgb(188, 188, 188); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 600; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 25-->' +
        '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="rgb(23, 23, 23)" data-hover-color="#ffffff" data-hover-bordercolor="rgb(23, 23, 23)" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 600; font-size: 14px; letter-spacing: 3px;">Button</a><!-- Button 20 -->' +
        '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="rgb(225, 225, 225)" data-hover-color="#000000" data-hover-bordercolor="rgb(225, 225, 225)" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 23-->' +
        '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#ffffff" data-hover-color="#000000" data-hover-bordercolor="#616161" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(158, 158, 158); border-width: 2px; border-color: rgb(188, 188, 188); border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a>';

    var divButtonTemplates = document.querySelector('#divButtonTemplates');
    appendHtml(divButtonTemplates, '<img src="${pluginPath}images/a.jpg" style="margin:10px 0 20px -20px;width:109%"/>');
    appendHtml(divButtonTemplates, generateButtons('#8ea1ff'));
    appendHtml(divButtonTemplates, '<img src="${pluginPath}images/b.jpg" style="margin:10px 0 20px -20px;width:109%"/>');
    appendHtml(divButtonTemplates, generateButtons());
    appendHtml(divButtonTemplates, '<img src="${pluginPath}images/c.jpg" style="margin:10px 0 20px -20px;width:109%"/>');
    appendHtml(divButtonTemplates, generateButtons('#ff8733'));
    appendHtml(divButtonTemplates, '<img src="${pluginPath}images/d.jpg" style="margin:10px 0 20px -20px;width:109%"/>');
    appendHtml(divButtonTemplates, generateButtons('#ffca18'));
    appendHtml(divButtonTemplates, '<img src="${pluginPath}images/e.jpg" style="margin:10px 0 20px -20px;width:109%"/>');
    appendHtml(divButtonTemplates, generateButtons('#ec4130'));
    appendHtml(divButtonTemplates, '<img src="${pluginPath}images/f.jpg" style="margin:10px 0 20px -20px;width:109%"/>');
    appendHtml(divButtonTemplates, generateButtons('#07d2c0'));
    appendHtml(divButtonTemplates, '<img src="${pluginPath}images/g.jpg" style="margin:10px 0 20px -20px;width:109%"/>');
    appendHtml(divButtonTemplates, generateButtons('#07d1ff'));
    appendHtml(divButtonTemplates, '<img src="${pluginPath}images/h.jpg" style="margin:10px 0 20px -20px;width:109%"/>');
    appendHtml(divButtonTemplates, generateButtons('#ff4c8e'));

    if (parent._cb.settings.emailMode) {
        var element = activeLink;
        while(element.tagName.toLowerCase() !== 'td') {
            element = element.parentNode;
        }
        activeLink = element;
        var a = activeLink.querySelector('a');
        a.style.color = 'inherit !important';
        a.style.fontWeight = 'inherit !important';
        a.style.fontSize = 'inherit !important';
    }

    //background color
    var bgcolor = getStyle(activeLink, 'background-color');
    var btnBgColor = document.querySelector('.button-bgcolor');
    btnBgColor.style.backgroundColor = bgcolor;
    
    btnBgColor.addEventListener('click', function(e) {

        parent._cb.uo.saveForUndo(true); // checkLater = true

        parent._cb.pickColor(function (color) {
            
            activeLink.style.backgroundColor = color;
            document.querySelector('.button-bgcolor').style.backgroundColor = color;
                
            //Trigger Change event
            parent._cb.opts.onChange();

        }, document.querySelector('.button-bgcolor').style.backgroundColor);

    });

    //Gradient
    var btnGraident = document.querySelector('.button-gradient');
    btnGraident.addEventListener('click', function(e) {

        parent._cb.uo.saveForUndo(true); // checkLater = true

        var picker = parent._cb.gradientpicker();
        picker.open(activeLink, function (gradient) {
            
            activeLink.style.backgroundImage = gradient;
                
            //Trigger Change event
            parent._cb.opts.onChange();

        }, function() {
            // on Finish
        });

    });

    //text color
    var textcolor = getStyle(activeLink, 'color');
    var btnTextColor = document.querySelector('.button-textcolor');
    btnTextColor.style.backgroundColor = textcolor;
    
    btnTextColor.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(true); // checkLater = true

        parent._cb.pickColor(function (color) {
            
            activeLink.style.color = color;
            if (parent._cb.settings.emailMode) {
                var a = activeLink.querySelector('a');
                if(a) a.style.color = color;
            }

            document.querySelector('.button-textcolor').style.backgroundColor = color;
                
            //Trigger Change event
            parent._cb.opts.onChange();

        }, document.querySelector('.button-textcolor').style.backgroundColor);

    });

    //border color
    var bordercolor = getStyle(activeLink, 'border-color');
    var btnBorderColor = document.querySelector('.button-bordercolor');
    btnBorderColor.style.backgroundColor = bordercolor;

    btnBorderColor.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(true); // checkLater = true

        parent._cb.pickColor(function (color) {
            
            activeLink.style.borderColor = color;
            document.querySelector('.button-bordercolor').style.backgroundColor = color;    

            //Trigger Change event
            parent._cb.opts.onChange();

        }, document.querySelector('.button-bordercolor').style.backgroundColor);

    });

    //border width
    var currBw = getStyle(activeLink, 'border-top-width'); // use one side
    if (currBw == '' || currBw == '1px' || currBw == '2px' || currBw == '3px') document.querySelector('#inpBorderWidth').value = currBw;
    if (activeLink.style.border == 'none' || activeLink.style.border == 'none') document.querySelector('#inpBorderWidth').value = 'none';

    var inpBorderWidth = document.querySelector('#inpBorderWidth');
    inpBorderWidth.addEventListener('change', function(e) {
        
        parent._cb.uo.saveForUndo(); 

        var bw = document.querySelector('#inpBorderWidth').value;
        if (bw == 'none') {
            activeLink.style.border = 'none';
        } else {

            var btnBorderColor = document.querySelector('.button-bordercolor');
            var color = btnBorderColor.style.backgroundColor;

            if (color == '') {
                btnBorderColor.style.backgroundColor = 'rgb(0,0,0)';
                color = 'rgb(0,0,0)';
            }
            activeLink.style.borderWidth = bw;
            activeLink.style.borderColor = color;
            activeLink.style.borderStyle = 'solid';
        }
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //border radius
    var btnBorderRadiusDec = document.querySelector('.border-radius-dec');
    btnBorderRadiusDec.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        var borderradius = getStyle(activeLink, 'border-radius'); 
        if(borderradius=='') borderradius = activeLink.style.borderRadius;
        var currBrad = borderradius;
        if (currBrad == '') currBrad = '0px';
        var n = parseInt(currBrad);
        n = n - 2;
        if (n <= 0) n = 0;
        activeLink.style.borderRadius = n + 'px';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnBorderRadiusInc = document.querySelector('.border-radius-inc');
    btnBorderRadiusInc.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 

        var borderradius = getStyle(activeLink, 'border-radius'); 
        if(borderradius=='') borderradius = activeLink.style.borderRadius;
        var currBrad = borderradius;
        if (currBrad == '') currBrad = '0px';
        var n = parseInt(currBrad);
        n = n + 2;
        activeLink.style.borderRadius = n + 'px';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //sizes
    var btnSizeXXS = document.querySelector('.size-xxs');
    btnSizeXXS.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 

        activeLink.style.padding = '6px 12px';
        activeLink.style.fontSize = '8px';
        activeLink.style.lineHeight = '1.5';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnSizeXS = document.querySelector('.size-xs');
    btnSizeXS.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        activeLink.style.padding = '8px 17px';
        activeLink.style.fontSize = '10px';
        activeLink.style.lineHeight = '1.5';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnSizeS = document.querySelector('.size-s');
    btnSizeS.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        activeLink.style.padding = '10px 22px';
        activeLink.style.fontSize = '12px';
        activeLink.style.lineHeight = '1.5';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnSizeM = document.querySelector('.size-m');
    btnSizeM.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        activeLink.style.padding = '13px 28px';
        activeLink.style.fontSize = '14px';
        activeLink.style.lineHeight = '1.5';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnSizeL = document.querySelector('.size-l');
    btnSizeL.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        activeLink.style.padding = '16px 35px';
        activeLink.style.fontSize = '16px';
        activeLink.style.lineHeight = '1.5';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnSizeXL = document.querySelector('.size-xl');
    btnSizeXL.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        activeLink.style.padding = '19px 42px';
        activeLink.style.fontSize = '18px';
        activeLink.style.lineHeight = '1.5';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnSizeXXL = document.querySelector('.size-xxl');
    btnSizeXXL.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        activeLink.style.padding = '22px 50px';
        activeLink.style.fontSize = '20px';
        activeLink.style.lineHeight = '1.5';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //text case
    var btnTextCase = document.querySelector('.textcase');
    btnTextCase.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        var tt = getStyle(activeLink, 'text-transform');
        if (tt == 'uppercase') {
            activeLink.style.textTransform = 'initial';
        } else {
            activeLink.style.textTransform = 'uppercase';
        }
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //font weight
    var fw = getStyle(activeLink, 'font-weight'); 
    document.querySelector('#inpFontWeight').value = fw;
    var inpFontWeight = document.querySelector('#inpFontWeight');
    inpFontWeight.addEventListener('change', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        var fw = document.querySelector('#inpFontWeight').value;
        activeLink.style.fontWeight = fw;
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //font size
    var btnFontSizeDec = document.querySelector('.font-size-dec');
    btnFontSizeDec.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        var currFs = getStyle(activeLink, 'font-size'); 
        var n = parseInt(currFs);
        n = n - 1;
        if (n <= 8) n = 8;
        activeLink.style.fontSize = n + 'px';
        
        //added by Jack - apply to child nodes
        var cbDom = parent._cb.cbDom;
        var arrSizes = parent._cb.opts.fontSizeClassValues;
        let elmns = Array.prototype.slice.call(activeLink.getElementsByTagName("*"));
        for(var i=0; i<elmns.length; i++) {
            elmns[i].style.fontSize = n + 'px';
            //remove font-size class
            for(var j=0;j<arrSizes.length; j++) {
                cbDom.removeClass(elmns[i], 'size-'+arrSizes[j]);
            }
        }
        // ----  

        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnFontSizeInc = document.querySelector('.font-size-inc');
    btnFontSizeInc.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        var currFs = getStyle(activeLink, 'font-size'); 
        var n = parseInt(currFs);
        n = n + 1;
        activeLink.style.fontSize = n + 'px';
        
        //added by Jack - apply to child nodes
        var cbDom = parent._cb.cbDom;
        var arrSizes = parent._cb.opts.fontSizeClassValues;
        let elmns = Array.prototype.slice.call(activeLink.getElementsByTagName("*"));
        for(var i=0; i<elmns.length; i++) {
            elmns[i].style.fontSize = n + 'px';
            //remove font-size class
            for(var j=0;j<arrSizes.length; j++) {
                cbDom.removeClass(elmns[i], 'size-'+arrSizes[j]);
            }
        }
        // ----  

        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //letter spacing
    var btnLetterSpacingDec = document.querySelector('.letter-spacing-dec');
    btnLetterSpacingDec.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        var currLs = getStyle(activeLink, 'letter-spacing'); 
        var n = parseInt(currLs);
        if(!isNaN(n)) {
            n = n - 1;
            if (n <= 0) n = 0;
        } else {
            n = 0;
        }
        activeLink.style.letterSpacing = n + 'px';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });
    var btnLetterSpacingInc = document.querySelector('.letter-spacing-inc');
    btnLetterSpacingInc.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        var currLs = getStyle(activeLink, 'letter-spacing'); 
        var n = parseInt(currLs);
        if(!isNaN(n)) {
            n = n + 1;
        } else {
            n = 1;
        }
        activeLink.style.letterSpacing = n + 'px';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //make = bg color
    var btnSameAsBgColor = document.querySelector('.same-as-bg');
    btnSameAsBgColor.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 

        var btnBgColor = document.querySelector('.button-bgcolor');
        var bgcolor = btnBgColor.style.backgroundColor;

        var btnBorderColor = document.querySelector('.button-bordercolor');
        btnBorderColor.style.backgroundColor = bgcolor;

        activeLink.style.borderColor = bgcolor;

        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //clear
    var btnClear = document.querySelector('.input-clear');
    btnClear.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo();

        activeLink.setAttribute('style', '');
        document.querySelector('#inpBorderWidth').value = '';

        if (parent._cb.settings.emailMode) {
            var a = activeLink.querySelector('a');
            if(a) {
                a.setAttribute('style', 'color: inherit !important; font-weight: inherit !important; font-size: inherit !important');
            }
        }

        var btnBgColor = document.querySelector('.button-bgcolor');
        btnBgColor.style.backgroundColor = '';

        var btnTextColor = document.querySelector('.button-textcolor');
        btnTextColor.style.backgroundColor = '';

        var btnBorderColor = document.querySelector('.button-bordercolor');
        btnBorderColor.style.backgroundColor = '';
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //hover background color
    var hoverbgcolor = activeLink.getAttribute('data-hover-bgcolor');
    var btnHoverBgColor = document.querySelector('.buttonhover-bgcolor');
    btnHoverBgColor.style.backgroundColor = hoverbgcolor;
    
    btnHoverBgColor.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(true); // checkLater = true

        parent._cb.pickColor(function (color) {
            
            activeLink.setAttribute('data-hover-bgcolor', color);
            addButtonScript(activeLink);

            document.querySelector('.buttonhover-bgcolor').style.backgroundColor = color;
        
            //Trigger Change event
            parent._cb.opts.onChange();

        }, document.querySelector('.buttonhover-bgcolor').style.backgroundColor);

    });

    //hover text color
    var hovertextcolor = activeLink.getAttribute('data-hover-color');
    var btnHoverTextColor = document.querySelector('.buttonhover-textcolor');
    btnHoverTextColor.style.backgroundColor = hovertextcolor;
    
    btnHoverTextColor.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(true); // checkLater = true

        parent._cb.pickColor(function (color) {
            
            activeLink.setAttribute('data-hover-color', color);
            addButtonScript(activeLink);

            document.querySelector('.buttonhover-textcolor').style.backgroundColor = color;
        
            //Trigger Change event
            parent._cb.opts.onChange();

        }, document.querySelector('.buttonhover-textcolor').style.backgroundColor);

    });

    //hover border color
    var hoverbordercolor = activeLink.getAttribute('data-hover-bordercolor');
    var btnHoverBorderColor = document.querySelector('.buttonhover-bordercolor');
    btnHoverBorderColor.style.backgroundColor = hoverbordercolor;
    
    btnHoverBorderColor.addEventListener('click', function(e){
        
        parent._cb.uo.saveForUndo(true); // checkLater = true

        parent._cb.pickColor(function (color) {
            
            activeLink.setAttribute('data-hover-bordercolor', color);
            addButtonScript(activeLink);

            document.querySelector('.buttonhover-bordercolor').style.backgroundColor = color;
        
            //Trigger Change event
            parent._cb.opts.onChange();

        }, document.querySelector('.buttonhover-bordercolor').style.backgroundColor);

    });

    //make = hover bg color
    var btnSameAsHoverBgColor = document.querySelector('.same-as-hoverbg');
    btnSameAsHoverBgColor.addEventListener('click', function(e){
        
        parent._cb.uo.saveForUndo(); 

        var btnHoverBgColor = document.querySelector('.buttonhover-bgcolor');
        var hoverbgcolor = btnHoverBgColor.style.backgroundColor;

        var btnHoverBorderColor = document.querySelector('.buttonhover-bordercolor');
        btnHoverBorderColor.style.backgroundColor = hoverbgcolor;

        activeLink.setAttribute('data-hover-bordercolor', hoverbgcolor);
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });

    //clear hover
    var btnClearHover = document.querySelector('.input-clearhover');
    btnClearHover.addEventListener('click', function(e) {
        
        parent._cb.uo.saveForUndo(); 
        
        var btnHoverBgColor = document.querySelector('.buttonhover-bgcolor');
        btnHoverBgColor.style.backgroundColor = '';

        var btnHoverTextColor = document.querySelector('.buttonhover-textcolor');
        btnHoverTextColor.style.backgroundColor = '';
        
        var btnHoverBorderColor = document.querySelector('.buttonhover-bordercolor');
        btnHoverBorderColor.style.backgroundColor = '';

        activeLink.removeAttribute('data-hover-bgcolor');
        activeLink.removeAttribute('data-hover-color');
        activeLink.removeAttribute('data-hover-bordercolor');

        activeLink.removeAttribute('onmouseover');
        activeLink.removeAttribute('onmouseout');
        
        //Trigger Change event
        parent._cb.opts.onChange();
    });


    if (localStorage.getItem("_mybuttons") != null) {

        renderMyButtons();

        var buttons = document.querySelectorAll('#divMyButtonList a');
        Array.prototype.forEach.call(buttons, function(button) {

            var activeButton = button;
            button.addEventListener('click', function(e){
                
                parent._cb.uo.saveForUndo(); 

                var links = document.querySelectorAll('#divMyButtonList a');
                Array.prototype.forEach.call(links, function(link) {
                    removeClass(link, 'active');
                });
                addClass(activeButton, 'active');
                
                applyStyles(activeLink, activeButton);
                
                updateSettings(activeLink);

                cleanupClasses(activeLink);
                
                //Trigger Change event
                parent._cb.opts.onChange();
            });

        });

        var btnRemoves = document.querySelectorAll('.is-button-remove');
        Array.prototype.forEach.call(btnRemoves, function(btnRemove) {

            btnRemove.addEventListener('click', function(e) {
                
                parent._cb.uo.saveForUndo(); 

                var button = e.target.parentNode.parentNode;

                if(button.tagName.toLowerCase() !== 'a') button = button.parentNode;

                if (localStorage.getItem("_mybuttons") != null) {
                    var mybuttons = JSON.parse(localStorage.getItem("_mybuttons"));

                    var id = button.getAttribute('data-id');
                    
                    for (var i = 0; i < mybuttons.length; i++) {
                        if (i == id) {
                            mybuttons.splice(i, 1);

                            localStorage.setItem("_mybuttons", JSON.stringify(mybuttons));

                            button.parentNode.removeChild(button);

                            var n = 0;
                            
                            var links = document.querySelectorAll('#divMyButtonList a');
                            Array.prototype.forEach.call(links, function(link) {
                                link.setAttribute('data-id', n);
                                n = n + 1;
                            });

                            return;
                        }
                    }

                }
                
                //Trigger Change event
                parent._cb.opts.onChange();

            });

        });

    }

    //save button
    var btnSave = document.querySelector('.input-save');
    btnSave.addEventListener('click', function(e) {
        
        var btnBgColor = document.querySelector('.button-bgcolor');
        var bgcolor = btnBgColor.style.backgroundColor;
        if (bgcolor != '') {
            bgcolor = 'background-color:' + bgcolor + ';';
        } else {
            bgcolor = '';
        }

        var btnTextColor = document.querySelector('.button-textcolor');
        var textcolor = btnTextColor.style.backgroundColor;
        if (textcolor != '') {
            textcolor = 'color:' + textcolor + ';';
        } else {
            textcolor = '';
        }
        var borderwidth = document.querySelector('#inpBorderWidth').value;
        var border = '';
        if (borderwidth == 'none') {
            border = 'border:none;';
        } else {
            
            var btnBorderColor = document.querySelector('.button-bordercolor');
            var bordercolor = btnBorderColor.style.backgroundColor;

            if (bordercolor != '') {
                bordercolor = 'border-color:' + bordercolor + ';';
            } else {
                bordercolor = '';
            }
            border = 'border-width:' + borderwidth + ';' + bordercolor;
        }
        var borderradius = activeLink.style.borderRadius;
        if (borderradius == '') {
            borderradius = 'border-radius:0px;';
        } else {
            borderradius = 'border-radius:' + borderradius + ';';
        }
        var padding = activeLink.style.padding; 
        var lineheight = activeLink.style.lineHeight; 
        var texttransform = activeLink.style.textTransform;
        var fontweight = activeLink.style.fontWeight;
        var fontsize = activeLink.style.fontSize;
        var letterspacing = activeLink.style.letterSpacing;

        //var css = bgcolor + textcolor + border + borderradius + 'padding:' + padding + ';line-height:' + lineheight + ';text-transform:' + texttransform + ';font-weight:' + fontweight + ';font-size:' + fontsize + ';letter-spacing:' + letterspacing + ' ;';
        var css = activeLink.getAttribute('style');

        var mybuttons = [];
        if (localStorage.getItem("_mybuttons") != null) {
            var mybuttons = JSON.parse(localStorage.getItem("_mybuttons"));
        }
        mybuttons.push([
            bgcolor + '|' +
            css + '|' +
            (activeLink.getAttribute('data-hover-bgcolor') ? activeLink.getAttribute('data-hover-bgcolor') : '') + '|' +
            (activeLink.getAttribute('data-hover-color') ? activeLink.getAttribute('data-hover-color') : '') + '|' +
            (activeLink.getAttribute('data-hover-bordercolor') ? activeLink.getAttribute('data-hover-bordercolor') : '')
        ]);
        localStorage.setItem("_mybuttons", JSON.stringify(mybuttons));

        renderMyButtons();

        var buttons = document.querySelectorAll('#divMyButtonList a');
        Array.prototype.forEach.call(buttons, function(button) {

            var activeButton = button;
            button.addEventListener('click', function(e){
                
                parent._cb.uo.saveForUndo(); 

                var links = document.querySelectorAll('#divMyButtonList a');
                Array.prototype.forEach.call(links, function(link) {
                    removeClass(link, 'active');
                });
                addClass(activeButton, 'active');
                
                applyStyles(activeLink, activeButton);
                
                updateSettings(activeLink);

                cleanupClasses(activeLink);
        
                //Trigger Change event
                parent._cb.opts.onChange();
            });

        });

        
        var btnRemoves = document.querySelectorAll('.is-button-remove');
        Array.prototype.forEach.call(btnRemoves, function(btnRemove) {

            btnRemove.addEventListener('click', function(e) {
                
                parent._cb.uo.saveForUndo(); 

                var button = e.target.parentNode.parentNode;

                if(button.tagName.toLowerCase() !== 'a') button = button.parentNode;

                if (localStorage.getItem("_mybuttons") != null) {
                    var mybuttons = JSON.parse(localStorage.getItem("_mybuttons"));

                    var id = button.getAttribute('data-id');
                    
                    for (var i = 0; i < mybuttons.length; i++) {
                        if (i == id) {
                            mybuttons.splice(i, 1);

                            localStorage.setItem("_mybuttons", JSON.stringify(mybuttons));

                            button.parentNode.removeChild(button);

                            var n = 0;
                            
                            var links = document.querySelectorAll('#divMyButtonList a');
                            Array.prototype.forEach.call(links, function(link) {
                                link.setAttribute('data-id', n);
                                n = n + 1;
                            });

                            return;
                        }
                    }

                }
        
                //Trigger Change event
                parent._cb.opts.onChange();

            });

        });

    });

    var buttons = document.querySelectorAll('#divButtonTemplates a');
    Array.prototype.forEach.call(buttons, function(button) {

        var activeButton = button;
        button.addEventListener('click', function(e){
            
            parent._cb.uo.saveForUndo(); 
            
            var links = document.querySelectorAll('#divButtonTemplates a');
            Array.prototype.forEach.call(links, function(link) {
                removeClass(link, 'active');
            });
            addClass(activeButton, 'active');
            
            applyStyles(activeLink, activeButton);
            
            updateSettings(activeLink);

            cleanupClasses(activeLink);
            
            //Trigger Change event
            parent._cb.opts.onChange();
        });

    });

    function generateButtons(base) {
        var template = '' +
            '<a style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: #34dd87; border-color: #34dd87; border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 600; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 18-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#34dd87" data-hover-color="#f8f8f8" data-hover-bordercolor="#34dd87" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: #34dd87; border-color: #34dd87; border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 600; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 4-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#34dd87" data-hover-color="#ffffff" data-hover-bordercolor="#34dd87" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 19-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#34dd87" data-hover-color="#f8f8f8" data-hover-bordercolor="#34dd87" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 22-->' +
        /*'<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#34dd87" data-hover-color="#f8f8f8" data-hover-bordercolor="#34dd87" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(188, 188, 188); border-color: rgb(188, 188, 188); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 600; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 9-->' +*/
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="" data-hover-color="#000000" data-hover-bordercolor="#000000" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: #34dd87; border-color: #34dd87; border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 12-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#ffffff" data-hover-color="#34dd87" data-hover-bordercolor="#34dd87" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(0, 0, 0); border-color: rgb(17, 17, 17); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 17-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="" data-hover-color="#34dd87" data-hover-bordercolor="#34dd87" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(158, 158, 158); border-color: rgb(188, 188, 188); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 10-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#3dea92" data-hover-color="#ffffff" data-hover-bordercolor="#3dea92" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: #34dd87; color: rgb(248, 248, 248); border-color: #34dd87; border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 5-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#2fd07e" data-hover-color="#ffffff" data-hover-bordercolor="#2fd07e" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: #34dd87; color: rgb(255, 255, 255); border-color: #34dd87; border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 8-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#000000" data-hover-color="#f8f8f8" data-hover-bordercolor="#000000" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: #34dd87; color: rgb(23, 23, 23); border-color: #34dd87; border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 600; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 11-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#34dd87" data-hover-color="#ffffff" data-hover-bordercolor="#34dd87" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgb(23, 23, 23); color: #34dd87; border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 600; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 14-->' +
            '<a onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" data-hover-bgcolor="#34dd87" data-hover-color="#ffffff" data-hover-bordercolor="#34dd87" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgb(23, 23, 23); color: rgb(255, 255, 255); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 600; font-size: 14px; letter-spacing: 3px;">Button</a><!--Button 16-->';
        if (!base) return template;
        var html = '';
        html = template.replace(new RegExp('#34dd87', 'g'), base);
        var hover1 = parent._cb.LightenDarkenColor(base, 15);
        var hover2 = parent._cb.LightenDarkenColor(base, -20);
        html = html.replace(new RegExp('#3dea92', 'g'), hover1);
        html = html.replace(new RegExp('#2fd07e', 'g'), hover2);
        return html;
    }

    function renderMyButtons() {
        var mybuttons = JSON.parse(localStorage.getItem("_mybuttons"));

        var html_mybuttons = '';
        for (var i = 0; i < mybuttons.length; i++) {

            var s = mybuttons[i] + '';
            var bg = s.split('|')[0]; //not used
            var css = s.split('|')[1];

            var onmouse = 'onmouseover="this.setAttribute(\\'data-style\\',this.style.cssText);if(this.getAttribute(\\'data-hover-bordercolor\\')) this.style.borderColor=this.getAttribute(\\'data-hover-bordercolor\\');if(this.getAttribute(\\'data-hover-bgcolor\\')) this.style.backgroundColor=this.getAttribute(\\'data-hover-bgcolor\\');if(this.getAttribute(\\'data-hover-color\\')) this.style.color=this.getAttribute(\\'data-hover-color\\');" ' +
                    'onmouseout="this.setAttribute(\\'style\\',this.getAttribute(\\'data-style\\'));this.removeAttribute(\\'data-style\\')" ';
            if (s.split('|')[2] == '' && s.split('|')[3] == '' && s.split('|')[4] == '') {
                onmouse = '';
            }
            var datahoverbgcolor = '';
            if (s.split('|')[2] != '') {
                datahoverbgcolor = 'data-hover-bgcolor="' + s.split('|')[2] + '" ';
            }
            var datahovercolor = '';
            if (s.split('|')[3] != '') {
                datahovercolor = 'data-hover-color="' + s.split('|')[3] + '" ';
            }
            var datahoverbordercolor = '';
            if (s.split('|')[4] != '') {
                datahoverbordercolor = 'data-hover-bordercolor="' + s.split('|')[4] + '" ';
            }

            html_mybuttons += '<a ' +
                    'data-id="' + i + '" ' +
                    onmouse +
                    datahoverbgcolor +
                    datahovercolor +
                    datahoverbordercolor +
                    'data-style="' + css + '" ' +
                    'style="' + css + '">Button<div class="is-button-remove"><svg class="is-icon-flex" style="fill:rgba(255, 255, 266, 1);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div></a>';

        }

        document.querySelector('#divMyButtonList').innerHTML = html_mybuttons;
    }

    function applyStyles(link, button) {
        var margin = 'margin-top: ' + link.style.marginTop + ';';
        margin += 'margin-right: ' + link.style.marginRight + ';';
        margin += 'margin-bottom: ' + link.style.marginBottom + ';';
        margin += 'margin-left: ' + link.style.marginLeft + ';';

        if (button.getAttribute('data-style')) {
            link.setAttribute('style', margin + button.getAttribute('data-style'));
        } else {
            link.setAttribute('style', margin + button.getAttribute('style'));
        }
        if (button.getAttribute('data-hover-bgcolor')) {
            link.setAttribute('data-hover-bgcolor', button.getAttribute('data-hover-bgcolor'));
        } else {
            link.removeAttribute('data-hover-bgcolor');
        }
        if (button.getAttribute('data-hover-color')) {
            link.setAttribute('data-hover-color', button.getAttribute('data-hover-color'));
        } else {
            link.removeAttribute('data-hover-color');
        }
        if (button.getAttribute('data-hover-bordercolor')) {
            link.setAttribute('data-hover-bordercolor', button.getAttribute('data-hover-bordercolor'));
        } else {
            link.removeAttribute('data-hover-bordercolor');
        }
        if (button.getAttribute('onmouseover')) {
            link.setAttribute("onmouseover", "this.setAttribute('data-style',this.style.cssText);if(this.getAttribute('data-hover-bordercolor')) this.style.borderColor=this.getAttribute('data-hover-bordercolor');if(this.getAttribute('data-hover-bgcolor')) this.style.backgroundColor=this.getAttribute('data-hover-bgcolor');if(this.getAttribute('data-hover-color')) this.style.color=this.getAttribute('data-hover-color');");
        } else {
            link.removeAttribute('onmouseover');
        }
        if (button.getAttribute('onmouseout')) {
            link.setAttribute("onmouseout", "this.setAttribute('style',this.getAttribute('data-style'));this.removeAttribute('data-style')");
        } else {
            link.removeAttribute('onmouseout');
        }

        if (parent._cb.settings.emailMode) {
            var a = link.querySelector('a');
            if(a) {
                a.setAttribute('style', 'color: inherit !important; font-weight: inherit !important; font-size: inherit !important');
            }
        }
    }

    function updateSettings(link) {
        setTimeout(function () {
            
            var btnBgColor = document.querySelector('.button-bgcolor');
            btnBgColor.style.backgroundColor = link.style.backgroundColor;

            var btnTextColor = document.querySelector('.button-textcolor');
            btnTextColor.style.backgroundColor = link.style.color;

            var btnBorderColor = document.querySelector('.button-bordercolor');
            btnBorderColor.style.backgroundColor = link.style.borderColor;

            var currBw = link.style.borderTopWidth;
            if (currBw == '' || currBw == '1px' || currBw == '2px' || currBw == '3px') document.querySelector('#inpBorderWidth').value = currBw;
            if (link.style.border == 'none' || link.style.border == 'none') document.querySelector('#inpBorderWidth').value = 'none';

            var btnHoverBgColor = document.querySelector('.buttonhover-bgcolor');
            btnHoverBgColor.style.backgroundColor = link.getAttribute('data-hover-bgcolor');

            var btnHoverTextColor = document.querySelector('.buttonhover-textcolor');
            btnHoverTextColor.style.backgroundColor = link.getAttribute('data-hover-color');

            var btnHoverBorderColor = document.querySelector('.buttonhover-bordercolor');
            btnHoverBorderColor.style.backgroundColor = link.getAttribute('data-hover-bordercolor');

        }, 300);
    }

    function cleanupClasses(link) {
        // removeClass(link, 'is-btn-ghost1');
        // removeClass(link, 'is-btn-ghost2');
        // removeClass(link, 'is-upper');
        // removeClass(link, 'is-btn-small');
        // removeClass(link, 'is-btn');
        // removeClass(link, 'is-rounded-30');
        // removeClass(link, 'btn-primary');
        // removeClass(link, 'btn-default');
        // removeClass(link, 'btn');

        link.removeAttribute('class');
    }

    function addButtonScript(link) {
        link.setAttribute("onmouseover", "this.setAttribute('data-style',this.style.cssText);" +
            "if(this.getAttribute('data-hover-bordercolor')) this.style.borderColor=this.getAttribute('data-hover-bordercolor');" +
            "if(this.getAttribute('data-hover-bgcolor')) this.style.backgroundColor=this.getAttribute('data-hover-bgcolor');" +
            "if(this.getAttribute('data-hover-color')) this.style.color=this.getAttribute('data-hover-color');");

        link.setAttribute("onmouseout", "this.setAttribute('style',this.getAttribute('data-style'));" +
            "this.removeAttribute('data-style')");

    }

    /* ------------------- Tabs --------------------- */

    var tabs = document.querySelectorAll('.is-tabs a');
    Array.prototype.forEach.call(tabs, function(tab) {

        tab.addEventListener('click', function(e){

            if(hasClass(tab, 'active')) {
                e.preventDefault();
                return false;
            }
            var id = tab.getAttribute('data-content');
            if(!id) {
                e.preventDefault();
                return false;
            }

            var group = tab.parentNode.getAttribute('data-group');

            var samegrouptabs = document.querySelectorAll('.is-tabs[data-group="' + group + '"] > a');
            Array.prototype.forEach.call(samegrouptabs, function(samegrouptab) {
                removeClass(samegrouptab, 'active');
            });
            addClass(tab, 'active');

            var samegroupcontents = document.querySelectorAll('.is-tab-content[data-group="' + group + '"]');
            Array.prototype.forEach.call(samegroupcontents, function(samegroupcontent) {
                samegroupcontent.style.display = 'none';
            });
            document.querySelector('#' + id).style.display = 'block';

            e.preventDefault();
            return false;
        });

    });

</script>
</body>
</html>

        `;

        return html;
    }

})();

