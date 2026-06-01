import { downloadTool } from '@actions/tool-cache';
type RunOptions = Readonly<{
    downloadTool: typeof downloadTool;
}>;
export declare const defaultOptions: RunOptions;
export declare function run(options?: RunOptions): Promise<void>;
export {};
//# sourceMappingURL=main.d.ts.map