import { SqipPlugin } from 'sqip'
import primitive from 'primitive'

export default class PrimitiveJsPlugin extends SqipPlugin {
  static get cliOptions() {
    // Make options available to the CLI.
    return [
      {
        name: 'numberOfPrimitives',
        alias: 'n',
        type: Number,
        description:
          'The number of primitive shapes to use to build the SQIP SVG',
        defaultValue: 8
      }
    ]
  }

  constructor({ pluginOptions }) {
    /**
     * Will enhance your plugin instance with the following:
     * this.filePath: Path to input file
     * this.metadata: Object with width, height and type
     * this.sqipConfig: The configuration passed to SQIP by the user
     */
    super(...arguments)

    // Set your options
    this.options = {
      // Inject default options
      numberOfPrimitives: 8,
      ...pluginOptions
    }
  }

  async apply(svg) {
    console.log('Incoming svg:', svg)

    // Read plugin options
    const { numberOfPrimitives } = this.options

    const model = await primitive({
      input: this.filePath,
      numSteps: numberOfPrimitives
    })

    // Return new svg
    return model.toSVG()
  }
}
