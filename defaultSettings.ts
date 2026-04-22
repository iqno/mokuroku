import { SortOrder, IndexItemStyle, MokurokuSettings } from './types';

export const DEFAULT_SETTINGS: MokurokuSettings = {
	indexPrefix: '_Index_of_',
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
};
