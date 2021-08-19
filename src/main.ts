import core from '@actions/core'
import os from 'os'
import path from 'path'
import fetch from 'node-fetch'
import {
	createWriteStream,
	promises as fs,
} from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

const streamPipeline = promisify(pipeline)

async function downloadSource(branch: string): Promise<string> {
	const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'setup-plan9port-'))
	const url = `https://github.com/9fans/plan9port/archive/refs/heads/${branch}.zip`;
	const res = await fetch(url)
	if(!res.ok)
		throw new Error(`${url}: unexpected response: ${res.statusText}`)
	const w = createWriteStream(path.join(dir, "plan9port.zip"))
	await streamPipeline(res.body, w)
	w.close()
	return dir
}

async function run(): Promise<void> {
	try {
		const ms: string = core.getInput('milliseconds')
		core.debug(`Waiting ${ms} milliseconds ...`)

		core.debug(new Date().toTimeString())
		await downloadSource("master")
		core.debug(new Date().toTimeString())

		core.setOutput('time', new Date().toTimeString())
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
