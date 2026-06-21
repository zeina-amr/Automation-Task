const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const path = require('path')
const dayjs = require('dayjs')
 
const composeNodeEvents = (cypressOn) => {
  const eventHandlers = new Map()
 
  return (eventName, handler) => {
    if (typeof handler !== 'function') {
      return cypressOn(eventName, handler)
    }
 
    if (!eventHandlers.has(eventName)) {
      eventHandlers.set(eventName, [handler])
      return cypressOn(eventName, async (...args) => {
        let lastDefinedResult
        const handlers = eventHandlers.get(eventName) || []
 
        for (const eventHandler of handlers) {
          const result = await eventHandler(...args)
          if (result !== undefined) {
            lastDefinedResult = result
          }
        }
 
        return lastDefinedResult
      })
    }
 
    eventHandlers.get(eventName).push(handler)
    return undefined
  }
}
 
const setupNodeEvents = async (cypressOn, config) => {
  const on = composeNodeEvents(cypressOn)
 
  await addCucumberPreprocessorPlugin(on, config)
 
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)]
    })
  )
  return config
}
 
module.exports = defineConfig({
 defaultCommandTimeout: 10000,
 e2e: {
   specPattern: "cypress/e2e/features/**/*.feature",
   setupNodeEvents,
 },
});
 