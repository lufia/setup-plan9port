import * as tc from '@actions/tool-cache'
import * as core from '@actions/core'
import path from 'path'
import cp from 'child_process'

const archiveUrl = 'https://storage.googleapis.com/setup-plan9port/plan9port-master.tgz'

async function downloadSource(): Promise<string> {
	const archivePath = await tc.downloadTool(archiveUrl)
	const dir = await tc.extractTar(archivePath)
	return path.join(dir, `plan9port-master`)
}

async function installFromSource(dir: string): Promise<void> {
	await cp.spawn('./INSTALL', ['-c', '-r', dir], {
		cwd: dir
	})
}

async function run(): Promise<void> {
	try {
		core.debug(new Date().toTimeString())
		const dir = await downloadSource()
		core.debug(new Date().toTimeString())
		await installFromSource(dir)
		core.debug(new Date().toTimeString())
		core.exportVariable('PLAN9', dir)
		core.addPath(path.join(dir, 'bin'))
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
