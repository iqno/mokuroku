import { MokurokuSettings, SortOrder } from './types';
import {
	MOKUROKU_INDEX_LIST_BEGINNING_TEXT,
	MOKUROKU_INDEX_LIST_END_TEXT,
} from './consts';

// --- Frontmatter utilities ---

export const hasFrontmatter = (content: string, separator: string): boolean => {
	return content.trim().startsWith(separator) && content.split(separator).length > 1;
};

export const getFrontmatter = (content: string, separator: string): string => {
	return hasFrontmatter(content, separator)
		? `${separator}${content.split(separator)[1]}${separator}`
		: '';
};

export const removeFrontmatter = (content: string, separator: string): string => {
	return content.startsWith(separator) && content.split(separator).length > 1
		? content.split(separator).slice(2).join(separator)
		: content;
};

export const updateFrontmatter = (settings: MokurokuSettings, currentContent: string): string => {
	if (!settings.indexTagBoolean) {
		return getFrontmatter(currentContent, settings.frontMatterSeparator);
	}

	let currentFrontmatterWithoutSep = `${currentContent.split(settings.frontMatterSeparator)[1]}`;

	if (currentFrontmatterWithoutSep === '') return '';

	let tagLine = currentFrontmatterWithoutSep
		.split('\n')
		.find((elem) => elem.split(':')[0] === settings.indexTagLabel);

	if (!tagLine && settings.indexTagValue && settings.indexTagBoolean) {
		tagLine = 'tags:';
		currentFrontmatterWithoutSep = `${currentFrontmatterWithoutSep}${tagLine}\n`;
	}

	const taglist = tagLine!.split(':')[1].trim();
	const indexTags = settings.indexTagSeparator
		? settings.indexTagValue.split(settings.indexTagSeparator)
		: [settings.indexTagValue];

	let updatedTaglist = taglist.replace(/\[|\]/g, '');
	for (const indexTag of indexTags) {
		if (!taglist.includes(indexTag)) {
			updatedTaglist =
				!settings.indexTagSeparator ||
				(updatedTaglist.split(settings.indexTagSeparator).length >= 1 &&
					updatedTaglist.split(settings.indexTagSeparator)[0] !== '')
					? `${updatedTaglist}${settings.indexTagSeparator}${indexTag}`
					: indexTag;
		}
	}

	if (settings.addSquareBrackets) {
		updatedTaglist = `[${updatedTaglist}]`;
	}

	const updatedTagLine = `tags: ${updatedTaglist}`;
	const regex = new RegExp(tagLine!.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g');

	return `${settings.frontMatterSeparator}${currentFrontmatterWithoutSep.replace(regex, updatedTagLine)}${settings.frontMatterSeparator}`;
};

// --- Index content ---

export const updateIndexContent = (
	sortOrder: SortOrder,
	currentContent: string,
	indexContent: Array<string>,
): string => {
	indexContent = indexContent.sort((a, b) => {
		return a.localeCompare(b, undefined, { numeric: true });
	});

	if (sortOrder === SortOrder.DESC) {
		indexContent.reverse();
	}

	const indexBlock = `${MOKUROKU_INDEX_LIST_BEGINNING_TEXT}\n${indexContent.join('\n')}\n${MOKUROKU_INDEX_LIST_END_TEXT}\n`;

	if (!currentContent.includes(MOKUROKU_INDEX_LIST_BEGINNING_TEXT)) {
		if (currentContent.trim() === '') {
			return indexBlock;
		}
		// Append to the end with two newlines
		return `${currentContent}\n\n${indexBlock}`;
	}

	const intro = currentContent.split(MOKUROKU_INDEX_LIST_BEGINNING_TEXT)[0];
	const outro = currentContent.split(MOKUROKU_INDEX_LIST_END_TEXT)[1] || '';

	return `${intro}${indexBlock}${outro}`;
};

// --- Folder filtering ---

export const isInAllowedFolder = (settings: MokurokuSettings, indexFilePath: string): boolean => {
	return settings.foldersIncluded === '' || isInSpecificFolder(settings, indexFilePath, 'foldersIncluded');
};

export const isInDisAllowedFolder = (settings: MokurokuSettings, indexFilePath: string): boolean => {
	return isInSpecificFolder(settings, indexFilePath, 'foldersExcluded');
};

const isInSpecificFolder = (settings: MokurokuSettings, indexFilePath: string, folderType: string): boolean => {
	return !!settings[folderType]
		.replace(/,/g, '\n')
		.split('\n')
		.find((folder: string) => {
			return folder.endsWith('*')
				? indexFilePath.startsWith(folder.slice(0, -1).trim())
				: indexFilePath.split(folder).length > 1 && !indexFilePath.split(folder)[1].includes('/');
		});
};
