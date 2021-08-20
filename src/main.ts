import * as tc from '@actions/tool-cache'
import * as core from '@actions/core'
import path from 'path'
import * as os from 'os'
import { promises as fs } from 'fs'
import cp from 'child_process'

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

async function appendPath(dir: string): Promise<void> {
	process.env['PATH'] = `${process.env['PATH']}${path.delimiter}${dir}`
	const filePath = process.env['GITHUB_PATH'] || ''
	if(filePath){
		const data = process.env['PATH'].split(path.delimiter).join(os.EOL)
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
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
