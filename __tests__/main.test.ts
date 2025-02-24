import { jest } from '@jest/globals'
import { exec } from '@actions/exec'
import { run } from '../src/main.js'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

describe('action', () => {
	it('test runs', async () => {
		const downloadTool = jest.fn(async () => {
			const dir = dirname(fileURLToPath(import.meta.url))
			const file = 'mock.tar.gz'
			await exec('tar', ['-C', dir, '-zcf', file, 'plan9'])
			return file
		})
		await run({ downloadTool })
		expect(downloadTool).toHaveBeenCalledTimes(1)
	})
})
