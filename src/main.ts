import core from '@actions/core'
import os from 'os'
import tc from '@actions/tool-cache'
import cp from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'

async function downloadSource(label: string): Promise<string> {
	const archiveUrl = `https://storage.googleapis.com/setup-plan9port/plan9port-${label}.tgz`
	const archivePath = await tc.downloadTool(archiveUrl)
	const dir = await tc.extractTar(archivePath)
	return path.join(dir, 'plan9')
}

function installFromSource(dir: string): void {
	cp.spawnSync('./INSTALL', ['-c', '-r', dir], {
		cwd: dir
	})
}

// appendPath adds dir to the end of the PATH.
// It similer to core.addPath except addPath adds to the top of the PATH.
async function appendPath(dir: string): Promise<void> {
	process.env['PATH'] = `${process.env['PATH']}${path.delimiter}${dir}`
	const filePath = process.env['GITHUB_PATH'] || ''
	if (filePath) {
		const a = process.env['PATH'].split(path.delimiter)
		a.reverse()
		const data = a.join(os.EOL)
		await fs.writeFile(filePath, data)
	}
}

async function run(): Promise<void> {
	const label = core.getInput('environment')
	try {
		core.debug(new Date().toTimeString())
		const dir = await downloadSource(label)
		core.debug(new Date().toTimeString())
		installFromSource(dir)
		core.debug(new Date().toTimeString())
		core.exportVariable('PLAN9', dir)
		await appendPath(path.join(dir, 'bin'))
	} catch (e: unknown) {
		if (e instanceof Error) {
			core.setFailed(e.message)
		} else {
			core.setFailed('failed to install plan9port')
		}
	}
}

run()
