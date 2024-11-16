class Env {
  constructor() {
    this.API_ROOT = import.meta.env.VITE_API_ROOT
    this.ROLES_RULE = JSON.parse(import.meta.env.VITE_ROLES_RULE)

    this.SIDEBAR_WIDTH = import.meta.env.VITE_SIDEBAR_WIDTH
  }
}

const env = new Env()

export default env
