import * as core from '@actions/core'
import { run } from '../src/main'

let debugMock: jest.SpiedFunction<typeof core.debug>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>
let exportVariableMock: jest.SpiedFunction<typeof core.exportVariable>

describe('action', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		debugMock = jest.spyOn(core, 'debug').mockImplementation()
		getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
		getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
		exportVariableMock = jest.spyOn(core, 'exportVariable').mockImplementation()
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
		await run()
		expect(getInputMock).toHaveBeenCalledWith('environment')
	})
})
