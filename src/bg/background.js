//000 = links
//001 = dota2lounge timer

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//chrome.pageAction.show(sender.tab.id);//----ENABLE IF PAGE ACTION
  	//debug mode on?
    sendResponse("debug");
  });

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
  	if(msg.split("₹")[0] === "000")//link to open
  	{ 
  		OpenURLInNewTab(msg.split("₹")[1]);
  	}
  });
});

function OpenURLInNewTab(link)
{
	chrome.tabs.create({ url: link });
}

// var port = chrome.runtime.connect({name: "knockknock"});
// port.onMessage.addListener(function(msg) {

// 	console.log(msg);

// });