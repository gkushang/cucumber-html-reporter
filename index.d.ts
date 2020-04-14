interface Options {
  theme: 'bootstrap' | 'hierarchy' | 'foundation' | 'simple',
  jsonFile?: string,
  jsonDir?: string, 
  output: string,
  screenshotsDirectory?: string,
  reportSuiteAsScenarios: boolean,
  ignoreBadJsonFile?: boolean,
  launchReport: boolean,
  columnLayout?: number,
  storeScreenshots?: boolean,
  noInlineScreenshots?: boolean,
  name?: string,
  brandTitle?: string,
  scenarioTimestamp?: boolean,
  metadata?: {
    [key: string]: string
  },
}

export function generate(options: Options, callback?: () => void): void
