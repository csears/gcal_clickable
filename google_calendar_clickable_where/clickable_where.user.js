/**
 * Created by Jonathan Falkner on 4/5/16.
 */

window.make_child_links_clickable = function make_child_links_clickable (node) {
    //console.log("Making child links clickable on tag:" + node.tagName + " id:" + node.id + " classList:" + node.classList);
    if (node.hasChildNodes()) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        var nodes = node.childNodes;
        for (var i = 0, m = nodes.length; i < m; i++) {
            //console.log(" Checking child node " + i); 
            var n = nodes[i];
            if (n.nodeType == n.TEXT_NODE) {
                n.textContent = n.textContent.replace('&#8203;','').replace(/\u200B/g,'');
                //console.log("  Found text node: " + n.textContent);
                var g = n.textContent.match(exp);
                while (g) {
                    //console.log("   Found url match to replace.");
                    var idx = n.textContent.indexOf(g[0]);
                    var pre = n.textContent.substring(0, idx);
                    var t = document.createTextNode(pre);
                    var a = document.createElement("a");
                    a.href = g[0];
                    a.target = '_blank';
                    a.innerText = g[0];
                    n.textContent = n.textContent.substring(idx + g[0].length);
                    n.parentElement.insertBefore(t, n);
                    n.parentElement.insertBefore(a, n);
                    g = n.textContent.match(exp);
                }
            }
            else if ((n.nodeType == n.ELEMENT_NODE) && (n.tagName.toLowerCase() != 'a')) {
                window.make_child_links_clickable(n);
            }
        }
    }
};

function whereClickHandler(e) {
    //console.log("Click Handler Fired");
    // check for pop-up meeting info modal
    nodes = window.document.querySelectorAll('.neb-break-words');
    for (var i = 0, m = nodes.length; i < m; i++) {
        window.make_child_links_clickable(nodes[i]);
    }
    // check for event detail
    nodes = window.document.querySelectorAll('.ui-sch-schmedit');
    for (var i = 0, m = nodes.length; i < m; i++) {
        window.make_child_links_clickable(nodes[i]);
    }
}

window.document.addEventListener('click', whereClickHandler);
