chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Loaded.");	
		script();		
		// ----------------------------------------------------------

	}
	}, 10);
});



function script()
{
	var tradeoffertrigger = false;
	 
	if(window.location.href.indexOf("http://steamcommunity.com/trade/") > -1)
	{    
	    //console.log(window.location.href.indexOf("http://steamcommunity.com/trade/"));
	    //alert("hit");
	    setTimeout(steamclose, Math.floor((Math.random()*3000)+1000));
	}
	 
	if(window.location.href.indexOf("http://steamcommunity.com/tradeoffer/") > -1)
	{	
	    //alert("hit");
	    setTimeout(steamverify, Math.floor((Math.random()*5000)+3000));	    
	}
	 
	 
	if(document.domain == "dota2lounge.com")
	{
		var port = chrome.runtime.connect({name: "knockknock"});
		//OpenInNewTab("http://www.google.com/", port); -- example
	    try{
	        window.scrollTo(0,document.body.scrollHeight);
	        var startTime = Date.now();
	        setInterval( function() { 
	        	console.log((Date.now() - startTime) + 'ms elapsed'); 
	        	try {
	        		click(freezebutton); 
	        	}
	        	catch(error) { 
	        		setTimeout(checkforoffer,5000); 
	        	} 
	        }, 7000);
	    }
	    catch(error){
	        setTimeout(checkforoffer, 5000);
	    }	
	}
	 
	function OpenInNewTab(url, port){
		port.postMessage("000:".concat(url));
		//chrome.extension.sendMessage({}, url.href, 10);	
	    //GM_openInTab(url.href, "insert");    
	}
	 
	function checkforoffer(){
	    if(tradeoffertrigger == false)
	    {
	        var searcharea = jQuery('a').parent('div').text();
	        if( searcharea.indexOf( "Your offer is ready." ) != -1 )
	        {
	            var links = document.links;
	            for(var i=0; i<links.length; i++) {
	                if(links[i].href.indexOf("http://steamcommunity.com/tradeoffer/") > -1)
	                {
	                    OpenInNewTab(links[i]);
	                }
	            }            
	            tradeoffertrigger = true;
	        }
	        else
	        {
	            setTimeout(checkforoffer, 5300);
	        }
	    }
	}
	 
	function steamverify(){
	    location.href = "javascript:ToggleReady(true)";
	    setTimeout(steamtrustuser, 1000);
	    setTimeout(steamconfirm, Math.floor((Math.random()*2000)+1000));
	    setTimeout(steamverifyrep, Math.floor((Math.random()*2000)+1000));
	}
	 
	function steamverifyrep(){
	    location.href = "javascript:ToggleReady(true)";
	    setTimeout(steamverifyrep, Math.floor((Math.random()*2000)+1000));
	}
	 
	function steamconfirm(){
		location.href = "javascript:ConfirmTradeOffer()";
	    setTimeout(steamconfirm, 4000);
	}
	 
	//function steamtrustuser(){
	//    waitForKeyElements ("#btn_green_white_innerfade btn_medium", triggerMostButtons);    
	//    console.log("hit");
	//    setTimeout(steamtrustuser, 1000);
	//}

	function steamtrustuser(){
	    //div.newmodal > div.newmodal_content_border > div.newmodal_content > div.newmodal_buttons > div.btn_grey_white_innerfade btn_medium > span
	    var target = $("/html/body/div[182]/div[2]/div/div[2]/div[1]/span");//   li.booster > div.top > strong > a:first");
	    clickJ_Node(target);
	}
	 
	function steamclose(){    
	    //alert("hit");
	    if(window.location.href.indexOf("receipt") > -1)
	    {      
	        //alert("hit");
	        self.close();
	    }
	}
	 
	function click(elm) {
	    var evt = document.createEvent('MouseEvents');
	    evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
	    elm.dispatchEvent(evt);
	}
	 
	function clickJ_Node (jNode){
	    if (jNode && jNode.length)
	    {
	        var clickEvent  = document.createEvent ("HTMLEvents");
	        clickEvent.initEvent ("click", true, true);
	        jNode[0].dispatchEvent (clickEvent);
	    }
	    else
	        console.log('No node found to click!');
	}
	 
	function triggerMostButtons (jNode) {
	    triggerMouseEvent (jNode[0], "mouseover");
	    triggerMouseEvent (jNode[0], "mousedown");
	    triggerMouseEvent (jNode[0], "click");
	    triggerMouseEvent (jNode[0], "mouseup");
	    console.log(jNode);
	}
	 
	function triggerMouseEvent (node, eventType) {
	    var clickEvent = document.createEvent('MouseEvents');
	    clickEvent.initEvent (eventType, true, true);
	    node.dispatchEvent (clickEvent);
	}
}