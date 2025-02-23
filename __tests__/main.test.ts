import { exec } from '@actions/exec'
import { run } from '../src/main'
import path from 'node:path'

describe('action', () => {
	it('test runs', async () => {
		const downloadTool = jest.fn(async () => {
			const dir = __dirname
			const file = 'mock.tar.gz'
			await exec('tar', ['-C', dir, '-zcf', file, 'plan9'])
			return file
		})
		await run({ downloadTool })
		expect(downloadTool).toHaveBeenCalledTimes(1)
	})
})
