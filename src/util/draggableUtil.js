let draggableUtil = (param) => {
  let currentTarget = {
    position: {
      currentPositionX: 0,
      currentPositionY: 0,
      currentCursorPositionX: 0,
      currentCursorPositionY: 0
    }
  }
  let container = param.container
  let onDragStart = param.onDragStart
  let onMove = param.onMove
  let onDragEnd = param.onDragEnd

  function moveElement(e) {
    let varX = (e.pageX - currentTarget.position.currentCursorPositionX + currentTarget.position.currentPositionX);
    let parentRect = currentTarget.parentNode.getBoundingClientRect();
    let rect = currentTarget.getBoundingClientRect();
    let borderTopWidth = currentTarget.parentNode.style.borderTopWidth;
    if (borderTopWidth && borderTopWidth.length >= 3) {
      borderTopWidth = parseInt(borderTopWidth.substr(0, borderTopWidth.indexOf("px")))
    }

    let borderRightWidth = currentTarget.parentNode.style.borderRightWidth;
    if (borderRightWidth && borderRightWidth.length >= 3) {
      borderRightWidth = parseInt(borderRightWidth.substr(0, borderRightWidth.indexOf("px")))
    }

    let borderBottomWidth = currentTarget.parentNode.style.borderBottomWidth;
    if (borderBottomWidth && borderBottomWidth.length >= 3) {
      borderBottomWidth = parseInt(borderBottomWidth.substr(0, borderBottomWidth.indexOf("px")))
    }

    let borderLeftWidth = currentTarget.parentNode.style.borderLeftWidth;
    if (borderLeftWidth && borderLeftWidth.length >= 3) {
      borderLeftWidth = parseInt(borderLeftWidth.substr(0, borderLeftWidth.indexOf("px")))
    }


    let rightBound = parentRect.width - rect.width - borderLeftWidth - borderRightWidth
    if (varX < 0)
      varX = 0
    if (varX > rightBound) {
      varX = rightBound
    }

    let varY = (e.pageY - currentTarget.position.currentCursorPositionY + currentTarget.position.currentPositionY);
    let bottomBound = parentRect.height - rect.height - borderTopWidth - borderBottomWidth
    if (varY < 0)
      varY = 0
    if (varY > bottomBound) {
      varY = bottomBound
    }
    /*currentTarget.style.left = varX + "px"
    currentTarget.style.top = varY + "px"*/
    currentTarget.style.transform = "translate(" + varX + "px," + varY + "px" + ")"
    if (onMove && onMove instanceof Function) {
      onMove(e, {left: varX, top: varY})
    } else if (draggableUtil.prototype.onMove && draggableUtil.prototype.onMove instanceof Function) {
      draggableUtil.prototype.onMove(e, {left: varX, top: varY})
    }

  }

  function bindEvent(e) {
    currentTarget = e.currentTarget
    if (!currentTarget.position) {
      currentTarget.position = {
        currentPositionX: 0,
        currentPositionY: 0,
        currentCursorPositionX: 0,
        currentCursorPositionY: 0
      }
    }
    window.addEventListener("mousemove", moveElement)
    currentTarget.position.currentCursorPositionX = e.pageX
    currentTarget.position.currentCursorPositionY = e.pageY
    if (onDragStart && onDragStart instanceof Function) {
      onDragStart(e)
    } else if (draggableUtil.prototype.onDragStart && draggableUtil.prototype.onDragStart instanceof Function) {
      draggableUtil.prototype.onDragStart(e, {left: varX, top: varY})
    }
  }

  function removeEvent(e) {
    currentTarget.position.currentPositionX = e.pageX - currentTarget.position.currentCursorPositionX + currentTarget.position.currentPositionX
    currentTarget.position.currentPositionY = e.pageY - currentTarget.position.currentCursorPositionY + currentTarget.position.currentPositionY
    window.removeEventListener("mousemove", moveElement)
    if (onDragEnd && onDragEnd instanceof Function) {
      onDragEnd(e)
    } else if (draggableUtil.prototype.onDragEnd && draggableUtil.prototype.onDragEnd instanceof Function) {
      draggableUtil.prototype.onDragEnd(e, {left: varX, top: varY})
    }
  }

  if (container && container.length > 0) {
    for (let i = 0; i < container.length; i++) {
      let e = container[i]
      // e.style.position = "absolute"
      e.addEventListener("dragstart", (e) => {
        return
      })
      e.addEventListener("mousedown", bindEvent)
    }
    window.addEventListener("mouseup", removeEvent)
  }
}
export default draggableUtil
