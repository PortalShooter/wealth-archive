import { fps } from "../"

export interface LoopInterface {
  start: VoidFunction
  kill: VoidFunction
}

class Loop implements LoopInterface {
  private targetFps = 60
  private shouldDestroy = false
  private callback

  constructor(callback: (multiplyer: number) => void) {
    this.callback = callback
  }

  private loop = () => {
    if (this.shouldDestroy) {
      return
    }

    requestAnimationFrame(this.loop)

    this.callback(this.targetFps / fps.get())
  }

  start = () => {
    this.loop()
  }

  kill = () => {
    this.shouldDestroy = true
  }
}

export const createLoop = (callback: (multiplyer: number) => void) => {
  return new Loop(callback)
}
