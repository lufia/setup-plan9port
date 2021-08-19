import * as core from '@actions/core'

async function downloadSource() {
}

async function run(): Promise<void> {
	try {
		const ms: string = core.getInput('milliseconds')
		core.debug(`Waiting ${ms} milliseconds ...`)

		core.debug(new Date().toTimeString())
		core.debug(new Date().toTimeString())

		core.setOutput('time', new Date().toTimeString())
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
