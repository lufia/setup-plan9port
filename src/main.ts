import tc from '@actions/tool-cache'
import core from '@actions/core'

async function installFromSource(branch: string): Promise<string> {
	const url = `https://github.com/9fans/plan9port/archive/refs/heads/${branch}.zip`;
	const archivePath = await tc.downloadTool(url)
	return await tc.extractZip(archivePath)
}

async function run(): Promise<void> {
	try {
		core.debug(new Date().toTimeString())
		const dir = await installFromSource("master")
		core.debug(new Date().toTimeString())
		core.exportVariable('PLAN9', dir)

		core.setOutput('time', new Date().toTimeString())
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
