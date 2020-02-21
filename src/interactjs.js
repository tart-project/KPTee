import interact from 'interactjs'

export function runInteractjs(whiteboard, user, websocket) {
    const changedPosition = { x: 0, y: 0 }

    // drag and drop function
    interact(".cardDiv")
        .draggable({
            listeners: {
                move(event) {
                    // マウスの移動分を変化量に加算(evemt.dx,dy)
                    changedPosition.x += event.dx
                    changedPosition.y += event.dy
                    event.target.style.transform = `translate(${changedPosition.x}px, ${changedPosition.y}px)`
                }
            }
        }).on("dragend", (event) => {
            const targetRectInfo = event.target.getBoundingClientRect();

            // 画面左上からの絶対位置+スクロールの補正分を反映
            const currentTop = targetRectInfo.top + window.pageYOffset;
            const currentLeft = targetRectInfo.left + window.pageXOffset;
            console.log(event.target)

            user.changeDrag(whiteboard, websocket, event.target.id, `${currentLeft}px`, `${currentTop}px`)

            // 移動距離の初期化
            changedPosition.x = 0
            changedPosition.y = 0
            event.target.style.transform = "translate(0px, 0px)"
        })

    // resize function
    interact(".textarea")
        .resizable({
            // resize from right or bottom edges and corners
            edges: { right: true, bottom: true },
            modifiers: [
                // minimum size
                interact.modifiers.restrictSize({
                    min: { width: 80, height: 35 }
                })
            ]
        })
        .on('resizemove', (event) => {
            // update the element's style
            if (event.edges.right && event.edges.bottom) {
                event.target.style.width = `${event.rect.width}px`
                event.target.style.height = `${event.rect.height}px`
            } else if (event.edges.right) {
                event.target.style.width = `${event.rect.width}px`
            }
            else if (event.edges.bottom) {
                event.target.style.height = `${event.rect.height}px`
            }
        })
        .on('resizeend', (event) => {
            // update the card info
            //whiteboard.cards.find(({ id }) => id === event.target.parentNode.id).width = event.target.style.width
            //whiteboard.cards.find(({ id }) => id === event.target.parentNode.id).height = event.target.style.height
            user.changeResize(whiteboard, websocket, event.target.parentNode.id, event.target.style.width, event.target.style.height)
        })
};