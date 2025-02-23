import { debug, exportVariable, getInput, setFailed } from '@actions/core'
import os from 'os'
import { downloadTool, extractTar } from '@actions/tool-cache'
import cp from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'

type RunOptions = Readonly<{
	downloadTool: typeof downloadTool
}>

export const defaultOptions: RunOptions = {
	downloadTool
}

async function downloadSource(
	label: string,
	options: RunOptions
): Promise<string> {
	const archiveUrl = `https://storage.googleapis.com/setup-plan9port/plan9port-${label}.tgz`
	const archivePath = await options.downloadTool(archiveUrl)
	const dir = await extractTar(archivePath)
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

export async function run(options: RunOptions): Promise<void> {
	const label = getInput('environment')
	try {
		debug(new Date().toTimeString())
		const dir = await downloadSource(label, options)
		debug(new Date().toTimeString())
		installFromSource(dir)
		debug(new Date().toTimeString())
		exportVariable('PLAN9', dir)
		await appendPath(path.join(dir, 'bin'))
	} catch (e: unknown) {
		if (e instanceof Error) {
			setFailed(e.message)
		} else {
			setFailed('failed to install plan9port')
		}
	}
}
