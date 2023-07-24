export function highlightText(node: HTMLElement, what: string) {
  // remove previous highlight
  node.innerHTML = node.innerHTML.replace(
    /(<mark class="highlightColor">|<\/mark>)/gim,
    ""
  );

  const nodeList = node.childNodes;

  // add highlight
  highlightChild(nodeList);

  function highlightChild(nodeList: NodeList) {
    for (let x = 0; x < nodeList.length; x++) {
      if (nodeList[x].nodeType === 3 && nodeList[x].textContent !== "\n") {
        const regexPattern = new RegExp(what, "gi");
        let text = nodeList[x].textContent;

        if (what && text) {
          const newText = text.replace(
            regexPattern,
            '<mark class="highlightColor">$&</mark>'
          );

          const replacementNode = document.createElement("template");
          replacementNode.innerHTML = newText || "";

          nodeList[x].parentNode!.replaceChild(
            replacementNode.content,
            nodeList[x].parentNode!.childNodes[x]
          );
        }
      } else {
        highlightChild(nodeList[x].childNodes);
      }
    }
  }
}
