import { TAbstractFile } from 'obsidian';

export enum IndexItemStyle {
	List = 'list',
	Checkbox = 'checkbox',
	PureLink = 'pureLink',
}

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export interface MokurokuSettings {
	indexPrefix: string;
	indexItemStyle: IndexItemStyle;
	indexTagValue: string;
	indexTagBoolean: boolean;
	indexTagLabel: string;
	indexTagSeparator: string;
	cleanPathBoolean: boolean;
	foldersIncluded: string;
	foldersExcluded: string;
	sortOrder: SortOrder;
	addSquareBrackets: boolean;
	embedSubIndex: boolean;
	templateFile: string;
	frontMatterSeparator: string;
	[key: string]: any;
}

export interface GeneralContentOptions {
	items: Array<TAbstractFile>;
	initValue: Array<string>;
	func: (path: string, isFile: boolean) => string;
}
