export function setNodePosition(node, pos) {
	node.style.left = '' + pos.x + 'px';
	node.style.top = '' + pos.y + 'px';
}

export function globalMousePosition(e) {
	var targetPos = globalPositionOfNode(e.target);
	return {
		x: e.offsetX + targetPos.x,
		y: e.offsetY + targetPos.y
	}
}

export function elementsUnderMouseEvent(e) {
	var pos = globalMousePosition(e);
	return document.elementsFromPoint(e.clientX, e.clientY);
}

export function globalPositionOfNode(node) {
	var left = 0;
	var top = 0;
	while (node && node !== document.body) {
		left += node.offsetLeft;
		top += node.offsetTop;
		node = node.offsetParent;
	}
	return {
		x: left,
		y: top
	}
}