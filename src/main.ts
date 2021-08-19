import * as tc from '@actions/tool-cache'
import * as core from '@actions/core'
import path from 'path'
import cp from 'child_process'

async function downloadSource(branch: string): Promise<string> {
	const url = `https://github.com/9fans/plan9port/archive/refs/heads/${branch}.zip`;
	const archivePath = await tc.downloadTool(url)
	const dir = await tc.extractZip(archivePath)
	return path.join(dir, `plan9port-${branch}`)
}

async function installFromSource(dir: string): Promise<void> {
	await cp.spawn('./INSTALL', ['-r', dir], {
		cwd: dir
	})
}

async function run(): Promise<void> {
	try {
		core.debug(new Date().toTimeString())
		const dir = await downloadSource("master")
		core.debug(new Date().toTimeString())
		await installFromSource(dir)
		core.debug(new Date().toTimeString())
		core.exportVariable('PLAN9', dir)
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
