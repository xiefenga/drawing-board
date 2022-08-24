
type Point = [number, number]

type CanvasTuple = [HTMLCanvasElement, HTMLCanvasElement]

const initShowCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
}

const initDrawCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
}


export function initCanvas(list: CanvasTuple) {
    const [showCanvas, drawCanva] = list
    initShowCanvas(showCanvas)
    initDrawCanvas(drawCanva)
}



export function canvasInit(canvas: HTMLCanvasElement, options = {}) {

    const ctx = canvas.getContext('2d')

    Object.entries(options).forEach(([key, value]) => ctx[key] = value)

    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    const points: Point[] = []

    const dpr = window.devicePixelRatio

    const getPosition = (e: MouseEvent) => ({ x: e.offsetX * dpr, y: e.offsetY * dpr })

    let beginPoint = { x: 0, y: 0 }

    const drawLine = (beginPoint: Point, controlPoint: Point, endPoint: Point) => {
        ctx.beginPath()
        ctx.moveTo(beginPoint.x, beginPoint.y)
        ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y)
        ctx.stroke()
    }

    const onMouseDown = (e: MouseEvent) => {
        const { x, y } = getPosition(e)
        points.push({ x, y })
        beginPoint = { x, y }
        canvas.addEventListener('mousemove', onMouseOver)
    }

    const onMouseUp = () => {
        canvas.removeEventListener('mousemove', onMouseOver)
        points.length = 0
    }

    const onMouseOver = (e: MouseEvent) => {
        const { x, y } = getPosition(e)
        points.push({ x, y })
        if (points.length > 2) {
            const [controlPoint, endDrawPoint] = points.slice(-2)
            const endPoint = {
                x: (controlPoint.x + endDrawPoint.x) / 2,
                y: (controlPoint.y + endDrawPoint.y) / 2,
            }
            drawLine(beginPoint, controlPoint, endPoint)
            beginPoint = endPoint
        }
    }

    // canvas.addEventListener('mouseenter', onMouseDown)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mouseout', onMouseUp)

    return ctx
}