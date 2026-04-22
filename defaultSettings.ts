import { SortOrder, IndexItemStyle, MokurokuSettings } from './types';

export const DEFAULT_SETTINGS: MokurokuSettings = {
	indexPrefix: '',
	indexItemStyle: IndexItemStyle.PureLink,
	indexTagValue: 'MOC',
	indexTagBoolean: true,
	indexTagSeparator: ', ',
	indexTagLabel: 'tags',
	cleanPathBoolean: true,
	foldersExcluded: '',
	foldersIncluded: '',
	sortOrder: SortOrder.ASC,
	addSquareBrackets: true,
	embedSubIndex: false,
	templateFile: '',
	frontMatterSeparator: '---',
	pasteUrlAsLink: true,
	hideIndexFiles: false,
	hideChevrons: false,
};
