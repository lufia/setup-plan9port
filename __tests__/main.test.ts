import * as core from '@actions/core'
import { exec } from '@actions/exec'
import * as tool from '@actions/tool-cache'
import { run } from '../src/main'

let debugMock: jest.SpiedFunction<typeof core.debug>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>
let exportVariableMock: jest.SpiedFunction<typeof core.exportVariable>
let downloadToolMock: jest.SpiedFunction<typeof tool.downloadTool>

describe('action', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		debugMock = jest.spyOn(core, 'debug').mockImplementation()
		getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
		setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
		exportVariableMock = jest
			.spyOn(core, 'exportVariable')
			.mockImplementation()
		downloadToolMock = jest.spyOn(tool, 'downloadTool').mockImplementation()
	})

	it('test runs', async () => {
		getInputMock.mockImplementation(name => {
			switch (name) {
				case 'environment':
					return 'ubuntu-latest'
				default:
					return ''
			}
		})
		downloadToolMock.mockImplementation(() => {
			const dir = import.meta.dirname
			const file = path.join(dir, 'mock.tar.gz')
			exec(`tar zcf mock.tar.gz -C "${dir}" plan9`)
			return file
		})
		await run()
		expect(getInputMock).toHaveBeenCalledWith('environment')
	})
})
